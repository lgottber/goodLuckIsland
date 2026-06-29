"use client";

export default function OqrcScaleInput({
  id,
  value,
  scaleMin,
  scaleMax,
  onChange,
}: {
  id: string;
  value: string;
  scaleMin: string;
  scaleMax: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="oqrc-scale-wrap">
      <input
        id={id}
        type="range"
        className="oqrc-scale-input"
        min={Number(scaleMin)}
        max={Number(scaleMax)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="oqrc-scale-labels">
        <span>{scaleMin}</span>
        <span className="oqrc-scale-value">{value || "—"}</span>
        <span>{scaleMax}</span>
      </div>
    </div>
  );
}
