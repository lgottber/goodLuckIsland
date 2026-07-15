import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

interface AssignedAssessmentRow {
  assessment_id: string;
  title: string;
  type: string;
  source: string;
  estimated_minutes: number;
  assigned_at: string;
  status: string | null;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { results } = await db
    .prepare(
      `SELECT aa.assessment_id, a.title, a.type, a.source, a.estimated_minutes, aa.assigned_at,
              COALESCE(ac.status, 'received') as status
       FROM assessment_assignments aa
       JOIN assessments a ON a.id = aa.assessment_id
       LEFT JOIN assessment_completions ac
         ON ac.assessment_id = aa.assessment_id AND ac.user_id = aa.user_id
       WHERE aa.user_id = ? AND a.status = 'published'
       ORDER BY aa.assigned_at DESC`,
    )
    .bind(member.sub)
    .all<AssignedAssessmentRow>();

  return NextResponse.json(
    (results ?? []).map((r) => ({
      assessmentId: r.assessment_id,
      title: r.title,
      type: r.type,
      source: r.source,
      estimatedMinutes: r.estimated_minutes,
      assignedAt: r.assigned_at,
      status: r.status ?? "received",
    })),
  );
}
