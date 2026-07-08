import { apiFetch } from "./apiClient";

export type EarnedBadge = {
  id: string;
  name: string;
  image_slug: string;
};

export async function fetchUserBadges(): Promise<EarnedBadge[]> {
  return apiFetch<EarnedBadge[]>("/badges");
}
