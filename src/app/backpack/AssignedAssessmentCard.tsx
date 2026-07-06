import Link from "next/link";
import type { AssignedAssessment } from "../../lib/assessmentsApi";

export default function AssignedAssessmentCard({ assessment }: { assessment: AssignedAssessment }) {
  const done = assessment.status === "completed";
  const inProgress = assessment.status === "started" || assessment.status === "seen";

  return (
    <div className="backpack-assess-card">
      <p className="backpack-assess-eyebrow">Assigned</p>
      <p className="backpack-assess-title">{assessment.title}</p>
      <p className={`backpack-assess-status${done ? " backpack-assess-status--done" : ""}`}>
        {done ? "✓ Completed" : inProgress ? "In Progress" : "Not started"}
      </p>
      <Link href={`/assessments/${assessment.id}`} className="backpack-assess-link">
        {done ? "View Results" : inProgress ? "Continue →" : "Start Now →"}
      </Link>
    </div>
  );
}
