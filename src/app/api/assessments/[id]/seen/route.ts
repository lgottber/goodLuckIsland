import { NextRequest, NextResponse } from "next/server";
import { getDb, nowIso } from "../../../../../lib/db.server";
import { verifyMember } from "../../../../../lib/auth.server";

export const runtime = "edge";

// Monotonic: only advances a fresh ('received') assignment to 'seen'.
// A no-op if the member has no active assignment row for this assessment,
// or has already progressed past this point.
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
      `UPDATE assessment_assignments SET status = 'seen', updated_at = ?
       WHERE assessment_id = ? AND user_id = ? AND unassigned_at IS NULL AND status = 'received'`,
    )
    .bind(nowIso(), id, member.sub)
    .run();

  return new NextResponse(null, { status: 204 });
}
