import { QuizAnswer, QuizQuestion } from "./quizData";
import QuizQuestionComponent from "./QuizQuestion";

export default function QuizCardSection({
  question,
  selected,
  onSelect,
  questionIndex,
  total,
  onBack,
  onNext,
}: {
  question: QuizQuestion;
  selected: QuizAnswer | undefined;
  onSelect: (answer: QuizAnswer) => void;
  questionIndex: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const isFirst = questionIndex === 0;
  const isLast = questionIndex === total - 1;
  const nextLabel = isLast ? "See My Result" : "Next";

  return (
    <div className="quiz-card">
      <QuizQuestionComponent
        question={question}
        selected={selected}
        onSelect={onSelect}
        questionIndex={questionIndex}
        total={total}
      />
      <div className="quiz-nav">
        {!isFirst && (
          <button type="button" className="quiz-btn-back" onClick={onBack}>
            Back
          </button>
        )}
        <button
          type="button"
          className="quiz-btn-next"
          onClick={onNext}
          disabled={!selected}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
