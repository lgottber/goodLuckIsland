import { markAssessmentStarted } from "../../../lib/assessmentsApi";
import type { AssessmentDetail } from "../../../lib/assessmentsApi";

interface Props {
  assessment: AssessmentDetail;
  onStart: () => void;
}

export default function AssessmentIntro({ assessment, onStart }: Props) {
  function handleStart() {
    markAssessmentStarted(assessment.id);
    onStart();
  }

  return (
    <div className="pw-assessment">
      <div className="pw-assessment-header">
        <p className="pw-eyebrow">Assigned Assessment</p>
        <h1>{assessment.title}</h1>
      </div>
      <p className="pw-results-intro">{assessment.description}</p>
      <p className="pw-hint">Estimated time: {assessment.estimated_minutes} min</p>
      <div className="pw-nav">
        <button type="button" className="pw-btn pw-btn--submit" onClick={handleStart}>
          Start Assessment
        </button>
      </div>
    </div>
  );
}
