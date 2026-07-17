import Link from "next/link";
import type { AssignedAssessment, AssignedAssessmentStatus } from "../../lib/assessmentsApi";

const STATUS_LABELS: Record<AssignedAssessmentStatus, string> = {
  received: "Not Started",
  seen: "Viewed",
  started: "In Progress",
  completed: "Completed",
};

// Wayfinder (pinwirl) and the One Question Challenge predate the generic
// assessment builder and keep their own standalone routes/tables (see
// StepLinkAction.tsx). source='generic' assessments (e.g. Values and
// Beliefs) are taken via /assessment/[id] instead.
const SOURCE_HREF: Record<string, string> = {
  pinwirl: "/pinwirl",
  one_question: "/one-question-retirement-challenge",
};

function resolveAssignedAssessmentHref(assessment: AssignedAssessment): string | null {
  if (assessment.source === "generic") return `/assessment/${assessment.assessmentId}`;
  return SOURCE_HREF[assessment.source] ?? null;
}

export default function AssignedAssessmentRow({ assessment }: { assessment: AssignedAssessment }) {
  const href = resolveAssignedAssessmentHref(assessment);

  return (
    <tr>
      <td>{assessment.title}</td>
      <td>{assessment.estimatedMinutes} min</td>
      <td>{STATUS_LABELS[assessment.status]}</td>
      <td>{new Date(assessment.assignedAt).toLocaleDateString()}</td>
      <td>
        {href ? (
          <Link href={href} className="backpack-assess-link">
            {assessment.status === "completed" ? "View Results" : "Take Assessment"} →
          </Link>
        ) : (
          <span className="assigned-assessments-coming-soon">Coming soon</span>
        )}
      </td>
    </tr>
  );
}
