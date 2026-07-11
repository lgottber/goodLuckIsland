import type { Tables } from "../types/supabase";

type CompletenessFields = Pick<Tables<"users">, "first_name" | "last_name" | "age" | "zip_code">;

// Minimum bar for "profile complete" gates (7SHieLD Process start, #66) --
// deliberately small: just enough identity + the required zip (#63) for
// research demographic purposes, not every optional profile field.
export function isProfileComplete(profile: CompletenessFields | null | undefined): boolean {
  if (!profile) return false;
  return Boolean(profile.first_name && profile.last_name && profile.age && profile.zip_code);
}
