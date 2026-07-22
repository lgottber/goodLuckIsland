interface Props {
  scaleMin: string | null;
  scaleMax: string | null;
}

export default function AssessmentScaleLabels({ scaleMin, scaleMax }: Props) {
  return (
    <div className="pw-scale-labels">
      <span>1 — {scaleMin}</span>
      <span>10 — {scaleMax}</span>
    </div>
  );
}
