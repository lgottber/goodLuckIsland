import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "../../../../lib/db.server";
import NavBarDynamic from "../../../../components/NavBarDynamic";
import PictureImage from "../../../../components/PictureImage";
import EpisodeListenGate from "./EpisodeListenGate";
import "../../[id]/article-detail.css";

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
  is_members_only: number;
}

const fetchEpisode = cache(async (id: number): Promise<EpisodeRow | null> => {
  const db = getDb();
  return db
    .prepare("SELECT id, num, title, description, date, duration, podcast_url, thumbnail, is_members_only FROM episodes WHERE id = ?")
    .bind(id)
    .first<EpisodeRow>();
});

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) return {};
  const episode = await fetchEpisode(numId);
  if (!episode) return {};
  return {
    title: episode.title,
    description: episode.description ?? undefined,
    openGraph: {
      title: episode.title,
      description: episode.description ?? undefined,
      images: episode.thumbnail ? [{ url: episode.thumbnail }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.description ?? undefined,
      images: episode.thumbnail ? [episode.thumbnail] : undefined,
    },
  };
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();
  const episode = await fetchEpisode(numId);
  if (!episode) notFound();

  const heroImage = episode.thumbnail ? (
    <div className="content-detail-hero">
      <PictureImage
        name={episode.thumbnail}
        alt={`Thumbnail for podcast episode: ${episode.title}`}
        className="content-detail-img"
      />
    </div>
  ) : null;

  const episodeNum = episode.num ? (
    <p className="content-detail-num">{episode.num}</p>
  ) : null;

  const description = episode.description ? (
    <p className="content-detail-excerpt">{episode.description}</p>
  ) : null;

  const isMembersOnly = Boolean(episode.is_members_only);

  return (
    <>
      <NavBarDynamic activePage="articles" />
      <div className="content-detail-page">
        <div className="content-detail-back">
          <Link href="/articles?tab=podcast" className="content-detail-back-link">
            ← Back to Podcast
          </Link>
        </div>

        {heroImage}

        <div className="content-detail-body">
          <span className="content-detail-tag">Podcast</span>
          {episodeNum}
          <h1 className="content-detail-title">{episode.title}</h1>
          <div className="content-detail-meta">
            {episode.date && <span>{episode.date}</span>}
            {episode.date && episode.duration && <span className="content-detail-dot" />}
            {episode.duration && <span>{episode.duration}</span>}
          </div>
          {description}
          <EpisodeListenGate
            episodeId={episode.id}
            podcastUrl={isMembersOnly ? null : episode.podcast_url}
            isMembersOnly={isMembersOnly}
          />
          <Link href="/articles?tab=podcast" className="content-detail-cta">
            Browse all episodes →
          </Link>
        </div>
      </div>
    </>
  );
}
