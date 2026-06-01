import { QuizAnswer, QuizQuestion as TQuizQuestion } from "./quizData";
import QuizAnswerItem from "./QuizAnswerItem";

export default function QuizQuestion({
  question,
  selected,
  onSelect,
  questionIndex,
  total,
}: {
  question: TQuizQuestion;
  selected: QuizAnswer | undefined;
  onSelect: (answer: QuizAnswer) => void;
  questionIndex: number;
  total: number;
}) {
  const progress = ((questionIndex + 1) / total) * 100;
  const setProgressWidth = (el: HTMLDivElement | null) => {
    if (el) el.style.setProperty("width", `${progress}%`);
  };

  return (
    <div className="quiz-question">
      <div
        className="quiz-progress-bar"
        role="progressbar"
        aria-valuenow={questionIndex + 1}
        aria-valuemax={total}
      >
        <div className="quiz-progress-fill" ref={setProgressWidth} />
      </div>
      <p className="quiz-counter">
        Question {questionIndex + 1} of {total}
      </p>
      <p className="quiz-scene">{question.scene}</p>
      <h2 className="quiz-question-text">{question.question}</h2>
      <ul className="quiz-answers" role="list">
        {question.answers.map((answer, i) => (
          <QuizAnswerItem
            key={i}
            answer={answer}
            selected={selected === answer}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
