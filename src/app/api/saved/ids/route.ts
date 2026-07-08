import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { results } = await db
    .prepare("SELECT item_type, item_id FROM saved_items WHERE user_id = ?")
    .bind(member.sub)
    .all<{ item_type: string; item_id: number }>();

  const articles: number[] = [];
  const episodes: number[] = [];
  const videos: number[] = [];
  for (const row of results ?? []) {
    if (row.item_type === "article") articles.push(row.item_id);
    else if (row.item_type === "episode") episodes.push(row.item_id);
    else if (row.item_type === "video") videos.push(row.item_id);
  }
  return NextResponse.json({ articles, episodes, videos });
}
