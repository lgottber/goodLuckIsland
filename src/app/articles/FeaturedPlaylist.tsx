import Icon from "../../components/Icon";
import type { Playlist } from "../../lib/playlistsApi";

export default function FeaturedPlaylist({
  featured,
  onSelect,
}: {
  featured: Playlist;
  onSelect: () => void;
}) {
  return (
    <div className="featured-playlist">
      <p className="featured-label">
        <Icon name="star" size={12} /> Featured Playlist
      </p>
      <h2 className="featured-playlist-title">{featured.name}</h2>
      <p className="featured-playlist-desc">{featured.description}</p>
      <button type="button" className="btn-read" onClick={onSelect}>
        View Playlist
      </button>
    </div>
  );
}
