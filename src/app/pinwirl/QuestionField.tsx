import ScaleField from "./ScaleField";
import RadioOption from "./RadioOption";
import type { SurveyQuestion } from "./questions";

export default function QuestionField({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
}) {
  switch (question.type) {
    case "scale":
      return (
        <ScaleField
          question={question}
          value={typeof value === "number" ? value : undefined}
          onChange={(v) => onChange(v)}
        />
      );
    case "narrative":
      return (
        <div>
          {question.hint && <p className="pw-hint">{question.hint}</p>}
          <textarea
            className="pw-textarea"
            rows={4}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case "radio":
      return (
        <div className="pw-radio-group">
          {(question.options ?? []).map((opt) => (
            <RadioOption
              key={opt}
              questionId={question.id}
              option={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
          ))}
        </div>
      );
    case "select":
      return (
        <select
          className="pw-select"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select a state…</option>
          {(question.options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    case "number":
      return (
        <input
          type="number"
          className="pw-input"
          value={value !== undefined && value !== null ? String(value) : ""}
          min={0}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "text":
      return (
        <input
          type="text"
          className="pw-input pw-input--wide"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return null;
  }
}
