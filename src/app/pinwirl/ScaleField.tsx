import type { SurveyQuestion } from "./questions";

export default function ScaleField({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: number | undefined;
  onChange: (v: number) => void;
}) {
  return (
    <div className="pw-scale-wrap">
      <div className="pw-scale-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            className={`pw-scale-btn${value === n ? " pw-scale-btn--active" : ""}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="pw-scale-labels">
        <span>1 — {question.scaleMin}</span>
        <span>10 — {question.scaleMax}</span>
      </div>
    </div>
  );
}
