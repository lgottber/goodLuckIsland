import { apiFetch } from "./apiClient";
import type { SavedItemData } from "../app/saved/SavedItem";

export async function toggleSave(
  userId: string,
  itemType: "article" | "episode" | "video",
  itemId: number,
): Promise<boolean> {
  return apiFetch<boolean>("/saved/toggle", {
    method: "POST",
    body: JSON.stringify({ itemType, itemId }),
  });
}

export async function fetchSavedIds(
  _userId: string,
): Promise<{ articles: Set<number>; episodes: Set<number>; videos: Set<number> }> {
  const { articles, episodes, videos } = await apiFetch<{
    articles: number[];
    episodes: number[];
    videos: number[];
  }>("/saved/ids");
  return { articles: new Set(articles), episodes: new Set(episodes), videos: new Set(videos) };
}

export async function fetchSavedContent(
  _userId: string,
): Promise<SavedItemData[]> {
  return apiFetch<SavedItemData[]>("/saved");
}

export async function removeSaved(
  itemType: "article" | "episode" | "video",
  numericId: number,
): Promise<void> {
  await apiFetch<boolean>("/saved/toggle", {
    method: "POST",
    body: JSON.stringify({ itemType, itemId: numericId }),
  });
}
