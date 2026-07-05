import { NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../lib/db.server";

export const runtime = "edge";

interface PlaylistRow {
  id: string;
  name: string;
  description: string;
}

function mapPlaylist(p: PlaylistRow) {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
  };
}

// Public CMS content -- no auth check needed, matching no-RLS today.
export async function GET() {
  const db = getDb();
  const { results } = await db
    .prepare("SELECT * FROM playlists ORDER BY created_at ASC")
    .all<PlaylistRow>();
  return NextResponse.json((results ?? []).map(mapPlaylist), {
    headers: publicCacheHeaders(300, 3600),
  });
}
