import { supabase } from "./supabase";

export async function fetchStepReflections(stepSlug: string): Promise<string[]> {
  const { data } = await supabase
    .from("reflections")
    .select("body")
    .eq("step_slug", stepSlug)
    .order("sort_order");
  return (data ?? []).map((r) => r.body);
}
