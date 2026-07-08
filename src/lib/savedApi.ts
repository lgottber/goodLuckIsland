import { apiFetch } from "./apiClient";
import type { SavedItemData } from "../app/saved/SavedItem";

export async function toggleSave(
  userId: string,
  itemType: "article" | "episode",
  itemId: number,
): Promise<boolean> {
  return apiFetch<boolean>("/saved/toggle", {
    method: "POST",
    body: JSON.stringify({ itemType, itemId }),
  });
}

export async function fetchSavedIds(
  _userId: string,
): Promise<{ articles: Set<number>; episodes: Set<number> }> {
  const { articles, episodes } = await apiFetch<{
    articles: number[];
    episodes: number[];
  }>("/saved/ids");
  return { articles: new Set(articles), episodes: new Set(episodes) };
}

export async function fetchSavedContent(
  _userId: string,
): Promise<SavedItemData[]> {
  return apiFetch<SavedItemData[]>("/saved");
}

export async function removeSaved(
  itemType: "article" | "episode",
  numericId: number,
): Promise<void> {
  await apiFetch<boolean>("/saved/toggle", {
    method: "POST",
    body: JSON.stringify({ itemType, itemId: numericId }),
  });
}
