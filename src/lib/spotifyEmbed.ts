/** Returns the Spotify episode ID if the URL is a Spotify episode URL, otherwise null. */
export function parseSpotifyEpisodeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "open.spotify.com") return null;
    const match = parsed.pathname.match(/^\/episode\/([A-Za-z0-9]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
