import { supabase } from "./supabase";

export async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin", { user_id: userId });
  if (error) throw error;
  return !!data;
}
