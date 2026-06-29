"use client";

import { useEffect, useRef, useState } from "react";
import type { DimensionScores } from "../../lib/pinwirlScoring";
import { DIMENSIONS, scoreBand, scoreColor } from "../../lib/pinwirlScoring";
import { fetchRecommendations } from "./recommendations";
import type { RecommendationsMap } from "./recommendations";
import { fetchPinwirlHistory } from "../../lib/pinwirlHistoryApi";
import type { PinwirlResult } from "../../lib/pinwirlHistoryApi";

interface Props {
  scores: DimensionScores;
  userId: string;
  onRetake: () => void;
}

export default function PinwirlResults({ scores, userId, onRetake }: Props) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationsMap | null>(null);
  const [history, setHistory] = useState<PinwirlResult[]>([]);

  useEffect(() => {
    fetchRecommendations().then(setRecommendations).catch(console.error);
    fetchPinwirlHistory(userId).then(setHistory).catch(() => {});
  }, [userId]);

  async function handleDownloadPdf() {
    if (!captureRef.current) return;
    setDownloading(true);
    try {
      const { downloadResultsPdf } = await import("./PinwirlPdfExport");
      await downloadResultsPdf(captureRef.current);
    } finally {
      setDownloading(false);
    }
  }

  const overallScore = Math.round(
    DIMENSIONS.reduce((sum, dim) => sum + scores[dim], 0) / DIMENSIONS.length,
  );

  const pastResults = history.slice(1); // exclude current (just submitted)

  return (
    <div className="pw-results" ref={captureRef}>
      <div className="pw-results-header">
        <p className="pw-eyebrow">Wayfinder Results</p>
        <h1>Your Wayfinder Score</h1>
        <div className="pw-results-overall">
          <span className="pw-results-overall-num">{overallScore}</span>
          <span className="pw-results-overall-label">Overall</span>
        </div>
        <p className="pw-results-intro">
          Here&apos;s how you scored across the 8 dimensions of a well-lived
          retirement. Your scores reflect your self-assessment today — they&apos;re a
          starting point, not a verdict.
        </p>
      </div>

      <div className="pw-results-bars">
        {DIMENSIONS.map((dim, i) => {
          const score = scores[dim];
          const band = scoreBand(score);
          const color = scoreColor(score);
          const blurb = recommendations?.[dim]?.[band];
          return (
            <div
              key={dim}
              className="pw-result-row"
              style={{ "--bar-delay": String(i * 80) } as React.CSSProperties}
            >
              <div className="pw-result-row-header">
                <span className="pw-result-dim">{dim}</span>
                <div className="pw-result-right">
                  <span className="pw-result-band" style={{ color }}>{band}</span>
                  <span className="pw-result-score">{score}</span>
                </div>
              </div>
              <div className="pw-result-bar-track">
                <div
                  className="pw-result-bar-fill"
                  style={{ width: `${score}%`, background: color }}
                />
              </div>
              {blurb && <p className="pw-result-blurb">{blurb}</p>}
            </div>
          );
        })}
      </div>

      <div className="pw-results-actions">
        <button
          type="button"
          className="pw-btn pw-btn--next"
          onClick={handleDownloadPdf}
          disabled={downloading}
        >
          {downloading ? "Generating…" : "Download PDF Report"}
        </button>
        <button type="button" className="pw-btn pw-btn--back" onClick={onRetake}>
          Retake Assessment
        </button>
      </div>

      {pastResults.length > 0 && (
        <div className="pw-results-history">
          <h3 className="pw-results-history-title">Past Assessments</h3>
          {pastResults.map((r) => {
            const past = r.scores as DimensionScores;
            const pastOverall = Math.round(
              DIMENSIONS.reduce((sum, dim) => sum + (past[dim] ?? 0), 0) / DIMENSIONS.length,
            );
            return (
              <div key={r.id} className="pw-history-row">
                <span className="pw-history-date">
                  {new Date(r.taken_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="pw-history-overall">Overall: {pastOverall}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
