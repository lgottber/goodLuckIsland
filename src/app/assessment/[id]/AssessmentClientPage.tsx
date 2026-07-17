"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/NavBarDynamic";
import AssessmentQuestionBlock from "./AssessmentQuestionBlock";
import { fetchAssessmentQuestions, submitAssessmentAnswers } from "../../../lib/assessmentApi";
import type { AssessmentQuestionRow } from "../../../lib/assessmentApi";
import { trackEvent } from "../../../lib/analyticsApi";
import "../../pinwirl/pinwirl.css";

type Answers = Record<string, string>;

interface Props {
  assessmentId: string;
  title: string;
  introductionHtml: string;
  conclusionHtml: string;
  useScore: boolean;
}

// Generic take-the-assessment flow for source='generic' assessments (#103).
// Mirrors the pinwirl page's intro → questions → results state machine
// (src/app/pinwirl/page.tsx), but with no dimension scoring or pagination --
// this only needs to support the reflective, single-page, unscored shape
// that "Values and Beliefs" (and any future use_score=false assessment)
// needs. A scored report for use_score=true assessments is out of scope
// for this pass; that state is stubbed below.
export default function AssessmentClientPage({
  assessmentId,
  title,
  introductionHtml,
  conclusionHtml,
  useScore,
}: Props) {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();
  const [started, setStarted] = useState(introductionHtml.trim() === "");
  const [questions, setQuestions] = useState<AssessmentQuestionRow[] | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    if (!started) return;
    fetchAssessmentQuestions(assessmentId).then(setQuestions).catch(() => setQuestions([]));
  }, [started, assessmentId]);

  if (isLoading || !isAuthenticated || !user) return null;

  const isComplete =
    questions !== null &&
    questions.filter((q) => q.required).every((q) => (answers[q.id] ?? "").trim() !== "");

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitAssessmentAnswers(assessmentId, answers);
      setSubmitted(true);
      trackEvent("assessment_submitted");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <NavBar activePage="backpack" largeAvatar />
        <div className="pinwirl-page">
          <div className="pinwirl-intro">
            <h1>Thanks for completing {title}.</h1>
            <p>Your answers have been saved.</p>
            {!useScore && conclusionHtml.trim() !== "" && (
              <div dangerouslySetInnerHTML={{ __html: conclusionHtml }} />
            )}
          </div>
        </div>
      </>
    );
  }

  if (!started) {
    return (
      <>
        <NavBar activePage="backpack" largeAvatar />
        <div className="pinwirl-page">
          <div className="pinwirl-intro">
            <div dangerouslySetInnerHTML={{ __html: introductionHtml }} />
            <div className="pinwirl-start-wrap">
              <button
                type="button"
                className="pinwirl-start-btn"
                onClick={() => {
                  trackEvent("assessment_started");
                  setStarted(true);
                }}
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (questions === null || questions.length === 0) {
    return (
      <>
        <NavBar activePage="backpack" largeAvatar />
        <div className="pinwirl-page">
          <div className="pw-assessment pw-assessment--loading" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />
      <div className="pinwirl-page">
        <div className="pw-assessment">
          <div className="pw-assessment-header">
            <h1>{title}</h1>
          </div>
          <div className="pw-questions-list">
            {questions.map((q) => (
              <AssessmentQuestionBlock
                key={q.id}
                question={q}
                value={answers[q.id] ?? ""}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
              />
            ))}
          </div>
          {submitError && <p className="pw-error">{submitError}</p>}
          <div className="pw-nav">
            <button
              type="button"
              className="pw-btn pw-btn--submit"
              onClick={handleSubmit}
              disabled={!isComplete || submitting}
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
