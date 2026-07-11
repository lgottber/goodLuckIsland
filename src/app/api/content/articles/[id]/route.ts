import { NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../../lib/db.server";
import { verifyMember } from "../../../../../lib/auth.server";
import { buildArticleTeaser } from "../../../../../lib/articleTeaser";

export const runtime = "edge";

interface ArticleRow {
  id: number;
  category: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  date: string | null;
  read_time: string | null;
  image: string | null;
  featured: number;
}

// Full article body is only ever handed to a verified member (Bearer JWT).
// Everyone else -- including the server-rendered page itself, which has no
// session to check -- gets the same logged-out teaser as the meta tags do.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = getDb();

  const article = await db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .bind(Number(id))
    .first<ArticleRow>();
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const member = await verifyMember(request);
  const body = member ? (article.body ?? "") : buildArticleTeaser(article.body).teaserHtml;

  return NextResponse.json(
    {
      id: article.id,
      category: article.category,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      readTime: article.read_time,
      image: article.image,
      featured: Boolean(article.featured),
      body,
      fullAccess: Boolean(member),
    },
    {
      // Only the logged-out teaser response is safe to share at the edge --
      // this route responds differently based on the (unkeyed) Authorization
      // header, so a member's full-body response must never be cached, or a
      // later anonymous request for the same id could be served it back.
      headers: member
        ? { "Cache-Control": "private, no-store" }
        : publicCacheHeaders(300, 3600),
    },
  );
}
