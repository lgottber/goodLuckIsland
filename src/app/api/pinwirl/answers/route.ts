import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, toJson, nowIso } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

interface AnswerRow {
  questionId: string;
  answer: string;
}

// Question-id mapping and score computation happen client-side (public,
// non-sensitive question data + a pure scoring function) -- this route
// only persists the results, always scoped to the verified member.
export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { rows?: AnswerRow[]; scores?: Record<string, number> } =
    await request.json();
  const { rows, scores } = payload;
  if (!Array.isArray(rows) || !scores) {
    return NextResponse.json(
      { error: "rows and scores are required" },
      { status: 400 },
    );
  }

  const db = getDb();
  const now = nowIso();
  const statements = rows.map((r) =>
    db
      .prepare(
        "INSERT INTO pinwirl_answers (id, user_id, question_id, answer, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      )
      .bind(newId(), member.sub, r.questionId, r.answer, now, now),
  );
  statements.push(
    db
      .prepare(
        "INSERT INTO pinwirl_results (id, user_id, taken_at, scores) VALUES (?, ?, ?, ?)",
      )
      .bind(newId(), member.sub, now, toJson(scores)),
  );
  await db.batch(statements);

  return new NextResponse(null, { status: 204 });
}
