import HistoryRow from "../../pinwirl/HistoryRow";
import { overallScore } from "../../../lib/assessmentScoring";
import type { AssessmentHistoryEntry } from "../../../lib/assessmentsApi";

export default function AssessmentHistoryList({ attempts }: { attempts: AssessmentHistoryEntry[] }) {
  return (
    <div className="pw-results-history">
      <h3 className="pw-results-history-title">Past Attempts</h3>
      {attempts.map((attempt) => (
        <HistoryRow key={attempt.id} takenAt={attempt.taken_at} overall={overallScore(attempt.scores)} />
      ))}
    </div>
  );
}
