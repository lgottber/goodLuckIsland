import { supabase } from "./supabase";

export async function fetchOqrcResponse(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("oqrc_response")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data?.oqrc_response ?? null;
}

export async function saveOqrcResponse(userId: string, response: string): Promise<void> {
  const { error } = await supabase
    .from("users")
    .update({ oqrc_response: response })
    .eq("id", userId);
  if (error) throw error;
}
