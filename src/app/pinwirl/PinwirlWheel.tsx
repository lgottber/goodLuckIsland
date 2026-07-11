"use client";

import { DIMENSIONS } from "../../lib/pinwirlScoring";
import type { DimensionScores } from "../../lib/pinwirlScoring";
import { SIZE, CENTER, MAX_R } from "./pinwirlWheelGeometry";
import PinwirlWheelWedge from "./PinwirlWheelWedge";

interface Props {
  scores: DimensionScores;
}

// Wheel-of-life chart: each dimension gets an equal-angle wedge, and the
// wedge's own radius reflects its own 0-100 score, colored by the same
// band system as the bars below (scoreColor). Mirrors the admin PDF
// report's dimension wheel (lib/pdfReport.server.ts) so members see the
// same shape of chart the assessment produces for their report.
export default function PinwirlWheel({ scores }: Props) {
  const n = DIMENSIONS.length;
  const angleStep = (2 * Math.PI) / n;

  return (
    <div className="pw-wheel-wrap">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="pw-wheel"
        role="img"
        aria-label="Wellness wheel showing your score in each of the 8 dimensions"
      >
        <circle cx={CENTER} cy={CENTER} r={MAX_R} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={MAX_R * 0.5}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1}
        />
        {DIMENSIONS.map((dim, i) => (
          <PinwirlWheelWedge
            key={dim}
            dim={dim}
            score={scores[dim]}
            thetaStart={angleStep * i}
            thetaEnd={angleStep * (i + 1)}
          />
        ))}
      </svg>
    </div>
  );
}
