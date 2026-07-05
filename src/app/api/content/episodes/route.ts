import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../lib/db.server";

export const runtime = "edge";

interface EpisodeRow {
  id: number;
  num: string | null;
  title: string;
  description: string | null;
  date: string | null;
  duration: string | null;
  podcast_url: string | null;
  thumbnail: string | null;
}

// Matches the shape src/lib/articlesApi.ts's fetchEpisodes/
// fetchEpisodesByIds expect -- CMS-only columns (tags, status, etc.) are
// deliberately not exposed here since no current consumer reads them from
// this endpoint.
function mapEpisode(ep: EpisodeRow) {
  return {
    id: ep.id,
    num: ep.num,
    title: ep.title,
    desc: ep.description,
    date: ep.date,
    duration: ep.duration,
    podcastUrl: ep.podcast_url,
    thumbnail: ep.thumbnail,
  };
}

// Public CMS content -- no RLS existed on this table before, so no auth
// check is needed here either.
export async function GET(request: NextRequest) {
  const db = getDb();
  const idsParam = request.nextUrl.searchParams.get("ids");

  if (idsParam) {
    const ids = idsParam
      .split(",")
      .map((v) => Number(v))
      .filter((n) => Number.isFinite(n));
    if (ids.length === 0) return NextResponse.json([]);
    const placeholders = ids.map(() => "?").join(",");
    const { results } = await db
      .prepare(`SELECT * FROM episodes WHERE id IN (${placeholders})`)
      .bind(...ids)
      .all<EpisodeRow>();
    return NextResponse.json((results ?? []).map(mapEpisode), {
      headers: publicCacheHeaders(300, 3600),
    });
  }

  const { results } = await db
    .prepare("SELECT * FROM episodes ORDER BY sort_order")
    .all<EpisodeRow>();
  return NextResponse.json((results ?? []).map(mapEpisode), {
    headers: publicCacheHeaders(300, 3600),
  });
}
