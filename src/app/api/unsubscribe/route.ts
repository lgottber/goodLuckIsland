import { type NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, nowIso } from "../../../lib/db.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.redirect(new URL("/unsubscribe?error=1", request.url));
  }

  const db = getDb();
  try {
    await db
      .prepare(
        "UPDATE users SET unsubscribed_at = ? WHERE id = ? AND unsubscribed_at IS NULL",
      )
      .bind(nowIso(), id)
      .run();
  } catch {
    return NextResponse.redirect(new URL("/unsubscribe?error=1", request.url));
  }

  try {
    const { env } = getRequestContext<CloudflareEnv>();
    env.AnalyticsEngineDataset.writeDataPoint({
      blobs: ["unsubscribed", JSON.stringify({})],
      doubles: [1],
      indexes: ["unsubscribed"],
    });
  } catch {
    // AnalyticsEngineDataset binding is unavailable outside the Cloudflare runtime (local next dev).
  }

  return NextResponse.redirect(new URL("/unsubscribe?success=1", request.url));
}
