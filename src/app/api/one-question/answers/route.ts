import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, nowIso } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const totalParam = request.nextUrl.searchParams.get("total");
  const total = totalParam ? parseInt(totalParam, 10) : 0;

  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT question_index, answer FROM one_question_answers WHERE user_id = ? ORDER BY question_index ASC",
    )
    .bind(member.sub)
    .all<{ question_index: number; answer: string }>();

  const result = Array(total).fill("");
  for (const row of results ?? []) {
    result[row.question_index - 1] = row.answer;
  }
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { answers?: string[] } = await request.json();
  const { answers } = payload;
  if (!Array.isArray(answers)) {
    return NextResponse.json(
      { error: "answers must be an array" },
      { status: 400 },
    );
  }

  const rows = answers
    .map((answer, i) => ({ questionIndex: i + 1, answer }))
    .filter((r) => r.answer.trim() !== "");

  if (rows.length === 0) return new NextResponse(null, { status: 204 });

  const db = getDb();
  const now = nowIso();
  await db.batch(
    rows.map((r) =>
      db
        .prepare(
          `INSERT INTO one_question_answers (id, user_id, question_index, answer, updated_at)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(user_id, question_index) DO UPDATE SET answer = excluded.answer, updated_at = excluded.updated_at`,
        )
        .bind(newId(), member.sub, r.questionIndex, r.answer, now),
    ),
  );

  return new NextResponse(null, { status: 204 });
}
