import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders, parseJson } from "../../../../lib/db.server";
import { fetchTagLabelMap } from "../../../../lib/tags.server";
import { resolveTagLabels } from "../../../../lib/tags";

export const runtime = "edge";

interface VideoRow {
  id: number;
  num: string | null;
  title: string;
  description: string | null;
  date: string | null;
  duration: string | null;
  youtube_id: string | null;
  thumbnail: string | null;
  tags: string;
}

// Other CMS-only columns (status, etc.) are still deliberately not exposed
// here since no current consumer reads them from this endpoint.
function mapVideo(v: VideoRow, tagLabelMap: Map<number, string>) {
  const tagIds = parseJson<number[]>(v.tags, []);
  return {
    id: v.id,
    num: v.num,
    title: v.title,
    desc: v.description,
    date: v.date,
    duration: v.duration,
    youtubeId: v.youtube_id,
    thumbnail: v.thumbnail,
    tagIds,
    tags: resolveTagLabels(tagIds, tagLabelMap),
  };
}

// Public CMS content -- no RLS existed on this table before, so no auth
// check is needed here either.
export async function GET(request: NextRequest) {
  const db = getDb();
  const idsParam = request.nextUrl.searchParams.get("ids");
  const tagLabelMap = await fetchTagLabelMap();

  if (idsParam) {
    const ids = idsParam
      .split(",")
      .map((v) => Number(v))
      .filter((n) => Number.isFinite(n));
    if (ids.length === 0) return NextResponse.json([]);
    const placeholders = ids.map(() => "?").join(",");
    const { results } = await db
      .prepare(`SELECT * FROM videos WHERE id IN (${placeholders})`)
      .bind(...ids)
      .all<VideoRow>();
    return NextResponse.json((results ?? []).map((v) => mapVideo(v, tagLabelMap)), {
      headers: publicCacheHeaders(300, 3600),
    });
  }

  const { results } = await db
    .prepare("SELECT * FROM videos ORDER BY sort_order")
    .all<VideoRow>();
  return NextResponse.json((results ?? []).map((v) => mapVideo(v, tagLabelMap)), {
    headers: publicCacheHeaders(300, 3600),
  });
}
