"use client";

import OqrcIntroSlide from "./OqrcIntroSlide";
import OqrcQuestionSlide from "./OqrcQuestionSlide";

type Question = { label: string; placeholder: string };

export default function OqrcAssessmentView({
  slide,
  answers,
  questions,
  incompleteError,
  saveError,
  saving,
  onContinue,
  onBack,
  onUpdateAnswer,
}: {
  slide: number;
  answers: string[];
  questions: Question[];
  incompleteError: boolean;
  saveError: boolean;
  saving: boolean;
  onContinue: () => void;
  onBack: () => void;
  onUpdateAnswer: (index: number, value: string) => void;
}) {
  const idx = slide - 1;

  return (
    <>
      {slide === 0 && <OqrcIntroSlide />}

      {slide > 0 && (
        <OqrcQuestionSlide
          idx={idx}
          question={questions[idx]}
          answer={answers[idx]}
          incompleteError={incompleteError}
          onUpdate={(v) => onUpdateAnswer(idx, v)}
        />
      )}

      {saveError && (
        <p className="oqrc-error oqrc-error--save">
          Something went wrong saving your answer. Please try again.
        </p>
      )}

      <div className={`oqrc-nav${slide === 0 ? " oqrc-nav--solo" : ""}`}>
        {slide > 0 && (
          <button className="oqrc-btn-back" onClick={onBack}>
            Back
          </button>
        )}
        <button
          className="oqrc-btn-continue"
          onClick={onContinue}
          disabled={saving}
        >
          {saving ? "Saving…" : "Continue"}
        </button>
      </div>
    </>
  );
}
