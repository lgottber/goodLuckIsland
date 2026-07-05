import { apiFetch } from "./apiClient";
import { createCachedFetcher } from "./clientCache";
import type { Episode } from "./articlesApi";

export type Playlist = {
  id: string;
  name: string;
  description: string;
};

export type PlaylistDetail = Playlist & {
  episodes: Episode[];
};

const cachedPlaylists = createCachedFetcher<Playlist[]>();
const cachedPlaylist = createCachedFetcher<PlaylistDetail>();

export async function fetchPlaylists(): Promise<Playlist[]> {
  return cachedPlaylists("playlists", () => apiFetch<Playlist[]>("/content/playlists"));
}

export async function fetchPlaylist(id: string): Promise<PlaylistDetail> {
  return cachedPlaylist(`playlist:${id}`, () =>
    apiFetch<PlaylistDetail>(`/content/playlists/${id}`),
  );
}
