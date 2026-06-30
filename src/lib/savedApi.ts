import { supabase } from "./supabase";
import { fetchArticlesByIds, fetchEpisodesByIds } from "./articlesApi";
import type { SavedItemData } from "../app/saved/SavedItem";

export async function toggleSave(
  userId: string,
  itemType: "article" | "episode",
  itemId: number,
): Promise<boolean> {
  const { data } = await supabase
    .from("saved_items")
    .select("id")
    .eq("user_id", userId)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .maybeSingle();

  if (data) {
    await supabase.from("saved_items").delete().eq("id", data.id);
    return false;
  }
  await supabase.from("saved_items").insert({ user_id: userId, item_type: itemType, item_id: itemId });
  return true;
}

export async function fetchSavedIds(
  userId: string,
): Promise<{ articles: Set<number>; episodes: Set<number> }> {
  const { data } = await supabase
    .from("saved_items")
    .select("item_type, item_id")
    .eq("user_id", userId);

  const articles = new Set<number>();
  const episodes = new Set<number>();
  for (const row of data ?? []) {
    if (row.item_type === "article") articles.add(row.item_id);
    else if (row.item_type === "episode") episodes.add(row.item_id);
  }
  return { articles, episodes };
}

export async function fetchSavedContent(userId: string): Promise<SavedItemData[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("id, item_type, item_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  const rows = data ?? [];

  const articleIds = rows.filter((r) => r.item_type === "article").map((r) => r.item_id);
  const episodeIds = rows.filter((r) => r.item_type === "episode").map((r) => r.item_id);

  const [articles, episodes] = await Promise.all([
    fetchArticlesByIds(articleIds),
    fetchEpisodesByIds(episodeIds),
  ]);

  const articleMap = new Map(articles.map((a) => [a.id, a]));
  const episodeMap = new Map(episodes.map((e) => [e.id, e]));

  const items: SavedItemData[] = [];
  for (const row of rows) {
    if (row.item_type === "article") {
      const a = articleMap.get(row.item_id);
      if (a) {
        items.push({
          id: row.id,
          type: "article",
          tag: a.category ?? "Article",
          title: a.title,
          excerpt: a.excerpt ?? "",
          date: a.date ?? "",
          readTime: a.readTime ?? "",
          image: a.image ?? null,
        });
      }
    } else if (row.item_type === "episode") {
      const e = episodeMap.get(row.item_id);
      if (e) {
        items.push({
          id: row.id,
          type: "podcast",
          tag: "Podcast",
          title: e.title,
          excerpt: e.desc ?? "",
          date: e.date ?? "",
          readTime: e.duration ?? "",
          image: e.thumbnail ?? null,
        });
      }
    }
  }
  return items;
}
