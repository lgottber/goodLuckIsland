import { describe, expect, it } from "vitest";
import { parseSpotifyEpisodeId } from "./spotifyEmbed";

describe("parseSpotifyEpisodeId", () => {
  it("extracts episode ID from a Spotify episode URL", () => {
    expect(parseSpotifyEpisodeId("https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk")).toBe("4rOoJ6Egrf8K2IrywzwOMk");
  });

  it("ignores query params in a Spotify episode URL", () => {
    expect(parseSpotifyEpisodeId("https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk?si=abc123")).toBe("4rOoJ6Egrf8K2IrywzwOMk");
  });

  it("returns null for a Spotify show URL (not an episode)", () => {
    expect(parseSpotifyEpisodeId("https://open.spotify.com/show/5CnDmMUG0S5bSSw612fs8C")).toBeNull();
  });

  it("returns null for an Apple Podcasts URL", () => {
    expect(parseSpotifyEpisodeId("https://podcasts.apple.com/us/podcast/id123456789")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(parseSpotifyEpisodeId("")).toBeNull();
  });

  it("returns null for a malformed URL", () => {
    expect(parseSpotifyEpisodeId("not-a-url")).toBeNull();
  });
});
