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
