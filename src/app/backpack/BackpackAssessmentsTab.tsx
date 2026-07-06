import Link from "next/link";
import { useEffect, useState } from "react";
import type { UserProgress } from "../../lib/sevenStepApi";
import { fetchAssignedAssessments } from "../../lib/assessmentsApi";
import type { AssignedAssessment } from "../../lib/assessmentsApi";
import AssignedAssessmentCard from "./AssignedAssessmentCard";

interface Props {
  progress: UserProgress | null;
}

export default function BackpackAssessmentsTab({ progress }: Props) {
  const oqrcDone = progress?.one_question_challenge ?? false;
  const pinwirlDone = progress?.wayfair_tool ?? false;
  const [assigned, setAssigned] = useState<AssignedAssessment[]>([]);

  useEffect(() => {
    fetchAssignedAssessments().then(setAssigned).catch(() => {});
  }, []);

  return (
    <div className="backpack-assessments">
      <div className="backpack-assess-card">
        <p className="backpack-assess-eyebrow">Step 1</p>
        <p className="backpack-assess-title">One Question Challenge</p>
        <p className={`backpack-assess-status${oqrcDone ? " backpack-assess-status--done" : ""}`}>
          {oqrcDone ? "✓ Completed" : "Not started"}
        </p>
        <Link href="/one-question-retirement-challenge" className="backpack-assess-link">
          {oqrcDone ? "Review Answers" : "Start Now →"}
        </Link>
      </div>

      <div className="backpack-assess-card">
        <p className="backpack-assess-eyebrow">Step 2</p>
        <p className="backpack-assess-title">Wayfinder (PinWIRL)</p>
        <p className={`backpack-assess-status${pinwirlDone ? " backpack-assess-status--done" : ""}`}>
          {pinwirlDone ? "✓ Completed" : "Not started"}
        </p>
        <Link href="/pinwirl" className="backpack-assess-link">
          {pinwirlDone ? "View Results" : "Take Assessment →"}
        </Link>
      </div>

      {assigned.map((a) => (
        <AssignedAssessmentCard key={a.id} assessment={a} />
      ))}
    </div>
  );
}
