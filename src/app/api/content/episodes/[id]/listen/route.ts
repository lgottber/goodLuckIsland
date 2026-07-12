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
  const episode = await db
    .prepare("SELECT podcast_url FROM episodes WHERE id = ?")
    .bind(Number(id))
    .first<{ podcast_url: string | null }>();

  if (!episode) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(
    { podcastUrl: episode.podcast_url },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
