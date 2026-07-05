import { apiFetch, apiFetchVoid } from "./apiClient";

export type EarnedBadge = {
  id: string;
  name: string;
  image: string;
};

export type ContentType = "article" | "video" | "episode";

export async function fetchEarnedBadges(): Promise<EarnedBadge[]> {
  return apiFetch<EarnedBadge[]>("/badges");
}

// Fire-and-forget, like trackEvent -- a failed view-tracking call should
// never block or break the read/watch/listen action it's attached to.
export function markContentViewed(contentType: ContentType, contentId: number): void {
  apiFetchVoid("/content-views", {
    method: "POST",
    body: JSON.stringify({ contentType, contentId }),
  }).catch(() => {});
}
