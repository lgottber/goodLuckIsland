import { supabase } from "./supabase";
import type { Tables } from "../types/supabase";

export type PinwirlQuestionRow = Tables<"pinwirl_questions"> & { options: string[] };

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
