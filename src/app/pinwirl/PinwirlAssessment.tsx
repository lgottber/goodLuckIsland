"use client";

import { useEffect, useRef, useState } from "react";
import { SURVEY_QUESTIONS } from "./questions";
import QuestionBlock from "./QuestionBlock";

const PAGE_SIZE = 4;
const TOTAL_PAGES = Math.ceil(SURVEY_QUESTIONS.length / PAGE_SIZE);

type Answers = Record<string, string | number>;

export default function PinwirlAssessment() {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const progressRef = useRef<HTMLDivElement>(null);

  const pageQuestions = SURVEY_QUESTIONS.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );
  const isLastPage = page === TOTAL_PAGES - 1;

  const isPageComplete = pageQuestions
    .filter((q) => q.required)
    .every((q) => {
      const answer = answers[q.id];
      if (answer === undefined || answer === null) return false;
      if (typeof answer === "number") return true;
      return String(answer).trim() !== "";
    });

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${((page + 1) / TOTAL_PAGES) * 100}%`;
    }
  }, [page]);

  function setAnswer(id: string, value: string | number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function goNext() {
    setPage((p) => p + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setPage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="pw-assessment">
      <div className="pw-assessment-header">
        <p className="pw-eyebrow">Pinwirl Tool — Step II</p>
        <h1>The Pinwirl Assessment</h1>
        <span className="pw-page-counter">{page + 1} of {TOTAL_PAGES}</span>
      </div>

      <div className="pw-progress-bar-wrap">
        <div className="pw-progress-bar-fill" ref={progressRef} />
      </div>

      <div className="pw-questions-list">
        {pageQuestions.map((q, idx) => {
          const globalIdx = page * PAGE_SIZE + idx;
          const prevQ = globalIdx > 0 ? SURVEY_QUESTIONS[globalIdx - 1] : null;
          const showSection = !prevQ || prevQ.section !== q.section;

          return (
            <QuestionBlock
              key={q.id}
              question={q}
              showSection={showSection}
              value={answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          );
        })}
      </div>

      <div className="pw-nav">
        {page > 0 && (
          <button type="button" className="pw-btn pw-btn--back" onClick={goBack}>
            ← Back
          </button>
        )}
        {!isLastPage ? (
          <button
            type="button"
            className="pw-btn pw-btn--next"
            onClick={goNext}
            disabled={!isPageComplete}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            className="pw-btn pw-btn--submit"
            disabled={!isPageComplete}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
