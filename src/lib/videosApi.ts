import { apiFetch } from "./apiClient";
import { createCachedFetcher } from "./clientCache";

export type Video = {
  id: number;
  num: string | null;
  title: string;
  desc: string | null;
  date: string | null;
  duration: string | null;
  youtubeId: string | null;
  thumbnail: string | null;
  tagIds: number[];
  tags: string[];
};

const cachedVideos = createCachedFetcher<Video[]>();

export async function fetchVideos(): Promise<Video[]> {
  return cachedVideos("videos", () => apiFetch<Video[]>("/content/videos"));
}

export async function fetchVideosByIds(ids: number[]): Promise<Video[]> {
  if (ids.length === 0) return [];
  return apiFetch<Video[]>(`/content/videos?ids=${ids.join(",")}`);
}
