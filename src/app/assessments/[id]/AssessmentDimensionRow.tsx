"use client";

import { useEffect, useRef } from "react";
import { ZONE_LABEL } from "../../../lib/assessmentScoring";
import type { Zone } from "../../../lib/assessmentScoring";

interface Props {
  dimension: string;
  score: number;
  zone: Zone;
  index: number;
  blurb?: string;
}

const ZONE_MODIFIER = ["needs-attention", "developing", "strong"] as const;

export default function AssessmentDimensionRow({ dimension, score, zone, index, blurb }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rowRef.current?.style.setProperty("--bar-delay", String(index * 80));
    if (fillRef.current) fillRef.current.style.width = `${score}%`;
  }, [score, index]);

  const mod = ZONE_MODIFIER[zone];

  return (
    <div ref={rowRef} className="pw-result-row">
      <div className="pw-result-row-header">
        <span className="pw-result-dim">{dimension}</span>
        <div className="pw-result-right">
          <span className={`pw-result-band pw-result-band--${mod}`}>{ZONE_LABEL[zone]}</span>
          <span className="pw-result-score">{score}</span>
        </div>
      </div>
      <div className="pw-result-bar-track">
        <div ref={fillRef} className={`pw-result-bar-fill pw-result-bar-fill--${mod}`} />
      </div>
      {blurb && <p className="pw-result-blurb">{blurb}</p>}
    </div>
  );
}
