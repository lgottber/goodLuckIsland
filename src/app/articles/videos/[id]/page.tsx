import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "../../../../lib/db.server";
import NavBarDynamic from "../../../../components/NavBarDynamic";
import "../../[id]/article-detail.css";

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
}

const fetchVideo = cache(async (id: number): Promise<VideoRow | null> => {
  const db = getDb();
  return db
    .prepare("SELECT id, num, title, description, date, duration, youtube_id, thumbnail FROM videos WHERE id = ?")
    .bind(id)
    .first<VideoRow>();
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

  const videoNum = video.num ? (
    <p className="content-detail-num">{video.num}</p>
  ) : null;

  const embed = video.youtube_id ? (
    <div className="content-detail-embed">
      <iframe
        src={`https://www.youtube.com/embed/${video.youtube_id}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
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
          <div className="content-detail-meta">
            {video.date && <span>{video.date}</span>}
            {video.date && video.duration && <span className="content-detail-dot" />}
            {video.duration && <span>{video.duration}</span>}
          </div>
          {embed}
          {description}
          {youtubeLink}
          <Link href="/articles?tab=videos" className="content-detail-cta">
            Browse all videos →
          </Link>
        </div>
      </div>
    </>
  );
}
