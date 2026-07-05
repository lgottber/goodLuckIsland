import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { env } = getRequestContext<CloudflareEnv>();
    const body: { event: string; properties?: { page?: string } } = JSON.parse(
      await request.text(),
    );
    const { event, properties } = body;
    const member = await verifyMember(request).catch(() => null);

    env.AnalyticsEngineDataset.writeDataPoint({
<<<<<<< Updated upstream
      blobs: [event, properties?.page ?? ""],
=======
      blobs: [event, JSON.stringify(properties ?? {}), member?.sub ?? ""],
>>>>>>> Stashed changes
      doubles: [1],
      indexes: [event],
    });
  } catch {
    // AnalyticsEngineDataset binding is unavailable outside the Cloudflare runtime (local next dev).
    // Silently ignore so analytics never breaks the app.
  }

  return new Response(null, { status: 204 });
}
