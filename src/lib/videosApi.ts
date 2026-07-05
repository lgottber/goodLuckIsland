import { apiFetch } from "./apiClient";

export type Video = {
  id: number;
  num: string | null;
  title: string;
  desc: string | null;
  date: string | null;
  duration: string | null;
  youtubeId: string | null;
  thumbnail: string | null;
};

export async function fetchVideos(): Promise<Video[]> {
  return apiFetch<Video[]>("/content/videos");
}

export async function fetchVideosByIds(ids: number[]): Promise<Video[]> {
  if (ids.length === 0) return [];
  return apiFetch<Video[]>(`/content/videos?ids=${ids.join(",")}`);
}
