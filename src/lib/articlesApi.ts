import { apiFetch } from "./apiClient";
import { createCachedFetcher } from "./clientCache";

export type Episode = {
  id: number;
  num: string | null;
  title: string;
  desc: string | null;
  date: string | null;
  duration: string | null;
  podcastUrl: string | null;
  thumbnail: string | null;
  score: number;
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
  score: number;
};

const cachedEpisodes = createCachedFetcher<Episode[]>();
const cachedArticles = createCachedFetcher<Article[]>();

export async function fetchEpisodes(): Promise<Episode[]> {
  return cachedEpisodes("episodes", () => apiFetch<Episode[]>("/content/episodes"));
}

export async function fetchArticles(): Promise<Article[]> {
  return cachedArticles("articles", () => apiFetch<Article[]>("/content/articles"));
}

export async function fetchArticlesByIds(ids: number[]): Promise<Article[]> {
  if (ids.length === 0) return [];
  return apiFetch<Article[]>(`/content/articles?ids=${ids.join(",")}`);
}

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  return apiFetch<Episode[]>(`/content/episodes?ids=${ids.join(",")}`);
}
