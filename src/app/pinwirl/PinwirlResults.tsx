"use client";

import { useEffect, useRef, useState } from "react";
import type { DimensionScores } from "../../lib/pinwirlScoring";
import { DIMENSIONS, scoreBand } from "../../lib/pinwirlScoring";
import { fetchRecommendations } from "./recommendations";
import type { RecommendationsMap } from "./recommendations";
import { fetchPinwirlHistory } from "../../lib/pinwirlHistoryApi";
import type { PinwirlResult } from "../../lib/pinwirlHistoryApi";
import DimensionRow from "./DimensionRow";
import PinwirlHistory from "./PinwirlHistory";
import { trackEvent } from "../../lib/analyticsApi";

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
    trackEvent("pinwirl_results_viewed");
  }, [userId]);

  async function handleDownloadPdf() {
    if (!captureRef.current) return;
    setDownloading(true);
    try {
      const { downloadResultsPdf } = await import("./PinwirlPdfExport");
      await downloadResultsPdf(captureRef.current);
      trackEvent("pinwirl_pdf_downloaded");
    } finally {
      setDownloading(false);
    }
  }

  const overallScore = Math.round(
    DIMENSIONS.reduce((sum, dim) => sum + scores[dim], 0) / DIMENSIONS.length,
  );

  const pastResults = history.slice(1);

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
          retirement. Your scores reflect your self-assessment today —
          they&apos;re a starting point, not a verdict.
        </p>
      </div>

      <div className="pw-results-bars">
        {DIMENSIONS.map((dim, i) => (
          <DimensionRow
            key={dim}
            dim={dim}
            score={scores[dim]}
            band={scoreBand(scores[dim])}
            index={i}
            blurb={recommendations?.[dim]?.[scoreBand(scores[dim])]}
          />
        ))}
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

      {pastResults.length > 0 && <PinwirlHistory results={pastResults} />}
    </div>
  );
}
