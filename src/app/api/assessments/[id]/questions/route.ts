import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders, toBool } from "../../../../../lib/db.server";

export const runtime = "edge";

interface QuestionRow {
  id: string;
  order_index: number;
  question_text: string;
  question_type: "multiple_choice" | "scale" | "yes_no" | "open_text";
  dimension: string | null;
  weight: number;
  required: number;
  hint: string | null;
  scale_min: string | null;
  scale_max: string | null;
}

// Public content -- mirrors src/app/api/pinwirl/questions/route.ts. Only
// serves questions for published assessments.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = getDb();

  const assessment = await db
    .prepare("SELECT id FROM assessments WHERE id = ? AND status = 'published'")
    .bind(id)
    .first<{ id: string }>();
  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  const [questionsResult, optionsResult] = await Promise.all([
    db
      .prepare("SELECT * FROM assessment_questions WHERE assessment_id = ? ORDER BY order_index")
      .bind(id)
      .all<QuestionRow>(),
    db
      .prepare(
        `SELECT ao.question_id as question_id, ao.option_text as option_text
         FROM assessment_answer_options ao
         JOIN assessment_questions q ON q.id = ao.question_id
         WHERE q.assessment_id = ?
         ORDER BY ao.order_index`,
      )
      .bind(id)
      .all<{ question_id: string; option_text: string }>(),
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

  return NextResponse.json(questions, {
    headers: publicCacheHeaders(300, 3600),
  });
}
