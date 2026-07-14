const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ScaleField({
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <div className="scale-field">
      <div className="yes-no-group">
        {SCALE.map((n) => (
          <button
            key={n}
            type="button"
            className={`yes-no-btn scale-field-btn ${value === String(n) ? "active" : ""}`}
            onClick={() => onChange(String(n))}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="scale-field-labels">
        <span>1 — {lowLabel}</span>
        <span>10 — {highLabel}</span>
      </div>
    </div>
  );
}
