import AssessmentDimensionRow from "./AssessmentDimensionRow";
import { zoneForScore, pickRecommendation } from "../../../lib/assessmentScoring";
import type { ScorableDimension } from "../../../lib/assessmentScoring";
import type { Recommendation } from "../../../lib/assessmentsApi";

interface Props {
  dimension: ScorableDimension;
  score: number;
  index: number;
  recommendations: Recommendation[];
  showRecommendations: boolean;
}

export default function AssessmentDimensionResultItem({
  dimension,
  score,
  index,
  recommendations,
  showRecommendations,
}: Props) {
  const zone = zoneForScore(score, dimension);
  const blurb = showRecommendations
    ? pickRecommendation(dimension.name, zone, recommendations)?.body
    : undefined;

  return (
    <AssessmentDimensionRow
      dimension={dimension.name}
      score={score}
      zone={zone}
      index={index}
      blurb={blurb}
    />
  );
}
