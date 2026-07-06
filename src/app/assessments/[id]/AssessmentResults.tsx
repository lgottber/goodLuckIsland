"use client";

import { useEffect, useState } from "react";
import AssessmentDimensionResultItem from "./AssessmentDimensionResultItem";
import AssessmentHistoryList from "./AssessmentHistoryList";
import AssessmentOverallScore from "./AssessmentOverallScore";
import { overallScore } from "../../../lib/assessmentScoring";
import { fetchAssessmentHistory } from "../../../lib/assessmentsApi";
import type { AssessmentDetail, AssessmentHistoryEntry } from "../../../lib/assessmentsApi";

interface Props {
  assessment: AssessmentDetail;
  scores: Record<string, number>;
  onRetake: () => void;
}

export default function AssessmentResults({ assessment, scores, onRetake }: Props) {
  const [history, setHistory] = useState<AssessmentHistoryEntry[]>([]);

  useEffect(() => {
    fetchAssessmentHistory(assessment.id).then(setHistory).catch(() => {});
  }, [assessment.id]);

  const template = assessment.reportTemplate;
  const showSummary = template?.showSummary ?? true;
  const showBreakdown = template?.showDimensionBreakdown ?? true;
  const showRecommendations = template?.showRecommendations ?? true;
  const overall = overallScore(scores);
  const pastAttempts = history.slice(1);

  return (
    <div className="pw-results">
      <div className="pw-results-header">
        <p className="pw-eyebrow">{assessment.title} — Results</p>
        <h1>Your Results</h1>
        {showSummary && <AssessmentOverallScore overall={overall} />}
        {template?.introText && <p className="pw-results-intro">{template.introText}</p>}
      </div>

      {showBreakdown && (
        <div className="pw-results-bars">
          {assessment.dimensions.map((dim, i) => (
            <AssessmentDimensionResultItem
              key={dim.name}
              dimension={dim}
              score={scores[dim.name] ?? 0}
              index={i}
              recommendations={assessment.recommendations}
              showRecommendations={showRecommendations}
            />
          ))}
        </div>
      )}

      <div className="pw-results-actions">
        <button type="button" className="pw-btn pw-btn--back" onClick={onRetake}>
          Retake Assessment
        </button>
      </div>

      {pastAttempts.length > 0 && <AssessmentHistoryList attempts={pastAttempts} />}
    </div>
  );
}
