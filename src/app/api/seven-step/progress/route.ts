import { NextRequest, NextResponse } from "next/server";
import { getDb, toBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

interface ProgressRow {
  one_question_challenge: number;
  wayfair_tool: number;
  values_and_beliefs: number;
  finding_your_purpose: number;
  new_skills: number;
  retirement: number;
  give_back_step: number;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const row = await db
    .prepare(
      `SELECT one_question_challenge, wayfair_tool, values_and_beliefs, finding_your_purpose,
              new_skills, retirement, give_back_step
       FROM users_seven_step_process WHERE user_id = ?`,
    )
    .bind(member.sub)
    .first<ProgressRow>();

  if (!row) return NextResponse.json(null);

  return NextResponse.json({
    one_question_challenge: toBool(row.one_question_challenge),
    wayfair_tool: toBool(row.wayfair_tool),
    values_and_beliefs: toBool(row.values_and_beliefs),
    finding_your_purpose: toBool(row.finding_your_purpose),
    new_skills: toBool(row.new_skills),
    retirement: toBool(row.retirement),
    give_back_step: toBool(row.give_back_step),
  });
}
