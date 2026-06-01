import { QuizAnswer } from "./quizData";

export default function QuizAnswerItem({
  answer,
  selected,
  onSelect,
}: {
  answer: QuizAnswer;
  selected: boolean;
  onSelect: (answer: QuizAnswer) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className={`quiz-answer-btn ${selected ? "quiz-answer-btn--selected" : ""}`}
        onClick={() => onSelect(answer)}
      >
        {answer.text}
      </button>
    </li>
  );
}
