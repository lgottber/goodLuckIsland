import { supabase } from "./supabase";
import type { Tables } from "../types/supabase";
import type { SurveyQuestion } from "../app/pinwirl/questions";
import { computeScores } from "./pinwirlScoring";
import type { DimensionScores } from "./pinwirlScoring";

export type PinwirlQuestionRow = Tables<"pinwirl_questions"> & { options: string[] };

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
      return {
        user_id: userId,
        question_id: questionId,
        answer: String(value),
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const { error } = await supabase.from("pinwirl_answers").insert(rows);
  if (error) throw error;

  const scores = computeScores(answers, questions);

  const { error: resultsError } = await supabase
    .from("pinwirl_results")
    .insert({ user_id: userId, scores });
  if (resultsError) throw resultsError;

  return scores;
}

export async function fetchPinwirlQuestions(): Promise<PinwirlQuestionRow[]> {
  const [questionsResult, optionsResult] = await Promise.all([
    supabase.from("pinwirl_questions").select("*").order("order_index"),
    supabase.from("pinwirl_answer_options").select("*").order("order_index"),
  ]);

  if (questionsResult.error) throw questionsResult.error;
  if (optionsResult.error) throw optionsResult.error;

  const optionsByQuestion = (optionsResult.data ?? []).reduce<Record<string, string[]>>(
    (acc, opt) => {
      (acc[opt.question_id] ??= []).push(opt.option_text);
      return acc;
    },
    {},
  );

  return (questionsResult.data ?? []).map((q) => ({
    ...q,
    options: optionsByQuestion[q.id] ?? [],
  }));
}
