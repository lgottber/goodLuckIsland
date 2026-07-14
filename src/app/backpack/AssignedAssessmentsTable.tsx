"use client";

import { useEffect, useState } from "react";
import { fetchAssignedAssessments, type AssignedAssessment } from "../../lib/assessmentsApi";
import AssignedAssessmentRow from "./AssignedAssessmentRow";

export default function AssignedAssessmentsTable() {
  const [assessments, setAssessments] = useState<AssignedAssessment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchAssignedAssessments()
      .then(setAssessments)
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || assessments.length === 0) return null;

  return (
    <div className="assigned-assessments-section">
      <p className="backpack-assess-eyebrow">Assigned to You</p>
      <div className="assigned-assessments-scroll">
        <table className="assigned-assessments-table">
          <thead>
            <tr>
              <th>Assessment</th>
              <th>Est. Time</th>
              <th>Status</th>
              <th>Assigned</th>
              <th aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {assessments.map((a) => (
              <AssignedAssessmentRow key={a.assessmentId} assessment={a} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
