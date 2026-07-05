"use client";

import { useState } from "react";
import NavBarDynamic from "../../components/NavBarDynamic";
import QuizIntro from "./QuizIntro";
import QuizCardSection from "./QuizCardSection";
import QuizResultComponent from "./QuizResult";
import {
  QUIZ_QUESTIONS,
  ARCHETYPES,
  calculateArchetype,
  QuizAnswer,
  ArchetypeId,
} from "./quizData";
import "./quiz.css";

type Phase = "intro" | "quiz" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({});
  const [resultId, setResultId] = useState<ArchetypeId | null>(null);

  function handleSelect(answer: QuizAnswer) {
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  }

  function handleNext() {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    const archetypeId = calculateArchetype(Object.values(answers));
    setResultId(archetypeId);
    setPhase("result");
    localStorage.setItem("quiz_archetype", archetypeId);
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  function handleRetake() {
    setAnswers({});
    setCurrentIndex(0);
    setResultId(null);
    setPhase("intro");
  }

  return (
    <>
      <NavBarDynamic largeAvatar />
      <div className="quiz-page">
        {phase === "intro" && <QuizIntro onStart={() => setPhase("quiz")} />}

        {phase === "quiz" && (
          <QuizCardSection
            question={QUIZ_QUESTIONS[currentIndex]}
            selected={answers[currentIndex]}
            onSelect={handleSelect}
            questionIndex={currentIndex}
            total={QUIZ_QUESTIONS.length}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {phase === "result" && resultId && (
          <QuizResultComponent
            archetype={ARCHETYPES[resultId]}
            onRetake={handleRetake}
          />
        )}
      </div>
    </>
  );
}
