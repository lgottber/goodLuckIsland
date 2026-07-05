import { apiFetch } from "./apiClient";
import type { Episode } from "./articlesApi";

export type Playlist = {
  id: string;
  name: string;
  description: string;
};

export type PlaylistDetail = Playlist & {
  episodes: Episode[];
};

export async function fetchPlaylists(): Promise<Playlist[]> {
  return apiFetch<Playlist[]>("/content/playlists");
}

export async function fetchPlaylist(id: string): Promise<PlaylistDetail> {
  return apiFetch<PlaylistDetail>(`/content/playlists/${id}`);
}
