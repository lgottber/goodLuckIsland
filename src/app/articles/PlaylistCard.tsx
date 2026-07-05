import type { Playlist } from "../../lib/playlistsApi";

export default function PlaylistCard({
  playlist,
  onSelect,
}: {
  playlist: Playlist;
  onSelect: () => void;
}) {
  return (
    <button type="button" className="playlist-card" onClick={onSelect}>
      <h3 className="playlist-card-title">{playlist.name}</h3>
      <p className="playlist-card-desc">{playlist.description}</p>
      <span className="playlist-card-count">Playlist</span>
    </button>
  );
}
