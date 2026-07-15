import { apiFetch } from "./apiClient";
import type { Article, Episode } from "./articlesApi";
import type { Video } from "./videosApi";

export type ForYouItem =
  | { kind: "article"; date: string; article: Article }
  | { kind: "episode"; date: string; episode: Episode }
  | { kind: "video"; date: string; video: Video };

// No client-side cache (unlike fetchArticles/fetchVideos/fetchEpisodes) --
// this is personalized per member, not shared CMS content.
export async function fetchForYou(): Promise<ForYouItem[]> {
  return apiFetch<ForYouItem[]>("/content/for-you");
}
