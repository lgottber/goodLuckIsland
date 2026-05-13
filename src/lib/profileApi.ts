import { supabase } from "./supabase";
import type { Tables } from "../types/supabase";

// age and yearsInOccupation are strings in form state, parsed to numbers before saving
export type ProfileUpdate = {
  email: Tables<"users">["email"];
  firstName: Tables<"users">["first_name"];
  lastName: Tables<"users">["last_name"];
  username: Tables<"users">["username"];
  location: Tables<"users">["location"];
  bio: Tables<"users">["bio"];
  mantra: Tables<"users">["mantra"];
  interests: Tables<"users">["interests"];
  age: string;
  occupation: Tables<"users">["occupation"];
  yearsInOccupation: string;
  education: Tables<"users">["education"];
  retired: Tables<"users">["retired"];
  retirementDate: Tables<"users">["retirement_date"];
  maritalStatus: Tables<"users">["marital_status"];
  divorced: Tables<"users">["divorced"];
  kids: Tables<"users">["kids"];
  homePaidOff: Tables<"users">["home_paid_off"];
  workingIncome: Tables<"users">["working_income"];
  netWorth: Tables<"users">["net_worth"];
  avatarId: Tables<"users">["avatar_id"];
};

export async function createUser(userId: string, email: string) {
  const { error } = await supabase.from("users").insert({
    id: userId,
    email: email,
  });
  if (error) throw error;
}

export async function fetchProfile(userId: string): Promise<Tables<"users"> | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export async function exportProfileData(userId: string): Promise<Tables<"users">> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertProfile(userId: string, updated: ProfileUpdate) {
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
    age: updated.age !== "" ? parseInt(updated.age, 10) : null,
    occupation: updated.occupation,
    years_in_occupation: updated.yearsInOccupation !== ""
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
  if (error) throw error;
}
