"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ARCHETYPES, isArchetypeId } from "./quizData";
import "./quiz.css";

export default function QuizNudgeCard() {
  const [archetypeId, setArchetypeId] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setArchetypeId(localStorage.getItem("quiz_archetype") ?? "");
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    }
    setReady(true);
  }, []);

  if (!ready) return null;
  if (error) return null;

  if (archetypeId && isArchetypeId(archetypeId)) {
    const archetype = ARCHETYPES[archetypeId];
    return (
      <div className="quiz-profile-result">
        <div className="quiz-profile-result-info">
          <p className="quiz-profile-result-label">Your Islander Type</p>
          <p className="quiz-profile-result-name">{archetype.name}</p>
        </div>
        <Link href="/quiz" className="quiz-retake-link">
          Retake &rarr;
        </Link>
      </div>
    );
  }

  return (
    <Link href="/quiz" className="quiz-nudge-card">
      <div className="quiz-nudge-emoji">🏝️</div>
      <div className="quiz-nudge-body">
        <p className="quiz-nudge-title">What Type of Islander Are You?</p>
        <p className="quiz-nudge-desc">
          15 questions &middot; 6 archetypes &middot; Discover your island style
        </p>
      </div>
      <span className="quiz-nudge-arrow">&rarr;</span>
    </Link>
  );
}
