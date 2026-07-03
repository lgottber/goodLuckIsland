import { apiFetch, apiFetchVoid } from "./apiClient";

export type QuestionType = "text" | "scale" | "radio" | "select" | "number";

export interface OneQuestion {
  id: string;
  index: number | null;
  content: string;
  question_type: QuestionType;
  hint: string | null;
  required: boolean;
  scale_min: string | null;
  scale_max: string | null;
  options: string[];
}

export async function fetchOneQuestions(): Promise<OneQuestion[]> {
  return apiFetch<OneQuestion[]>("/one-question/questions");
}

export async function fetchOneQuestionAnswers(
  userId: string,
  total: number,
): Promise<string[]> {
  return apiFetch<string[]>(`/one-question/answers?total=${total}`);
}

export async function saveOneQuestionAnswers(
  userId: string,
  answers: string[],
): Promise<void> {
  await apiFetchVoid("/one-question/answers", {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
}

export async function fetchOneQuestionCompleted(
  _userId: string,
): Promise<boolean> {
  return apiFetch<boolean>("/one-question/completed");
}

export async function markOneQuestionComplete(_userId: string): Promise<void> {
  await apiFetchVoid("/one-question/complete", { method: "POST" });
}
