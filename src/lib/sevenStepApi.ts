import { supabase } from "./supabase";

export type StepKey =
  | "one_question_challenge"
  | "wayfair_tool"
  | "values_and_beliefs"
  | "finding_your_purpose"
  | "new_skills"
  | "retirement"
  | "give_back_step";

export const STEP_ORDER: readonly StepKey[] = [
  "one_question_challenge",
  "wayfair_tool",
  "values_and_beliefs",
  "finding_your_purpose",
  "new_skills",
  "retirement",
  "give_back_step",
];

// Maps backpack_sections.slug → users_seven_step_process column
export const SLUG_TO_STEP: Record<string, StepKey> = {
  "one-question": "one_question_challenge",
  "pinwirl": "wayfair_tool",
  "values": "values_and_beliefs",
  "purpose": "finding_your_purpose",
  "skills": "new_skills",
  "together": "retirement",
  "giveback": "give_back_step",
};

export type UserProgress = {
  one_question_challenge: boolean;
  wayfair_tool: boolean;
  values_and_beliefs: boolean;
  finding_your_purpose: boolean;
  new_skills: boolean;
  retirement: boolean;
  give_back_step: boolean;
};

export async function fetchUserProgress(userId: string): Promise<UserProgress | null> {
  const { data } = await supabase
    .from("users_seven_step_process")
    .select(
      "one_question_challenge, wayfair_tool, values_and_beliefs, finding_your_purpose, new_skills, retirement, give_back_step",
    )
    .eq("user_id", userId)
    .single();
  return data;
}

export async function markStepComplete(userId: string, stepKey: StepKey): Promise<void> {
  const { error } = await supabase
    .from("users_seven_step_process")
    .upsert({ user_id: userId, [stepKey]: true }, { onConflict: "user_id" });
  if (error) throw new Error(error.message);
}

export function countCompleted(progress: UserProgress | null): number {
  if (!progress) return 0;
  return STEP_ORDER.filter((k) => progress[k]).length;
}

export function isStepLocked(stepIndex: number, progress: UserProgress | null): boolean {
  if (stepIndex === 0) return false;
  if (!progress) return true;
  const prevKey = STEP_ORDER[stepIndex - 1];
  return prevKey !== undefined ? !progress[prevKey] : false;
}
