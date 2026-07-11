export default function SpotifyEmbed({ episodeId, title }: { episodeId: string; title: string }) {
  return (
    <iframe
      className="spotify-embed"
      src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator`}
      title={`Listen to ${title} on Spotify`}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
