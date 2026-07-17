import { apiFetch } from "./apiClient";

export type StepLinkInternalContentType = "assessment" | "video" | "episode" | "playlist";

export type StepLink = {
  id: string;
  linkType: "internal" | "external";
  externalUrl: string | null;
  internalContentType: StepLinkInternalContentType | null;
  internalContentId: string | null;
  label: string;
  labelWhenComplete: string | null;
};

export async function fetchStepLinks(stepKey: string): Promise<StepLink[]> {
  return apiFetch<StepLink[]>(`/steps/links?stepKey=${encodeURIComponent(stepKey)}`);
}

// No dedicated per-item detail route exists for playlists today (they're
// browsed inline on /articles) -- resolve to the podcasts/playlists hub as
// the best available target.
export function resolveInternalLinkHref(link: StepLink): string {
  switch (link.internalContentType) {
    case "assessment":
      return `/assessment/${link.internalContentId}`;
    case "video":
      return `/articles/videos/${link.internalContentId}`;
    case "episode":
      return `/articles/podcast/${link.internalContentId}`;
    case "playlist":
      return "/articles";
    default:
      return "#";
  }
}
