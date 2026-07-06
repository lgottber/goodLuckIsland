import AssessmentQuestionField from "./AssessmentQuestionField";
import type { AssessmentQuestion } from "../../../lib/assessmentsApi";

interface Props {
  question: AssessmentQuestion;
  showSection: boolean;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
}

export default function AssessmentQuestionBlock({ question, showSection, value, onChange }: Props) {
  return (
    <div className="pw-question-block">
      {showSection && question.dimension && (
        <h2 className="pw-section-subtitle">{question.dimension}</h2>
      )}
      <div className="pw-question">
        <p className="pw-question-text">
          {question.question_text}
          {!question.required && <span className="pw-optional"> (Optional)</span>}
        </p>
        <AssessmentQuestionField question={question} value={value} onChange={onChange} />
      </div>
    </div>
  );
}
