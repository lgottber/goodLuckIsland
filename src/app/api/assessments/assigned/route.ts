import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

interface AssignedAssessmentRow {
  id: string;
  slug: string;
  title: string;
  status: "received" | "seen" | "started" | "completed";
}

// Powers the Backpack hub's "assessments assigned to me" list -- only
// published assessments the member has an active (non-revoked) assignment
// for, per goodLuckAdmin's Assign tab.
export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { results } = await db
    .prepare(
      `SELECT a.id as id, a.slug as slug, a.title as title, aa.status as status
       FROM assessment_assignments aa
       JOIN assessments a ON a.id = aa.assessment_id
       WHERE aa.user_id = ? AND aa.unassigned_at IS NULL AND a.status = 'published'
       ORDER BY aa.assigned_at ASC`,
    )
    .bind(member.sub)
    .all<AssignedAssessmentRow>();

  return NextResponse.json(results ?? []);
}
