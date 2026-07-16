import { apiFetch } from "./apiClient";

export type RecommendedContentType = "article" | "episode" | "video";

export type RecommendedItem = {
  id: number;
  contentType: RecommendedContentType;
  title: string;
  href: string;
  createdAt: string;
};

export function fetchRecommendations(): Promise<RecommendedItem[]> {
  return apiFetch<RecommendedItem[]>("/content/recommendations");
}
