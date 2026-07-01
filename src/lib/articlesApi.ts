import { supabase } from "./supabase";

export async function fetchEpisodes() {
  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((ep) => ({
    id: ep.id,
    num: ep.num,
    title: ep.title,
    desc: ep.description,
    date: ep.date,
    duration: ep.duration,
    youtubeId: ep.youtube_id,
    thumbnail: ep.thumbnail,
  }));
}

export async function fetchArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((a) => ({
    id: a.id,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    date: a.date,
    readTime: a.read_time,
    image: a.image,
    featured: a.featured,
  }));
}

export type Episode = Awaited<ReturnType<typeof fetchEpisodes>>[number];
export type Article = Awaited<ReturnType<typeof fetchArticles>>[number];

export async function fetchArticlesByIds(ids: number[]): Promise<Article[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase.from("articles").select("*").in("id", ids);
  if (error) throw error;
  return (data ?? []).map((a) => ({
    id: a.id,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    date: a.date,
    readTime: a.read_time,
    image: a.image,
    featured: a.featured,
  }));
}

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase.from("episodes").select("*").in("id", ids);
  if (error) throw error;
  return (data ?? []).map((ep) => ({
    id: ep.id,
    num: ep.num,
    title: ep.title,
    desc: ep.description,
    date: ep.date,
    duration: ep.duration,
    youtubeId: ep.youtube_id,
    thumbnail: ep.thumbnail,
  }));
}
