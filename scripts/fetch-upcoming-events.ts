import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getUpcomingEvents, type CalendarEvent } from "../src/lib/ical";

// Runs before every build (see package.json's "prebuild"/"prebuild:cf") so
// the calendar is fetched and parsed once at compile time, the same way
// the Shopify token feeds ShopifyCollection.tsx -- the admin-configured
// ICAL_URL secret never has to be fetched from the browser at runtime.
const OUTPUT_PATH = path.join(__dirname, "../src/data/upcomingEvents.json");
const EVENT_COUNT = 3;
const FETCH_TIMEOUT_MS = 10_000;

type UpcomingEventsData = {
  subscribeUrl: string | null;
  events: CalendarEvent[];
};

async function fetchUpcomingEvents(): Promise<UpcomingEventsData> {
  const icalUrl = process.env.ICAL_URL;
  if (!icalUrl) {
    console.warn("ICAL_URL is not set -- Upcoming Events will be empty.");
    return { subscribeUrl: null, events: [] };
  }

  try {
    const res = await fetch(icalUrl, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) throw new Error(`request failed with status ${res.status}`);
    const text = await res.text();
    return { subscribeUrl: icalUrl, events: getUpcomingEvents(text, EVENT_COUNT) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`Could not fetch/parse ICAL_URL, Upcoming Events will be empty: ${message}`);
    return { subscribeUrl: icalUrl, events: [] };
  }
}

async function main() {
  const data = await fetchUpcomingEvents();
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${data.events.length} upcoming event(s) to ${OUTPUT_PATH}`);
}

main();
