import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { env } = getRequestContext<CloudflareEnv>();
    const body: { event: string; properties?: { page?: string } } = JSON.parse(
      await request.text(),
    );
    const { event, properties } = body;

    env.ANALYTICS.writeDataPoint({
      blobs: [event, properties?.page ?? ""],
      doubles: [1],
      indexes: [event],
    });
  } catch {
    // ANALYTICS binding is unavailable outside the Cloudflare runtime (local next dev).
    // Silently ignore so analytics never breaks the app.
  }

  return new Response(null, { status: 204 });
}
