import { apiFetch } from "./apiClient";

export type Episode = {
  id: number;
  num: string | null;
  title: string;
  desc: string | null;
  date: string | null;
  duration: string | null;
  youtubeId: string | null;
  thumbnail: string | null;
};

export type Article = {
  id: number;
  category: string;
  title: string;
  excerpt: string | null;
  date: string | null;
  readTime: string | null;
  image: string | null;
  featured: boolean;
};

export async function fetchEpisodes(): Promise<Episode[]> {
  return apiFetch<Episode[]>("/content/episodes");
}

export async function fetchArticles(): Promise<Article[]> {
  return apiFetch<Article[]>("/content/articles");
}

export async function fetchArticlesByIds(ids: number[]): Promise<Article[]> {
  if (ids.length === 0) return [];
  return apiFetch<Article[]>(`/content/articles?ids=${ids.join(",")}`);
}

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  return apiFetch<Episode[]>(`/content/episodes?ids=${ids.join(",")}`);
}
