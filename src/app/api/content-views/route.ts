import { NextRequest, NextResponse } from "next/server";
import { getDb, newId } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

const CONTENT_TYPES = new Set(["article", "video", "episode"]);

// Backs the articles_read/videos_seen/podcasts_listened badge metrics
// (src/app/api/badges/route.ts). INSERT OR IGNORE relies on the
// unique(user_id, content_type, content_id) constraint on content_views
// (goodLuckAdmin/migrations/0004_add_badges.sql) so re-viewing the same
// item never inflates the count.
export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { contentType?: string; contentId?: number } = await request.json();
  const { contentType, contentId } = payload;
  if (!contentType || !CONTENT_TYPES.has(contentType) || typeof contentId !== "number") {
    return NextResponse.json(
      { error: "Invalid contentType or contentId" },
      { status: 400 },
    );
  }

  const db = getDb();
  await db
    .prepare(
      "INSERT OR IGNORE INTO content_views (id, user_id, content_type, content_id) VALUES (?, ?, ?, ?)",
    )
    .bind(newId(), member.sub, contentType, contentId)
    .run();

  return new NextResponse(null, { status: 204 });
}
