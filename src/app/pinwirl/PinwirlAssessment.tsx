"use client";

import { useEffect, useRef, useState } from "react";
import QuestionBlock from "./QuestionBlock";
import { fetchPinwirlQuestions, submitPinwirlAnswers, toSurveyQuestion } from "../../lib/pinwirlApi";
import type { PinwirlQuestionRow } from "../../lib/pinwirlApi";
import PinwirlResults from "./PinwirlResults";
import type { DimensionScores } from "../../lib/pinwirlScoring";

const PAGE_SIZE = 4;

type Answers = Record<string, string | number>;

interface Props {
  userId: string;
}

export default function PinwirlAssessment({ userId }: Props) {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [questions, setQuestions] = useState<PinwirlQuestionRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState<DimensionScores | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPinwirlQuestions().then(setQuestions).catch(console.error);
  }, []);

  const totalPages = Math.ceil(questions.length / PAGE_SIZE);
  const pageQuestions = questions
    .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    .map(toSurveyQuestion);
  const isLastPage = page === totalPages - 1;

  const isPageComplete = pageQuestions
    .filter((q) => q.required)
    .every((q) => {
      const answer = answers[q.id];
      if (answer === undefined || answer === null) return false;
      if (typeof answer === "number") return true;
      return String(answer).trim() !== "";
    });

  useEffect(() => {
    if (progressRef.current && totalPages > 0) {
      progressRef.current.style.width = `${((page + 1) / totalPages) * 100}%`;
    }
  }, [page, totalPages]);

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

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitPinwirlAnswers(userId, answers, questions);
      setScores(result);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted && scores) {
    return (
      <PinwirlResults
        scores={scores}
        userId={userId}
        onRetake={() => {
          setSubmitted(false);
          setScores(null);
          setAnswers({});
          setPage(0);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  if (questions.length === 0) {
    return <div className="pw-assessment pw-assessment--loading" />;
  }

  return (
    <div className="pw-assessment">
      <div className="pw-assessment-header">
        <p className="pw-eyebrow">Pinwirl Tool — Step II</p>
        <h1>The Pinwirl Assessment</h1>
        <span className="pw-page-counter">{page + 1} of {totalPages}</span>
      </div>

      <div className="pw-progress-bar-wrap">
        <div className="pw-progress-bar-fill" ref={progressRef} />
      </div>

      <div className="pw-questions-list">
        {pageQuestions.map((q, idx) => {
          const globalIdx = page * PAGE_SIZE + idx;
          const prevQ = globalIdx > 0 ? questions[globalIdx - 1] : null;
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

      {submitError && (
        <p className="pw-error">{submitError}</p>
      )}

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
            onClick={handleSubmit}
            disabled={!isPageComplete || submitting}
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
