import { apiFetch, apiFetchVoid } from "./apiClient";

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
  pinwirl: "wayfair_tool",
  values: "values_and_beliefs",
  purpose: "finding_your_purpose",
  skills: "new_skills",
  together: "retirement",
  giveback: "give_back_step",
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

export async function fetchUserProgress(
  _userId: string,
): Promise<UserProgress | null> {
  return apiFetch<UserProgress | null>("/seven-step/progress");
}

export async function markStepComplete(
  userId: string,
  stepKey: StepKey,
): Promise<void> {
  await apiFetchVoid("/seven-step/complete", {
    method: "POST",
    body: JSON.stringify({ stepKey }),
  });
}

export function countCompleted(progress: UserProgress | null): number {
  if (!progress) return 0;
  return STEP_ORDER.filter((k) => progress[k]).length;
}

export function isStepLocked(
  stepIndex: number,
  progress: UserProgress | null,
): boolean {
  if (stepIndex === 0) return false;
  if (!progress) return true;
  const prevKey = STEP_ORDER[stepIndex - 1];
  return prevKey !== undefined ? !progress[prevKey] : false;
}
