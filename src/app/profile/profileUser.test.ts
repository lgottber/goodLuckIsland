import { describe, expect, it } from "vitest";
import type { Tables } from "../../types/supabase";
import { applySupabaseFields, INITIAL_USER } from "./profileUser";

const BLANK_ROW: Tables<"users"> = {
  age: null,
  avatar_id: null,
  bio: null,
  blocked_at: null,
  city: null,
  created_at: null,
  divorced: null,
  education: null,
  email: "islander@example.com",
  employment_status: null,
  first_name: null,
  gender: null,
  geo_classifier: null,
  home_paid_off: null,
  household_composition: null,
  id: "user-1",
  ideal_retirement_day: null,
  industry: null,
  interests: null,
  is_deleted: false,
  kids: null,
  last_login: null,
  last_name: null,
  life_satisfaction: null,
  location: null,
  loneliness_connection: null,
  mantra: null,
  marital_status: null,
  net_worth: null,
  notifications_email: true,
  notifications_in_app: true,
  occupation: null,
  optimism: null,
  retired: null,
  retirement_concerns: null,
  retirement_confidence: null,
  retirement_date: null,
  retirement_date_reason: null,
  retirement_identity: null,
  retirement_motivations: null,
  retirement_vision_clarity: null,
  sense_of_purpose: null,
  state: null,
  stress_level: null,
  unsubscribed_at: null,
  updated_at: null,
  username: null,
  working_income: null,
  years_in_occupation: null,
  years_until_retirement: null,
  zip_code: null,
};

describe("applySupabaseFields", () => {
  it("falls back to prev for every nullable field when the row is entirely null", () => {
    // email is non-nullable on the row, so it always overlays prev's value.
    const result = applySupabaseFields(INITIAL_USER, BLANK_ROW, undefined);
    expect(result).toEqual({ ...INITIAL_USER, email: BLANK_ROW.email });
  });

  it("overlays string fields from the row when present", () => {
    const result = applySupabaseFields(INITIAL_USER, {
      ...BLANK_ROW,
      first_name: "Ada",
      last_name: "Lovelace",
      bio: "Mathematician",
      zip_code: "94103",
    }, undefined);
    expect(result.firstName).toBe("Ada");
    expect(result.lastName).toBe("Lovelace");
    expect(result.bio).toBe("Mathematician");
    expect(result.zipCode).toBe("94103");
  });

  it("stringifies numeric fields only when non-null", () => {
    const result = applySupabaseFields(INITIAL_USER, {
      ...BLANK_ROW,
      age: 42,
      years_in_occupation: 5,
      retirement_confidence: 7,
      life_satisfaction: 8,
      sense_of_purpose: 6,
      stress_level: 3,
      optimism: 9,
      loneliness_connection: 2,
      retirement_vision_clarity: 4,
    }, undefined);
    expect(result.age).toBe("42");
    expect(result.yearsInOccupation).toBe("5");
    expect(result.retirementConfidence).toBe("7");
    expect(result.lifeSatisfaction).toBe("8");
    expect(result.senseOfPurpose).toBe("6");
    expect(result.stressLevel).toBe("3");
    expect(result.optimism).toBe("9");
    expect(result.lonelinessConnection).toBe("2");
    expect(result.retirementVisionClarity).toBe("4");
  });

  it("preserves a numeric value of 0 instead of falling back (0 is not null)", () => {
    const result = applySupabaseFields(
      { ...INITIAL_USER, age: "keep-me" },
      { ...BLANK_ROW, age: 0 },
      undefined,
    );
    expect(result.age).toBe("0");
  });

  it("keeps prev's numeric string when the row field is null", () => {
    const result = applySupabaseFields(
      { ...INITIAL_USER, age: "37" },
      BLANK_ROW,
      undefined,
    );
    expect(result.age).toBe("37");
  });

  it("clears avatarUrl when the row has an avatar_id, ignoring the Auth0 picture", () => {
    const result = applySupabaseFields(
      { ...INITIAL_USER, avatarUrl: "https://prev.example/pic.jpg" },
      { ...BLANK_ROW, avatar_id: "palm-tree" },
      "https://auth0.example/picture.jpg",
    );
    expect(result.avatarUrl).toBe("");
    expect(result.avatarId).toBe("palm-tree");
  });

  it("uses the Auth0 picture as avatarUrl when there's no avatar_id", () => {
    const result = applySupabaseFields(
      INITIAL_USER,
      BLANK_ROW,
      "https://auth0.example/picture.jpg",
    );
    expect(result.avatarUrl).toBe("https://auth0.example/picture.jpg");
  });

  it("falls back to prev's avatarUrl when there's no avatar_id and no Auth0 picture", () => {
    const result = applySupabaseFields(
      { ...INITIAL_USER, avatarUrl: "https://prev.example/pic.jpg" },
      BLANK_ROW,
      undefined,
    );
    expect(result.avatarUrl).toBe("https://prev.example/pic.jpg");
  });

  it("overlays array fields (interests, retirement motivations/concerns) when present", () => {
    const result = applySupabaseFields(INITIAL_USER, {
      ...BLANK_ROW,
      interests: ["Golf", "Travel"],
      retirement_motivations: ["Family"],
      retirement_concerns: ["Health"],
    }, undefined);
    expect(result.interests).toEqual(["Golf", "Travel"]);
    expect(result.retirementMotivations).toEqual(["Family"]);
    expect(result.retirementConcerns).toEqual(["Health"]);
  });

  it("does not mutate the prev object", () => {
    const prev = { ...INITIAL_USER };
    applySupabaseFields(prev, { ...BLANK_ROW, first_name: "Ada" }, undefined);
    expect(prev.firstName).toBe("");
  });
});
