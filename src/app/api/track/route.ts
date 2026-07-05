import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { env } = getRequestContext<CloudflareEnv>();

    // Extra, stricter throttle on top of the general API_RATE_LIMITER in
    // src/middleware.ts -- this endpoint takes no auth at all, so it's the
    // easiest one for a bot to flood.
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.ANON_RATE_LIMITER.limit({ key: `track:${ip}` });
    if (!success) {
      return new Response(null, { status: 429 });
    }

    const body: { event: string; properties?: Record<string, unknown> } = JSON.parse(
      await request.text(),
    );
    const { event, properties } = body;
    const member = await verifyMember(request).catch(() => null);

    env.AnalyticsEngineDataset.writeDataPoint({
      blobs: [event, JSON.stringify(properties ?? {}), member?.sub ?? ""],
      doubles: [1],
      indexes: [event],
    });
  } catch {
    // AnalyticsEngineDataset/rate-limiter bindings are unavailable outside
    // the Cloudflare runtime (local next dev). Silently ignore so
    // analytics never breaks the app.
  }

  return new Response(null, { status: 204 });
}
