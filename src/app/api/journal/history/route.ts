import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

interface JournalHistoryRow {
  id: string;
  body: string;
  created_at: string;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stepSlug = request.nextUrl.searchParams.get("stepSlug");
  if (!stepSlug)
    return NextResponse.json(
      { error: "stepSlug is required" },
      { status: 400 },
    );

  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT id, body, created_at FROM journal_entry_history WHERE user_id = ? AND step_slug = ? ORDER BY created_at DESC",
    )
    .bind(member.sub, stepSlug)
    .all<JournalHistoryRow>();

  return NextResponse.json(results ?? []);
}
