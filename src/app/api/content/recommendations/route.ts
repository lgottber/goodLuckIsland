import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";
import { getTopTagsForUser } from "../../../../lib/analyticsQuery.server";

export const runtime = "edge";

const RECOMMENDATION_LIMIT = 4;

type RecommendedContentType = "article" | "episode" | "video";

interface RecommendationRow {
  content_type: RecommendedContentType;
  id: number;
  title: string;
  created_at: string;
}

function hrefFor(row: RecommendationRow): string {
  if (row.content_type === "article") return `/articles/${row.id}`;
  if (row.content_type === "episode") return `/articles/podcast/${row.id}`;
  return `/articles/videos/${row.id}`;
}

// The 4 newest items (across articles, podcasts, and videos -- assessments
// are excluded since generic assessment-builder assessments have no
// member-facing detail page yet, see #103) tagged with any of the member's
// top 5 most-viewed tags. Tags are stored as a JSON-encoded number[] text
// column, so membership is checked via SQLite's json_each table-valued
// function rather than a native array-contains operator.
export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { env } = getRequestContext<CloudflareEnv>();
  const tagIds = await getTopTagsForUser(env, member.sub);
  if (tagIds.length === 0) return NextResponse.json([]);

  const db = getDb();
  const placeholders = tagIds.map(() => "?").join(",");
  const { results } = await db
    .prepare(
      `SELECT 'article' AS content_type, id, title, created_at FROM articles
         WHERE EXISTS (SELECT 1 FROM json_each(tags) WHERE value IN (${placeholders}))
       UNION ALL
       SELECT 'episode' AS content_type, id, title, created_at FROM episodes
         WHERE status = 'published'
           AND EXISTS (SELECT 1 FROM json_each(tags) WHERE value IN (${placeholders}))
       UNION ALL
       SELECT 'video' AS content_type, id, title, created_at FROM videos
         WHERE status = 'published'
           AND EXISTS (SELECT 1 FROM json_each(tags) WHERE value IN (${placeholders}))
       ORDER BY created_at DESC
       LIMIT ?`,
    )
    .bind(...tagIds, ...tagIds, ...tagIds, RECOMMENDATION_LIMIT)
    .all<RecommendationRow>();

  return NextResponse.json(
    (results ?? []).map((r) => ({
      id: r.id,
      contentType: r.content_type,
      title: r.title,
      href: hrefFor(r),
      createdAt: r.created_at,
    })),
  );
}
