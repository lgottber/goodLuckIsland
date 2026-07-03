import { apiFetch, apiFetchVoid } from "./apiClient";
import type { SurveyQuestion } from "../app/pinwirl/questions";
import { computeScores } from "./pinwirlScoring";
import type { DimensionScores } from "./pinwirlScoring";

export type PinwirlQuestionRow = {
  id: string;
  external_id: string;
  section: string;
  question_text: string;
  question_type: "scale" | "narrative" | "radio" | "select" | "number" | "text";
  required: boolean;
  hint: string | null;
  scale_min: string | null;
  scale_max: string | null;
  order_index: number;
  weight: number;
  options: string[];
};

export function toSurveyQuestion(q: PinwirlQuestionRow): SurveyQuestion {
  return {
    id: q.external_id,
    section: q.section,
    text: q.question_text,
    type: q.question_type,
    required: q.required,
    options: q.options,
    hint: q.hint ?? undefined,
    scaleMin: q.scale_min ?? undefined,
    scaleMax: q.scale_max ?? undefined,
  };
}

export async function submitPinwirlAnswers(
  userId: string,
  answers: Record<string, string | number>,
  questions: PinwirlQuestionRow[],
): Promise<DimensionScores> {
  const uuidByExternalId = new Map(questions.map((q) => [q.external_id, q.id]));

  const rows = Object.entries(answers)
    .map(([externalId, value]) => {
      const questionId = uuidByExternalId.get(externalId);
      if (!questionId) return null;
      return { questionId, answer: String(value) };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const scores = computeScores(answers, questions);

  await apiFetchVoid("/pinwirl/answers", {
    method: "POST",
    body: JSON.stringify({ rows, scores }),
  });

  return scores;
}

export async function fetchPinwirlQuestions(): Promise<PinwirlQuestionRow[]> {
  return apiFetch<PinwirlQuestionRow[]>("/pinwirl/questions");
}
