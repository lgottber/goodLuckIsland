import { supabase } from "./supabase.ts";

export async function fetchProfile(userId) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export async function exportProfileData(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertProfile(userId, updated) {
  const { error } = await supabase.from("users").upsert({
    id: userId,
    email: updated.email,
    first_name: updated.firstName,
    last_name: updated.lastName,
    username: updated.username,
    location: updated.location,
    bio: updated.bio,
    mantra: updated.mantra,
    interests: updated.interests,
    age: updated.age ? parseInt(updated.age, 10) : null,
    occupation: updated.occupation,
    years_in_occupation: updated.yearsInOccupation
      ? parseInt(updated.yearsInOccupation, 10)
      : null,
    education: updated.education,
    retired: updated.retired,
    retirement_date: updated.retirementDate,
    marital_status: updated.maritalStatus,
    divorced: updated.divorced,
    kids: updated.kids,
    home_paid_off: updated.homePaidOff,
    working_income: updated.workingIncome,
    net_worth: updated.netWorth,
    avatar_id: updated.avatarId,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error("Failed to save profile:", error);
}
