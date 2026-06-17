"use client";

type Question = { label: string; placeholder: string };

export default function OqrcQuestionSlide({
  idx,
  question,
  answer,
  incompleteError,
  onUpdate,
}: {
  idx: number;
  question: Question;
  answer: string;
  incompleteError: boolean;
  onUpdate: (value: string) => void;
}) {
  return (
    <div className="oqrc-question-slide">
      <div className="oqrc-question-item">
        <label className="oqrc-question-label" htmlFor={`oqrc-q-${idx}`}>
          <span className="oqrc-question-num">Q{idx + 1}</span>
          {question.label}
        </label>
        <textarea
          id={`oqrc-q-${idx}`}
          className="oqrc-textarea"
          value={answer}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={question.placeholder}
          rows={idx === 0 ? 6 : 4}
        />
      </div>
      {incompleteError && (
        <p className="oqrc-error">Please answer this question to continue.</p>
      )}
    </div>
  );
}
