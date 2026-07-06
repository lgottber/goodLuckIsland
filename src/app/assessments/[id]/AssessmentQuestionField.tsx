import AssessmentRadioOption from "./AssessmentRadioOption";
import type { AssessmentQuestion } from "../../../lib/assessmentsApi";

interface Props {
  question: AssessmentQuestion;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
}

// scale_min/scale_max are text captions, not numeric bounds (see
// assessmentScoring.ts) -- the 1-10 range here is fixed, matching
// src/app/pinwirl/ScaleField.tsx's precedent.
export default function AssessmentQuestionField({ question, value, onChange }: Props) {
  switch (question.question_type) {
    case "scale":
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
            <span>1 — {question.scale_min}</span>
            <span>10 — {question.scale_max}</span>
          </div>
        </div>
      );
    case "multiple_choice":
      return (
        <div className="pw-radio-group">
          {question.options.map((opt) => (
            <AssessmentRadioOption
              key={opt}
              questionId={question.id}
              option={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
          ))}
        </div>
      );
    case "yes_no":
      return (
        <div className="pw-radio-group">
          {["Yes", "No"].map((opt) => (
            <AssessmentRadioOption
              key={opt}
              questionId={question.id}
              option={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
          ))}
        </div>
      );
    case "open_text":
      return (
        <textarea
          className="pw-textarea"
          rows={4}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return null;
  }
}
