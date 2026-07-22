import RadioOption from "../../pinwirl/RadioOption";
import AssessmentScaleButtons from "./AssessmentScaleButtons";
import type { AssessmentQuestionRow } from "../../../lib/assessmentApi";

interface Props {
  question: AssessmentQuestionRow;
  value: string;
  onChange: (v: string) => void;
}

export default function AssessmentQuestionField({ question, value, onChange }: Props) {
  switch (question.questionType) {
    case "open_text":
      return (
        <textarea
          className="pw-textarea"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "yes_no":
      return (
        <div className="pw-radio-group">
          {["Yes", "No"].map((opt) => (
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
    case "multiple_choice":
      return (
        <div className="pw-radio-group">
          {question.options.map((opt) => (
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
    case "scale":
      return (
        <AssessmentScaleButtons
          value={value ? Number(value) : undefined}
          onChange={(n) => onChange(String(n))}
          scaleMin={question.scaleMin}
          scaleMax={question.scaleMax}
        />
      );
    default:
      return null;
  }
}
