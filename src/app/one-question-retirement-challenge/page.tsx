"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import OqrcCompletedView from "./OqrcCompletedView";
import OqrcAssessmentView from "./OqrcAssessmentView";
import {
  fetchOneQuestionAnswers,
  fetchOneQuestionCompleted,
  saveOneQuestionAnswers,
  markOneQuestionComplete,
} from "../../lib/oneQuestionApi";
import "./one-question.css";

const TOTAL = 8;

const QUESTIONS: { label: string; placeholder: string }[] = [
  {
    label:
      "How would you describe your personal lifestyle goals and priorities in retirement? You know, the things which you saved and sacrificed for all these years to ensure. Take your time — there are no wrong answers.",
    placeholder:
      "Picture yourself in that moment. In your own words, write your answer as if you were saying it out loud...",
  },
  {
    label: "About how much time did you take to answer the challenge question?",
    placeholder: "e.g. A few seconds, a couple of minutes...",
  },
  {
    label:
      "Which of the following answers best describes your thoughts when attempting to answer this challenge question?",
    placeholder: "Describe your thoughts...",
  },
  {
    label:
      "When you think back to your answer, does this feel like you've explained your goals and priorities well enough for that advisor to create a customized, comprehensive, and holistic financial plan for the remainder of your life's success? Because in many cases that advisor is likely to move forward with what you just said.",
    placeholder: "Share your honest reflection...",
  },
  {
    label:
      "When you answered this challenge question, did you use any of the following commonly heard answers? (or similar) — be honest ;) Here was the question again: What will your personal lifestyle goals and priorities be in retirement? You know, what you saved and sacrificed all these years to ensure?",
    placeholder:
      "List any common answers you may have used, e.g. travel, never run out of money, spend time with family, security, comfort...",
  },
  {
    label: "Which industry do/did you work in?",
    placeholder: "e.g. Healthcare, Finance, Education, Manufacturing...",
  },
  {
    label: "What is your estimated net worth? Ballpark.",
    placeholder: "e.g. Under $500K, $500K–$1M, $1M–$2M, $2M+...",
  },
  {
    label:
      "After taking this simple assessment, do you feel that you may need to spend some more time thinking about the topic of retirement life? To improve your own clarity and articulate your goals with more intentionality and specificity?",
    placeholder: "Share your honest thoughts...",
  },
];

export default function OneQuestionRetirementChallengePage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth0();
  const router = useRouter();
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(TOTAL).fill(""));
  const [completed, setCompleted] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [incompleteError, setIncompleteError] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated || !user?.sub) return;
    const userId = user.sub;
    async function load() {
      try {
        const [saved, done] = await Promise.all([
          fetchOneQuestionAnswers(userId),
          fetchOneQuestionCompleted(userId),
        ]);
        setAnswers(saved);
        setCompleted(done);
      } finally {
        setDataLoading(false);
      }
    }
    load();
  }, [isAuthenticated, user]);

  const answeredCount = answers.filter((a) => a.trim() !== "").length;
  const progressPct = Math.round((answeredCount / TOTAL) * 100);

  useEffect(() => {
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${progressPct}%`;
    }
  }, [progressPct]);

  function updateAnswer(index: number, value: string) {
    setIncompleteError(false);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  async function handleContinue() {
    if (slide === 0) {
      setSlide(1);
      return;
    }

    if (answers[slide - 1].trim() === "") {
      setIncompleteError(true);
      return;
    }

    if (!user?.sub) return;

    setSaving(true);
    setSaveError(false);
    try {
      await saveOneQuestionAnswers(user.sub, answers);
      if (slide === TOTAL) {
        await markOneQuestionComplete(user.sub);
        setCompleted(true);
      } else {
        setSlide((s) => s + 1);
      }
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  function handleBack() {
    setIncompleteError(false);
    setSlide((s) => s - 1);
  }

  if (authLoading || (isAuthenticated && dataLoading)) {
    return (
      <>
        <NavBar activePage="backpack" largeAvatar />
        <div className="oqrc-loading">
          <div className="oqrc-loading-dot" />
          <div className="oqrc-loading-dot" />
          <div className="oqrc-loading-dot" />
        </div>
      </>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />
      <div className="oqrc-page">
        <div className="oqrc-inner">
          <div className="oqrc-header">
            <p className="oqrc-eyebrow">7Shield Pillars — Chapter 1</p>
            <h1 className="oqrc-title">
              The One Question Retirement Challenge
            </h1>
            <div className="oqrc-progress-wrap">
              <div className="oqrc-progress-track">
                <div className="oqrc-progress-fill" ref={progressFillRef} />
              </div>
              <span className="oqrc-progress-label">
                {answeredCount} of {TOTAL} answered
              </span>
            </div>
          </div>

          {completed ? (
            <OqrcCompletedView questions={QUESTIONS} answers={answers} />
          ) : (
            <OqrcAssessmentView
              slide={slide}
              answers={answers}
              questions={QUESTIONS}
              incompleteError={incompleteError}
              saveError={saveError}
              saving={saving}
              onContinue={handleContinue}
              onBack={handleBack}
              onUpdateAnswer={updateAnswer}
            />
          )}
        </div>
      </div>
    </>
  );
}
