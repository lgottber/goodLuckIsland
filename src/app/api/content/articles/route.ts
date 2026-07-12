import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders, toBool } from "../../../../lib/db.server";

export const runtime = "edge";

interface ArticleRow {
  id: number;
  category: string;
  title: string;
  excerpt: string | null;
  date: string | null;
  read_time: string | null;
  image: string | null;
  featured: number;
  score: number;
  is_members_only: number;
}

function mapArticle(a: ArticleRow) {
  return {
    id: a.id,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    date: a.date,
    readTime: a.read_time,
    image: a.image,
    featured: toBool(a.featured),
    score: a.score,
    isMembersOnly: toBool(a.is_members_only),
  };
}

// Public CMS content -- no auth check needed, matching no-RLS today.
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
      .prepare(`SELECT * FROM articles WHERE id IN (${placeholders})`)
      .bind(...ids)
      .all<ArticleRow>();
    return NextResponse.json((results ?? []).map(mapArticle), {
      headers: publicCacheHeaders(300, 3600),
    });
  }

  const { results } = await db
    .prepare("SELECT * FROM articles ORDER BY sort_order")
    .all<ArticleRow>();
  return NextResponse.json((results ?? []).map(mapArticle), {
    headers: publicCacheHeaders(300, 3600),
  });
}
