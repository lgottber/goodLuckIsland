import AssessmentQuestionField from "./AssessmentQuestionField";
import type { AssessmentQuestionRow } from "../../../lib/assessmentApi";

interface Props {
  question: AssessmentQuestionRow;
  value: string;
  onChange: (v: string) => void;
}

export default function AssessmentQuestionBlock({ question, value, onChange }: Props) {
  return (
    <div className="pw-question-block">
      <div className="pw-question">
        <p className="pw-question-text">
          {question.questionText}
          {!question.required && <span className="pw-optional"> (Optional)</span>}
        </p>
        {question.hint && <p className="pw-hint">{question.hint}</p>}
        <AssessmentQuestionField question={question} value={value} onChange={onChange} />
      </div>
    </div>
  );
}
