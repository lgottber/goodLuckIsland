import { supabase } from "./supabase";

export async function fetchOneQuestionAnswers(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from("one_question_answers")
    .select("question_index, answer")
    .eq("user_id", userId)
    .order("question_index", { ascending: true });

  const result = Array(8).fill("");
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
