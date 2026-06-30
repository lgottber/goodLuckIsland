import EpisodeCard from "../articles/EpisodeCard";
import SearchSection from "./SearchSection";
import type { Episode } from "../../lib/articlesApi";

interface Props {
  episodes: Episode[];
  userId: string;
  savedEpisodeIds: Set<number>;
  onPlay: (ep: Episode) => void;
}

export default function EpisodeResults({ episodes, userId, savedEpisodeIds, onPlay }: Props) {
  return (
    <SearchSection title="Podcast Episodes">
      <div className="search-episode-grid">
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            ep={ep}
            onPlay={() => onPlay(ep)}
            userId={userId}
            isSaved={savedEpisodeIds.has(ep.id)}
          />
        ))}
      </div>
    </SearchSection>
  );
}
