import { apiFetch, apiFetchVoid } from "./apiClient";

export type AssessmentQuestionType = "multiple_choice" | "scale" | "yes_no" | "open_text";

export type AssessmentQuestionRow = {
  id: string;
  questionText: string;
  questionType: AssessmentQuestionType;
  required: boolean;
  hint: string | null;
  scaleMin: string | null;
  scaleMax: string | null;
  options: string[];
};

export async function fetchAssessmentQuestions(
  assessmentId: string,
): Promise<AssessmentQuestionRow[]> {
  return apiFetch<AssessmentQuestionRow[]>(
    `/assessments/questions?id=${encodeURIComponent(assessmentId)}`,
  );
}

export async function submitAssessmentAnswers(
  assessmentId: string,
  answers: Record<string, string>,
): Promise<void> {
  const rows = Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer }));
  await apiFetchVoid("/assessments/answers", {
    method: "POST",
    body: JSON.stringify({ assessmentId, rows }),
  });
}
