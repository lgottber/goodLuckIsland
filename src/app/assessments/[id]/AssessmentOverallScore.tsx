export default function AssessmentOverallScore({ overall }: { overall: number }) {
  return (
    <div className="pw-results-overall">
      <span className="pw-results-overall-num">{overall}</span>
      <span className="pw-results-overall-label">Overall</span>
    </div>
  );
}
