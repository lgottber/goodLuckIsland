import { NextRequest, NextResponse } from "next/server";
import { getDb, fromBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

// Must match StepKey in src/lib/sevenStepApi.ts exactly -- used to build
// a column name below, so it's validated against this allowlist rather
// than ever interpolated directly from client input.
const STEP_COLUMNS = new Set([
  "one_question_challenge",
  "wayfair_tool",
  "values_and_beliefs",
  "finding_your_purpose",
  "new_skills",
  "retirement",
  "give_back_step",
]);

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { stepKey?: string } = await request.json();
  const { stepKey } = payload;
  if (!stepKey || !STEP_COLUMNS.has(stepKey)) {
    return NextResponse.json({ error: "Invalid stepKey" }, { status: 400 });
  }

  const db = getDb();
  await db
    .prepare(
      `INSERT INTO users_seven_step_process (user_id, ${stepKey})
       VALUES (?, ?)
       ON CONFLICT(user_id) DO UPDATE SET ${stepKey} = excluded.${stepKey}`,
    )
    .bind(member.sub, fromBool(true))
    .run();

  return new NextResponse(null, { status: 204 });
}
