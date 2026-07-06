import { NextRequest, NextResponse } from "next/server";
import { getDb, nowIso } from "../../../../../lib/db.server";
import { verifyMember } from "../../../../../lib/auth.server";

export const runtime = "edge";

// Monotonic: advances 'received' or 'seen' to 'started'. A no-op if the
// member has no active assignment row, or has already started/completed.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  await db
    .prepare(
      `UPDATE assessment_assignments SET status = 'started', updated_at = ?
       WHERE assessment_id = ? AND user_id = ? AND unassigned_at IS NULL AND status IN ('received', 'seen')`,
    )
    .bind(nowIso(), id, member.sub)
    .run();

  return new NextResponse(null, { status: 204 });
}
