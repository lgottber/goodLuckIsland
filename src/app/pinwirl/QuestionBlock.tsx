import QuestionField from "./QuestionField";
import type { SurveyQuestion } from "./questions";

export default function QuestionBlock({
  question,
  showSection,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  showSection: boolean;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
}) {
  return (
    <div className="pw-question-block">
      {showSection && (
        <h2 className="pw-section-subtitle">{question.section}</h2>
      )}
      <div className="pw-question">
        <p className="pw-question-text">
          {question.text}
          {!question.required && (
            <span className="pw-optional"> (Optional)</span>
          )}
        </p>
        <QuestionField question={question} value={value} onChange={onChange} />
      </div>
    </div>
  );
}
