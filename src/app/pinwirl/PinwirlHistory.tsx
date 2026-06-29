import { DIMENSIONS } from "../../lib/pinwirlScoring";
import type { PinwirlResult } from "../../lib/pinwirlHistoryApi";
import HistoryRow from "./HistoryRow";

interface Props {
  results: PinwirlResult[];
}

function computeOverall(scores: PinwirlResult["scores"]): number {
  return Math.round(
    DIMENSIONS.reduce((sum, dim) => sum + scores[dim], 0) / DIMENSIONS.length,
  );
}

export default function PinwirlHistory({ results }: Props) {
  return (
    <div className="pw-results-history">
      <h3 className="pw-results-history-title">Past Assessments</h3>
      {results.map((r) => (
        <HistoryRow key={r.id} takenAt={r.taken_at} overall={computeOverall(r.scores)} />
      ))}
    </div>
  );
}
