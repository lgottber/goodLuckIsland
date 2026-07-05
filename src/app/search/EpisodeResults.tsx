import EpisodeCard from "../articles/EpisodeCard";
import SearchSection from "./SearchSection";
import type { Episode } from "../../lib/articlesApi";

interface Props {
  episodes: Episode[];
  userId: string;
  savedEpisodeIds: Set<number>;
}

export default function EpisodeResults({ episodes, userId, savedEpisodeIds }: Props) {
  return (
    <SearchSection title="Podcast Episodes">
      <div className="search-episode-grid">
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            ep={ep}
            userId={userId}
            isSaved={savedEpisodeIds.has(ep.id)}
          />
        ))}
      </div>
    </SearchSection>
  );
}
