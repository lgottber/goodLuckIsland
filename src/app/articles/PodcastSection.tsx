import { useEffect, useState } from "react";
import PodcastBody from "./PodcastBody";
import type { Episode } from "../../lib/articlesApi";
import { matchesDurationFilter } from "../../lib/durationFilter";

const PAGE_SIZE = 12;

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
  const visibleEpisodes = rest.filter((ep) => matchesDurationFilter(ep.duration, durationFilter));
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
