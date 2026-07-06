"use client";

import { useEffect, useRef, useState } from "react";
import AssessmentQuestionBlock from "./AssessmentQuestionBlock";
import { fetchAssessmentQuestions, submitAssessment } from "../../../lib/assessmentsApi";
import type { AssessmentDetail, AssessmentQuestion } from "../../../lib/assessmentsApi";

const PAGE_SIZE = 4;

type Answers = Record<string, string | number>;

interface Props {
  assessment: AssessmentDetail;
  onSubmitted: (scores: Record<string, number>) => void;
}

export default function AssessmentTaker({ assessment, onSubmitted }: Props) {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAssessmentQuestions(assessment.id).then(setQuestions).catch(() => {});
  }, [assessment.id]);

  const totalPages = Math.ceil(questions.length / PAGE_SIZE);
  const pageQuestions = questions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
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
      const scores = await submitAssessment(assessment.id, answers, questions, assessment.dimensions);
      onSubmitted(scores);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (questions.length === 0) {
    return <div className="pw-assessment pw-assessment--loading" />;
  }

  return (
    <div className="pw-assessment">
      <div className="pw-assessment-header">
        <p className="pw-eyebrow">{assessment.title}</p>
        <h1>{assessment.title}</h1>
        <span className="pw-page-counter">
          {page + 1} of {totalPages}
        </span>
      </div>

      <div className="pw-progress-bar-wrap">
        <div className="pw-progress-bar-fill" ref={progressRef} />
      </div>

      <div className="pw-questions-list">
        {pageQuestions.map((q, idx) => {
          const globalIdx = page * PAGE_SIZE + idx;
          const prevQ = globalIdx > 0 ? questions[globalIdx - 1] : null;
          const showSection = !prevQ || prevQ.dimension !== q.dimension;

          return (
            <AssessmentQuestionBlock
              key={q.id}
              question={q}
              showSection={showSection}
              value={answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          );
        })}
      </div>

      {submitError && <p className="pw-error">{submitError}</p>}

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
