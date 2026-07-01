import { supabase } from "./supabase";

export type JournalEntry = {
  id: string;
  step_slug: string;
  body: string;
  updated_at: string;
};

export async function fetchJournalEntry(
  userId: string,
  stepSlug: string,
): Promise<JournalEntry | null> {
  const { data } = await supabase
    .from("journal_entries")
    .select("id, step_slug, body, updated_at")
    .eq("user_id", userId)
    .eq("step_slug", stepSlug)
    .single();
  return data;
}

export async function saveJournalEntry(
  userId: string,
  stepSlug: string,
  body: string,
): Promise<void> {
  const { error } = await supabase.from("journal_entries").upsert(
    { user_id: userId, step_slug: stepSlug, body, updated_at: new Date().toISOString() },
    { onConflict: "user_id,step_slug" },
  );
  if (error) throw new Error(error.message);
}

export type PastPersonQuestion = {
  key: string;
  text: string;
  placeholder: string;
  sort_order: number;
};

export async function fetchPastPersonQuestions(): Promise<PastPersonQuestion[]> {
  const { data } = await supabase
    .from("past_person_questions")
    .select("key, text, placeholder, sort_order")
    .order("sort_order");
  return data ?? [];
}

export async function fetchPastPersonAnswers(
  userId: string,
): Promise<Record<string, string>> {
  const { data } = await supabase
    .from("past_person_answers")
    .select("question_key, answer")
    .eq("user_id", userId);
  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    map[row.question_key] = row.answer;
  }
  return map;
}

export async function savePastPersonAnswer(
  userId: string,
  questionKey: string,
  answer: string,
): Promise<void> {
  const { error } = await supabase.from("past_person_answers").upsert(
    { user_id: userId, question_key: questionKey, answer, updated_at: new Date().toISOString() },
    { onConflict: "user_id,question_key" },
  );
  if (error) throw new Error(error.message);
}
