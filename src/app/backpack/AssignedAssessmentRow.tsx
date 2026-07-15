import Link from "next/link";
import type { AssignedAssessment, AssignedAssessmentStatus } from "../../lib/assessmentsApi";

const STATUS_LABELS: Record<AssignedAssessmentStatus, string> = {
  received: "Not Started",
  seen: "Viewed",
  started: "In Progress",
  completed: "Completed",
};

// Only Wayfinder (pinwirl) and the One Question Challenge have a live
// taking-flow today -- assessments built via the newer assessment builder
// have no member-facing submission flow wired up yet (see docs/HANDOFF.md).
const SOURCE_HREF: Record<string, string> = {
  pinwirl: "/pinwirl",
  one_question: "/one-question-retirement-challenge",
};

export default function AssignedAssessmentRow({ assessment }: { assessment: AssignedAssessment }) {
  const href = SOURCE_HREF[assessment.source];

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
