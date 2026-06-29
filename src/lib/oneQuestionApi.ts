import { supabase } from "./supabase";

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
  const [qRes, oRes] = await Promise.all([
    supabase
      .from("one_questions")
      .select("*")
      .order("index", { ascending: true, nullsFirst: false }),
    supabase
      .from("one_question_answer_options")
      .select("*")
      .order("order_index"),
  ]);
  if (qRes.error) throw qRes.error;
  if (oRes.error) throw oRes.error;

  const optsByQ = (oRes.data ?? []).reduce<Record<string, string[]>>(
    (acc, o) => {
      (acc[o.question_id] ??= []).push(o.option_text);
      return acc;
    },
    {},
  );

  return (qRes.data ?? []).map((q) => ({
    id: q.id,
    index: q.index,
    content: q.content,
    question_type: q.question_type ?? "text",
    hint: q.hint,
    required: q.required ?? true,
    scale_min: q.scale_min,
    scale_max: q.scale_max,
    options: optsByQ[q.id] ?? [],
  }));
}

export async function fetchOneQuestionAnswers(
  userId: string,
  total: number,
): Promise<string[]> {
  const { data } = await supabase
    .from("one_question_answers")
    .select("question_index, answer")
    .eq("user_id", userId)
    .order("question_index", { ascending: true });

  const result = Array(total).fill("");
  for (const row of data ?? []) {
    result[row.question_index - 1] = row.answer;
  }
  return result;
}

export async function saveOneQuestionAnswers(
  userId: string,
  answers: string[],
): Promise<void> {
  const rows = answers
    .map((answer, i) => ({
      user_id: userId,
      question_index: i + 1,
      answer,
      updated_at: new Date().toISOString(),
    }))
    .filter((r) => r.answer.trim() !== "");

  if (rows.length === 0) return;

  const { error } = await supabase
    .from("one_question_answers")
    .upsert(rows, { onConflict: "user_id,question_index" });

  if (error) throw error;
}

export async function fetchOneQuestionCompleted(
  userId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("users_seven_step_process")
    .select("one_question_challenge")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.one_question_challenge ?? false;
}

export async function markOneQuestionComplete(userId: string): Promise<void> {
  const { error } = await supabase
    .from("users_seven_step_process")
    .upsert(
      { user_id: userId, one_question_challenge: true },
      { onConflict: "user_id" },
    );

  if (error) throw error;
}
