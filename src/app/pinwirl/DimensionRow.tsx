"use client";

import { useEffect, useRef } from "react";
import type { ScoreBand } from "../../lib/pinwirlScoring";

interface Props {
  dim: string;
  score: number;
  band: ScoreBand;
  index: number;
  blurb?: string;
}

function bandModifier(band: ScoreBand): string {
  return band.toLowerCase().replace(/ /g, "-");
}

export default function DimensionRow({ dim, score, band, index, blurb }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rowRef.current?.style.setProperty("--bar-delay", String(index * 80));
    if (fillRef.current) {
      fillRef.current.style.width = `${score}%`;
    }
  }, [score, index]);

  const mod = bandModifier(band);

  return (
    <div ref={rowRef} className="pw-result-row">
      <div className="pw-result-row-header">
        <span className="pw-result-dim">{dim}</span>
        <div className="pw-result-right">
          <span className={`pw-result-band pw-result-band--${mod}`}>{band}</span>
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
