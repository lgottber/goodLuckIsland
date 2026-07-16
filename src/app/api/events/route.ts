import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { parseICalEvents, getUpcomingEvents } from "../../../lib/icalParser";

export const runtime = "edge";

async function getICalUrl(): Promise<string | null> {
  try {
    const { env } = getRequestContext<CloudflareEnv>();
    const binding = env.ICAL_URL;
    if (binding && typeof binding.get === "function") {
      const value = await binding.get();
      if (value) return value;
    }
  } catch {
    // Falls through to env var fallback below (local dev).
  }
  return process.env.ICAL_URL ?? null;
}

export async function GET() {
  const icalUrl = await getICalUrl();
  if (!icalUrl) {
    return NextResponse.json({ events: [], subscribeUrl: null });
  }

  try {
    const res = await fetch(icalUrl, {
      headers: { "User-Agent": "GoodLuckIsland/1.0" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch calendar: ${res.status}` },
        { status: 502 },
      );
    }

    const text = await res.text();
    const allEvents = parseICalEvents(text);
    const upcoming = getUpcomingEvents(allEvents, new Date());

    return NextResponse.json(
      {
        events: upcoming.map((e) => ({
          summary: e.summary,
          start: e.start.toISOString(),
          end: e.end?.toISOString() ?? null,
          url: e.url,
          location: e.location,
        })),
        subscribeUrl: icalUrl,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load calendar" },
      { status: 500 },
    );
  }
}
