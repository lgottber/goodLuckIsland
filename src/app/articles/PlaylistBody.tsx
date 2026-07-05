import EpisodeCard from "./EpisodeCard";
import type { PlaylistDetail } from "../../lib/playlistsApi";

interface Props {
  playlist: PlaylistDetail;
  userId: string;
  savedEpisodeIds: Set<number>;
}

export default function PlaylistBody({ playlist, userId, savedEpisodeIds }: Props) {
  return (
    <>
      <div className="playlist-detail-header">
        <span className="articles-header-eyebrow">Playlist</span>
        <h2>{playlist.name}</h2>
        <p className="playlist-detail-desc">{playlist.description}</p>
      </div>

      <div className="episodes-grid">
        {playlist.episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            ep={ep}
            userId={userId}
            isSaved={savedEpisodeIds.has(ep.id)}
          />
        ))}
      </div>
      {playlist.episodes.length === 0 && (
        <p className="podcast-empty">This playlist has no episodes yet.</p>
      )}
    </>
  );
}
