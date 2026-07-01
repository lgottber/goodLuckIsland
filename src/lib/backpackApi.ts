import { supabase } from "./supabase";

export async function fetchBackpackSections() {
  const { data, error } = await supabase
    .from("backpack_sections")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((s) => ({
    id: s.slug,
    label: s.label,
    emoji: s.emoji,
    color: s.color,
    tagline: s.tagline,
    description: s.description,
    type: s.type,
  }));
}

export type BackpackSection = Awaited<ReturnType<typeof fetchBackpackSections>>[number];

export async function fetchBackpackSectionBySlug(slug: string): Promise<BackpackSection | null> {
  const { data } = await supabase
    .from("backpack_sections")
    .select("*")
    .eq("slug", slug)
    .single();
  if (!data) return null;
  return {
    id: data.slug,
    label: data.label,
    emoji: data.emoji,
    color: data.color,
    tagline: data.tagline,
    description: data.description,
    type: data.type,
  };
}
