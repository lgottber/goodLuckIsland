import { NextResponse } from "next/server";
import { getDb, toBool } from "../../../../lib/db.server";

export const runtime = "edge";

interface PinwirlQuestionRow {
  id: string;
  external_id: string;
  section: string;
  question_text: string;
  question_type: "scale" | "narrative" | "radio" | "select" | "number" | "text";
  required: number;
  hint: string | null;
  scale_min: string | null;
  scale_max: string | null;
  order_index: number;
  weight: number;
}

// Public content -- no auth check needed, matching no-RLS today.
export async function GET() {
  const db = getDb();
  const [questionsResult, optionsResult] = await Promise.all([
    db
      .prepare("SELECT * FROM pinwirl_questions ORDER BY order_index")
      .all<PinwirlQuestionRow>(),
    db
      .prepare("SELECT * FROM pinwirl_answer_options ORDER BY order_index")
      .all<{
        question_id: string;
        option_text: string;
      }>(),
  ]);

  const optionsByQuestion: Record<string, string[]> = {};
  for (const opt of optionsResult.results ?? []) {
    (optionsByQuestion[opt.question_id] ??= []).push(opt.option_text);
  }

  const questions = (questionsResult.results ?? []).map((q) => ({
    ...q,
    required: toBool(q.required),
    options: optionsByQuestion[q.id] ?? [],
  }));

  return NextResponse.json(questions);
}
