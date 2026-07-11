"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import OqrcCompletedView from "./OqrcCompletedView";
import OqrcAssessmentView from "./OqrcAssessmentView";
import type { OneQuestion } from "../../lib/oneQuestionApi";
import {
  fetchOneQuestions,
  fetchOneQuestionAnswers,
  fetchOneQuestionCompleted,
  saveOneQuestionAnswers,
  markOneQuestionComplete,
} from "../../lib/oneQuestionApi";
import { isProfileComplete } from "../../lib/profileCompleteness";
import { trackEvent } from "../../lib/analyticsApi";
import { useUserDataStore } from "../../lib/stores/userDataStore";
import "./one-question.css";

export default function OneQuestionRetirementChallengePage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth0();
  const router = useRouter();
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [slide, setSlide] = useState(0);
  const [questions, setQuestions] = useState<OneQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [incompleteError, setIncompleteError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  // Blocks starting the challenge until the profile has the fields the
  // Gen X research design needs (#66) -- optimistic `true` default avoids
  // flashing the gate before the profile fetch resolves.
  const [profileComplete, setProfileComplete] = useState(true);
  const ensureProfile = useUserDataStore((state) => state.ensureProfile);

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
        const [qs] = await Promise.all([
          fetchOneQuestions(),
          ensureProfile(userId),
        ]);
        setProfileComplete(isProfileComplete(useUserDataStore.getState().profile));
        const [saved, done] = await Promise.all([
          fetchOneQuestionAnswers(userId, qs.length),
          fetchOneQuestionCompleted(userId),
        ]);
        setQuestions(qs);
        setAnswers(
          saved.map((answer, i) => {
            if (!answer && qs[i].question_type === "scale") {
              return qs[i].scale_min || "1";
            }
            return answer;
          }),
        );
        setCompleted(done);
      } catch {
        setLoadError(true);
      } finally {
        setDataLoading(false);
      }
    }
    load();
  }, [isAuthenticated, user, ensureProfile]);

  const total = questions.length;
  const answeredCount = answers.filter((a) => a.trim() !== "").length;
  const progressPct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

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
      trackEvent("oqrc_started");
      setSlide(1);
      return;
    }

    if (questions[slide - 1].required && answers[slide - 1].trim() === "") {
      setIncompleteError(true);
      return;
    }

    if (!user?.sub) return;

    setSaving(true);
    setSaveError(false);
    try {
      await saveOneQuestionAnswers(user.sub, answers);
      if (slide === total) {
        await markOneQuestionComplete(user.sub);
        setCompleted(true);
        trackEvent("oqrc_completed");
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

  if (!profileComplete) {
    return (
      <>
        <NavBar activePage="backpack" largeAvatar />
        <div className="oqrc-page">
          <div className="oqrc-inner">
            <div className="oqrc-gate">
              <p className="oqrc-eyebrow">7Shield Pillars — Chapter 1</p>
              <h1 className="oqrc-title">Complete your profile to begin</h1>
              <p className="oqrc-gate-copy">
                Completing your profile is essential to our research on Gen X
                retirement — none of your personal info is shared, only
                high-level age and demographic data used for research
                purposes only. Any confidential info you share is protected
                by our user information policy and our do-not-share-or-solicit
                promise.
              </p>
              <Link href="/profile" className="oqrc-btn-continue">
                Complete Your Profile
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <NavBar activePage="backpack" largeAvatar />
        <div className="oqrc-page">
          <div className="oqrc-inner">
            <p className="oqrc-error">Failed to load questions. Please refresh and try again.</p>
          </div>
        </div>
      </>
    );
  }

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
                {answeredCount} of {total} answered
              </span>
            </div>
          </div>

          {completed ? (
            <OqrcCompletedView questions={questions} answers={answers} />
          ) : (
            <OqrcAssessmentView
              slide={slide}
              answers={answers}
              questions={questions}
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
