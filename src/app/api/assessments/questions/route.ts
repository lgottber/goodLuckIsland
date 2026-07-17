import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../lib/db.server";

export const runtime = "edge";

interface QuestionRow {
  id: string;
  order_index: number;
  question_text: string;
  question_type: "multiple_choice" | "scale" | "yes_no" | "open_text";
  required: number;
  hint: string | null;
  scale_min: string | null;
  scale_max: string | null;
}

interface AnswerOptionRow {
  id: string;
  question_id: string;
  option_text: string;
  order_index: number;
}

// Public CMS content -- questions/options for a published assessment are
// not sensitive, matching pinwirl/questions and one-question/questions'
// no-auth precedent for the same kind of content.
export async function GET(request: NextRequest) {
  const assessmentId = request.nextUrl.searchParams.get("id");
  if (!assessmentId) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const db = getDb();
  const { results: questions } = await db
    .prepare(
      "SELECT * FROM assessment_questions WHERE assessment_id = ? ORDER BY order_index ASC",
    )
    .bind(assessmentId)
    .all<QuestionRow>();

  const questionIds = (questions ?? []).map((q) => q.id);
  const optionsByQuestion = new Map<string, AnswerOptionRow[]>();
  if (questionIds.length > 0) {
    const placeholders = questionIds.map(() => "?").join(", ");
    const { results: options } = await db
      .prepare(
        `SELECT * FROM assessment_answer_options WHERE question_id IN (${placeholders}) ORDER BY order_index ASC`,
      )
      .bind(...questionIds)
      .all<AnswerOptionRow>();
    for (const opt of options ?? []) {
      const list = optionsByQuestion.get(opt.question_id) ?? [];
      list.push(opt);
      optionsByQuestion.set(opt.question_id, list);
    }
  }

  const mapped = (questions ?? []).map((q) => ({
    id: q.id,
    questionText: q.question_text,
    questionType: q.question_type,
    required: q.required === 1,
    hint: q.hint,
    scaleMin: q.scale_min,
    scaleMax: q.scale_max,
    options: (optionsByQuestion.get(q.id) ?? []).map((o) => o.option_text),
  }));

  return NextResponse.json(mapped, { headers: publicCacheHeaders(300, 3600) });
}
