"use client";

import { scoreColor } from "../../lib/pinwirlScoring";
import { CENTER, MAX_R, polarPoint } from "./pinwirlWheelGeometry";

interface Props {
  dim: string;
  score: number;
  thetaStart: number;
  thetaEnd: number;
}

export default function PinwirlWheelWedge({ dim, score, thetaStart, thetaEnd }: Props) {
  const wedgeR = Math.max(MAX_R * (Math.min(Math.max(score, 0), 100) / 100), 3);
  const largeArc = thetaEnd - thetaStart > Math.PI ? 1 : 0;
  const p1 = polarPoint(wedgeR, thetaStart);
  const p2 = polarPoint(wedgeR, thetaEnd);
  const d = `M ${CENTER} ${CENTER} L ${p1.x} ${p1.y} A ${wedgeR} ${wedgeR} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;
  return (
    <path d={d} fill={scoreColor(score)} stroke="#2e8b7a" strokeWidth={1.5}>
      <title>{`${dim}: ${score}`}</title>
    </path>
  );
}
