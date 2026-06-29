"use client";

import type { OneQuestion } from "../../lib/oneQuestionApi";
import OqrcScaleInput from "./OqrcScaleInput";
import OqrcRadioOption from "./OqrcRadioOption";
import OqrcSelectInput from "./OqrcSelectInput";

export default function OqrcQuestionSlide({
  idx,
  question,
  answer,
  incompleteError,
  onUpdate,
}: {
  idx: number;
  question: OneQuestion;
  answer: string;
  incompleteError: boolean;
  onUpdate: (value: string) => void;
}) {
  const inputId = `oqrc-q-${idx}`;
  const labelId = `${inputId}-label`;
  const { question_type: questionType, hint, options } = question;
  const scaleMin = question.scale_min || "1";
  const scaleMax = question.scale_max || "10";

  return (
    <div className="oqrc-question-slide">
      <div className="oqrc-question-item">
        <label id={labelId} className="oqrc-question-label" htmlFor={inputId}>
          <span className="oqrc-question-num">Q{idx + 1}</span>
          {question.content}
        </label>

        {hint && <p className="oqrc-hint">{hint}</p>}

        {questionType === "text" && (
          <textarea
            id={inputId}
            className="oqrc-textarea"
            value={answer}
            onChange={(e) => onUpdate(e.target.value)}
            rows={idx === 0 ? 6 : 4}
          />
        )}

        {questionType === "number" && (
          <input
            id={inputId}
            type="number"
            className="oqrc-number-input"
            value={answer}
            onChange={(e) => onUpdate(e.target.value)}
          />
        )}

        {questionType === "scale" && (
          <OqrcScaleInput
            id={inputId}
            value={answer}
            scaleMin={scaleMin}
            scaleMax={scaleMax}
            onChange={onUpdate}
          />
        )}

        {questionType === "radio" && options.length > 0 && (
          <div className="oqrc-radio-group" role="radiogroup" aria-labelledby={labelId}>
            {options.map((opt, i) => (
              <OqrcRadioOption
                key={i}
                name={inputId}
                value={opt}
                checked={answer === opt}
                onChange={() => onUpdate(opt)}
              />
            ))}
          </div>
        )}

        {questionType === "select" && options.length > 0 && (
          <OqrcSelectInput
            id={inputId}
            options={options}
            value={answer}
            onChange={onUpdate}
          />
        )}
      </div>

      {incompleteError && (
        <p className="oqrc-error">Please answer this question to continue.</p>
      )}
    </div>
  );
}
