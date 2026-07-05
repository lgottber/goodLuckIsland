import { useEffect, useState } from "react";
import PodcastBody from "./PodcastBody";
import type { Episode } from "../../lib/articlesApi";

const PAGE_SIZE = 12;

function parseMins(duration: string | null): number {
  if (!duration) return 0;
  const h = duration.match(/(\d+)h/);
  const m = duration.match(/(\d+)\s*min/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

function matchesDuration(ep: Episode, filter: string): boolean {
  if (filter === "all") return true;
  const mins = parseMins(ep.duration);
  if (filter === "short") return mins < 30;
  if (filter === "medium") return mins >= 30 && mins <= 60;
  if (filter === "long") return mins > 60;
  return true;
}

interface Props {
  episodes: Episode[];
  userId: string;
  savedEpisodeIds: Set<number>;
}

export default function PodcastSection({ episodes, userId, savedEpisodeIds }: Props) {
  const [durationFilter, setDurationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [durationFilter]);

  const featured = episodes[0];
  if (!featured) {
    return <p className="podcast-empty">No episodes yet.</p>;
  }

  const rest = episodes.slice(1);
  const visibleEpisodes = rest.filter((ep) => matchesDuration(ep, durationFilter));
  const totalPages = Math.max(1, Math.ceil(visibleEpisodes.length / PAGE_SIZE));
  const pageEpisodes = visibleEpisodes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <PodcastBody
      featured={featured}
      visibleEpisodes={pageEpisodes}
      userId={userId}
      savedEpisodeIds={savedEpisodeIds}
      durationFilter={durationFilter}
      setDurationFilter={setDurationFilter}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
