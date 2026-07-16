import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb, parseJson } from "../../../../lib/db.server";
import { fetchTagLabelMap } from "../../../../lib/tags.server";
import { resolveTagLabels } from "../../../../lib/tags";
import NavBarDynamic from "../../../../components/NavBarDynamic";
import TrackedYouTubeEmbed from "../../../../components/TrackedYouTubeEmbed";
import TagPills from "../../../../components/TagPills";
import VideoDetailActions from "./VideoDetailActions";
import RelatedVideos from "./RelatedVideos";
import type { Video } from "../../../../lib/videosApi";
import "../../[id]/article-detail.css";
import "./video-detail-extra.css";

export const runtime = "edge";

const RELATED_LIMIT = 4;

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

function toVideo(row: VideoRow, tagLabelMap: Map<number, string>): Video {
  const tagIds = parseJson<number[]>(row.tags, []);
  return {
    id: row.id,
    num: row.num,
    title: row.title,
    desc: row.description,
    date: row.date,
    duration: row.duration,
    youtubeId: row.youtube_id,
    thumbnail: row.thumbnail,
    tagIds,
    tags: resolveTagLabels(tagIds, tagLabelMap),
  };
}

const fetchVideo = cache(async (id: number): Promise<VideoRow | null> => {
  const db = getDb();
  return db
    .prepare("SELECT id, num, title, description, date, duration, youtube_id, thumbnail, tags FROM videos WHERE id = ?")
    .bind(id)
    .first<VideoRow>();
});

const fetchRelatedVideos = cache(async (excludeId: number): Promise<VideoRow[]> => {
  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT id, num, title, description, date, duration, youtube_id, thumbnail, tags FROM videos WHERE status = 'published' AND id != ? ORDER BY sort_order LIMIT ?",
    )
    .bind(excludeId, RELATED_LIMIT)
    .all<VideoRow>();
  return results ?? [];
});

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) return {};
  const video = await fetchVideo(numId);
  if (!video) return {};

  const image = video.thumbnail
    ?? (video.youtube_id ? `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg` : undefined);

  return {
    title: video.title,
    description: video.description ?? undefined,
    openGraph: {
      title: video.title,
      description: video.description ?? undefined,
      images: image ? [{ url: image }] : [],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description ?? undefined,
      images: image ? [image] : undefined,
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();
  const video = await fetchVideo(numId);
  if (!video) notFound();
  const relatedRows = await fetchRelatedVideos(numId);
  const tagLabelMap = await fetchTagLabelMap();
  const videoTags = resolveTagLabels(parseJson<number[]>(video.tags, []), tagLabelMap);

  const videoNum = video.num ? (
    <p className="content-detail-num">{video.num}</p>
  ) : null;

  const embed = video.youtube_id ? (
    <div className="content-detail-embed">
      <TrackedYouTubeEmbed
        videoId={video.id}
        youtubeId={video.youtube_id}
        title={video.title}
        autoplay={false}
      />
    </div>
  ) : null;

  const description = video.description ? (
    <p className="content-detail-excerpt">{video.description}</p>
  ) : null;

  const youtubeLink = video.youtube_id ? (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="content-detail-listen-btn"
    >
      ▶ Watch on YouTube
    </a>
  ) : null;

  return (
    <>
      <NavBarDynamic activePage="articles" />
      <div className="content-detail-page">
        <div className="content-detail-back">
          <Link href="/articles?tab=videos" className="content-detail-back-link">
            ← Back to Videos
          </Link>
        </div>

        <div className="content-detail-body">
          <span className="content-detail-tag">Video</span>
          {videoNum}
          <h1 className="content-detail-title">{video.title}</h1>
          <TagPills tags={videoTags} />
          <div className="content-detail-meta">
            {video.date && <span>{video.date}</span>}
            {video.date && video.duration && <span className="content-detail-dot" />}
            {video.duration && <span>{video.duration}</span>}
          </div>
          {embed}
          <VideoDetailActions videoId={video.id} />
          {description}
          {youtubeLink}
          <Link href="/articles?tab=videos" className="content-detail-cta">
            Browse all videos →
          </Link>
          <RelatedVideos videos={relatedRows.map((row) => toVideo(row, tagLabelMap))} />
        </div>
      </div>
    </>
  );
}
