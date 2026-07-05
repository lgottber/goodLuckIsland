import { NextResponse } from "next/server";
import { getDb, publicCacheHeaders, toBool } from "../../../../lib/db.server";

export const runtime = "edge";

interface OneQuestionRow {
  id: string;
  index: number | null;
  content: string;
  question_type: string;
  hint: string | null;
  required: number;
  scale_min: string | null;
  scale_max: string | null;
}

interface OptionRow {
  question_id: string;
  option_text: string;
}

// Public content -- no auth check needed, matching no-RLS today.
export async function GET() {
  const db = getDb();
  const [qRes, oRes] = await Promise.all([
    db
      .prepare(
        `SELECT * FROM one_questions ORDER BY "index" IS NULL, "index" ASC`,
      )
      .all<OneQuestionRow>(),
    db
      .prepare("SELECT * FROM one_question_answer_options ORDER BY order_index")
      .all<OptionRow>(),
  ]);

  const optsByQ: Record<string, string[]> = {};
  for (const o of oRes.results ?? []) {
    (optsByQ[o.question_id] ??= []).push(o.option_text);
  }

  const questions = (qRes.results ?? []).map((q) => ({
    id: q.id,
    index: q.index,
    content: q.content,
    question_type: q.question_type ?? "text",
    hint: q.hint,
    required: toBool(q.required),
    scale_min: q.scale_min,
    scale_max: q.scale_max,
    options: optsByQ[q.id] ?? [],
  }));

  return NextResponse.json(questions, {
    headers: publicCacheHeaders(300, 3600),
  });
}
