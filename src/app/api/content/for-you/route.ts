import { NextRequest, NextResponse } from "next/server";
import { getDb, parseJson, toBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

// How many of the member's top-scoring tags (member_tag_affinity, populated
// by the update_tag_affinity queued job in goodLuckAdmin) to match content
// against, and how many candidate rows per content type to scan for a
// match before giving up -- keeps this a bounded query rather than a full
// table scan as content grows.
const TOP_TAGS = 5;
const CANDIDATES_PER_TYPE = 100;
const GRID_SIZE = 9;

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
  tags: string;
}

interface EpisodeRow {
  id: number;
  num: string | null;
  title: string;
  description: string | null;
  date: string | null;
  duration: string | null;
  podcast_url: string | null;
  thumbnail: string | null;
  score: number;
  tags: string;
}

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

type ForYouItem =
  | { kind: "article"; date: string; article: ReturnType<typeof mapArticle> }
  | { kind: "episode"; date: string; episode: ReturnType<typeof mapEpisode> }
  | { kind: "video"; date: string; video: ReturnType<typeof mapVideo> };

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
  };
}

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
    score: ep.score,
  };
}

function mapVideo(v: VideoRow) {
  return {
    id: v.id,
    num: v.num,
    title: v.title,
    desc: v.description,
    date: v.date,
    duration: v.duration,
    youtubeId: v.youtube_id,
    thumbnail: v.thumbnail,
  };
}

// Drives the "For You" dashboard section (profile page): a 3x3 grid of the
// latest content across articles/episodes/videos whose tags overlap the
// member's top tag-affinity scores. Auth'd (unlike the other /content
// routes) since the result is personalized per member.
export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();

  const { results: affinityRows } = await db
    .prepare("SELECT tag FROM member_tag_affinity WHERE user_id = ? ORDER BY score DESC LIMIT ?")
    .bind(member.sub, TOP_TAGS)
    .all<{ tag: string }>();
  const topTags = new Set((affinityRows ?? []).map((r) => r.tag));
  if (topTags.size === 0) return NextResponse.json([]);

  const overlapsTopTags = (tagsJson: string) =>
    parseJson<string[]>(tagsJson, []).some((tag) => topTags.has(tag));

  const [articleRows, episodeRows, videoRows] = await Promise.all([
    db
      .prepare("SELECT * FROM articles ORDER BY date DESC, id DESC LIMIT ?")
      .bind(CANDIDATES_PER_TYPE)
      .all<ArticleRow>(),
    db
      .prepare(
        "SELECT * FROM episodes WHERE status = 'published' ORDER BY date DESC, id DESC LIMIT ?",
      )
      .bind(CANDIDATES_PER_TYPE)
      .all<EpisodeRow>(),
    db
      .prepare(
        "SELECT * FROM videos WHERE status = 'published' ORDER BY date DESC, id DESC LIMIT ?",
      )
      .bind(CANDIDATES_PER_TYPE)
      .all<VideoRow>(),
  ]);

  const items: ForYouItem[] = [
    ...(articleRows.results ?? [])
      .filter((a) => overlapsTopTags(a.tags))
      .map((a) => ({ kind: "article" as const, date: a.date ?? "", article: mapArticle(a) })),
    ...(episodeRows.results ?? [])
      .filter((e) => overlapsTopTags(e.tags))
      .map((e) => ({ kind: "episode" as const, date: e.date ?? "", episode: mapEpisode(e) })),
    ...(videoRows.results ?? [])
      .filter((v) => overlapsTopTags(v.tags))
      .map((v) => ({ kind: "video" as const, date: v.date ?? "", video: mapVideo(v) })),
  ];

  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return NextResponse.json(items.slice(0, GRID_SIZE));
}
