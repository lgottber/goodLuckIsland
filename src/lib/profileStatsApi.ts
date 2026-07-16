import { apiFetch } from "./apiClient";

export type ProfileStats = {
  articlesRead: number;
  podcastsListened: number;
  daysActive: number;
};

export function fetchProfileStats(): Promise<ProfileStats> {
  return apiFetch<ProfileStats>("/profile/stats");
}
