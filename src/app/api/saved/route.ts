import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

interface SavedRow {
  id: string;
  item_type: "article" | "episode";
  item_id: number;
  created_at: string;
}

interface ArticleRow {
  id: number;
  category: string;
  title: string;
  excerpt: string | null;
  date: string | null;
  read_time: string | null;
  image: string | null;
}

interface EpisodeRow {
  id: number;
  title: string;
  description: string | null;
  date: string | null;
  duration: string | null;
  thumbnail: string | null;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { results: rows } = await db
    .prepare(
      "SELECT id, item_type, item_id, created_at FROM saved_items WHERE user_id = ? ORDER BY created_at DESC",
    )
    .bind(member.sub)
    .all<SavedRow>();

  const savedRows = rows ?? [];
  const articleIds = savedRows
    .filter((r) => r.item_type === "article")
    .map((r) => r.item_id);
  const episodeIds = savedRows
    .filter((r) => r.item_type === "episode")
    .map((r) => r.item_id);

  const noArticles: ArticleRow[] = [];
  const noEpisodes: EpisodeRow[] = [];
  const [articleRows, episodeRows] = await Promise.all([
    articleIds.length > 0
      ? db
          .prepare(
            `SELECT * FROM articles WHERE id IN (${articleIds.map(() => "?").join(",")})`,
          )
          .bind(...articleIds)
          .all<ArticleRow>()
      : Promise.resolve({ results: noArticles }),
    episodeIds.length > 0
      ? db
          .prepare(
            `SELECT * FROM episodes WHERE id IN (${episodeIds.map(() => "?").join(",")})`,
          )
          .bind(...episodeIds)
          .all<EpisodeRow>()
      : Promise.resolve({ results: noEpisodes }),
  ]);

  const articleMap = new Map((articleRows.results ?? []).map((a) => [a.id, a]));
  const episodeMap = new Map((episodeRows.results ?? []).map((e) => [e.id, e]));

  interface SavedItemData {
    id: string;
    image: string | null;
    type: string;
    tag: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
  }

  const items: SavedItemData[] = [];
  for (const row of savedRows) {
    if (row.item_type === "article") {
      const a = articleMap.get(row.item_id);
      if (a) {
        items.push({
          id: row.id,
          type: "article",
          tag: a.category ?? "Article",
          title: a.title,
          excerpt: a.excerpt ?? "",
          date: a.date ?? "",
          readTime: a.read_time ?? "",
          image: a.image ?? null,
        });
      }
    } else if (row.item_type === "episode") {
      const e = episodeMap.get(row.item_id);
      if (e) {
        items.push({
          id: row.id,
          type: "podcast",
          tag: "Podcast",
          title: e.title,
          excerpt: e.description ?? "",
          date: e.date ?? "",
          readTime: e.duration ?? "",
          image: e.thumbnail ?? null,
        });
      }
    }
  }
  return NextResponse.json(items);
}
