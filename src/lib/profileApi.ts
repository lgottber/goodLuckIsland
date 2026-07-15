import { apiFetch, apiFetchVoid } from "./apiClient";
import type { Tables } from "../types/supabase";

// age and yearsInOccupation are strings in form state, parsed to numbers before saving
export type ProfileUpdate = {
  email: Tables<"users">["email"];
  firstName: Tables<"users">["first_name"];
  lastName: Tables<"users">["last_name"];
  username: Tables<"users">["username"];
  location: Tables<"users">["location"];
  zipCode: Tables<"users">["zip_code"];
  city: Tables<"users">["city"];
  state: Tables<"users">["state"];
  bio: Tables<"users">["bio"];
  mantra: Tables<"users">["mantra"];
  interests: Tables<"users">["interests"];
  age: string;
  occupation: Tables<"users">["occupation"];
  yearsInOccupation: string;
  education: Tables<"users">["education"];
  retired: Tables<"users">["retired"];
  retirementDate: Tables<"users">["retirement_date"];
  retirementDateReason: Tables<"users">["retirement_date_reason"];
  maritalStatus: Tables<"users">["marital_status"];
  divorced: Tables<"users">["divorced"];
  kids: Tables<"users">["kids"];
  homePaidOff: Tables<"users">["home_paid_off"];
  workingIncome: Tables<"users">["working_income"];
  netWorth: Tables<"users">["net_worth"];
  avatarId: Tables<"users">["avatar_id"];
  // Gen X wellness research fields (#72)
  gender: Tables<"users">["gender"];
  householdComposition: Tables<"users">["household_composition"];
  geoClassifier: Tables<"users">["geo_classifier"];
  employmentStatus: Tables<"users">["employment_status"];
  industry: Tables<"users">["industry"];
  yearsUntilRetirement: Tables<"users">["years_until_retirement"];
  retirementConfidence: string;
  lifeSatisfaction: string;
  senseOfPurpose: string;
  stressLevel: string;
  optimism: string;
  lonelinessConnection: string;
  retirementIdentity: Tables<"users">["retirement_identity"];
  retirementVisionClarity: string;
  retirementMotivations: Tables<"users">["retirement_motivations"];
  retirementConcerns: Tables<"users">["retirement_concerns"];
  idealRetirementDay: Tables<"users">["ideal_retirement_day"];
};

// userId kept in the signature for call-site compatibility, but the
// server always writes to the verified member's own row now -- this
// value is never trusted or sent.
export async function createUser(userId: string, email: string) {
  await apiFetchVoid("/profile/create", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function fetchProfile(
  _userId: string,
): Promise<Tables<"users"> | null> {
  return apiFetch<Tables<"users"> | null>("/profile");
}

export async function exportProfileData(
  _userId: string,
): Promise<Tables<"users">> {
  const profile = await apiFetch<Tables<"users"> | null>("/profile");
  if (!profile) throw new Error("Profile not found");
  return profile;
}

export async function updateNotificationPrefs(
  userId: string,
  emailEnabled: boolean,
): Promise<void> {
  await apiFetchVoid("/profile/notifications", {
    method: "PATCH",
    body: JSON.stringify({ emailEnabled }),
  });
}

export async function updateInAppNotificationPrefs(
  userId: string,
  inAppEnabled: boolean,
): Promise<void> {
  await apiFetchVoid("/profile/notifications", {
    method: "PATCH",
    body: JSON.stringify({ inAppEnabled }),
  });
}

// Soft delete -- the account isn't removed immediately, see
// POST /api/delete-account. Logging back in before the nightly purge
// runs cancels it (GET /api/profile resets the flag).
export async function deleteAccount(): Promise<void> {
  await apiFetchVoid("/delete-account", { method: "POST" });
}

export async function upsertProfile(userId: string, updated: ProfileUpdate) {
  await apiFetchVoid("/profile", {
    method: "PUT",
    body: JSON.stringify(updated),
  });
}
