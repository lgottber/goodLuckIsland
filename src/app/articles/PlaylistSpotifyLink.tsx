import Icon from "../../components/Icon";
import { trackEvent } from "../../lib/analyticsApi";

export default function PlaylistSpotifyLink({
  playlistId,
  spotifyUrl,
}: {
  playlistId: string;
  spotifyUrl: string;
}) {
  return (
    <a
      href={spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="playlist-spotify-link"
      onClick={() => trackEvent("playlist_opened_in_spotify", { playlistId })}
    >
      <Icon name="headphones" size={15} />
      Listen on Spotify
    </a>
  );
}
