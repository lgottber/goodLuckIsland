import { NextResponse } from "next/server";
import { getDb } from "../../../../../../lib/db.server";
import { verifyMember } from "../../../../../../lib/auth.server";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const member = await verifyMember(request);
  if (!member) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  const video = await db
    .prepare("SELECT youtube_id FROM videos WHERE id = ?")
    .bind(Number(id))
    .first<{ youtube_id: string | null }>();

  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(
    { youtubeId: video.youtube_id },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
