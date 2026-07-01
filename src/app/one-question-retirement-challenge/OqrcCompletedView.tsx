"use client";

import Link from "next/link";
import OqrcAnswerItem from "./OqrcAnswerItem";
import type { OneQuestion } from "../../lib/oneQuestionApi";

export default function OqrcCompletedView({
  questions,
  answers,
}: {
  questions: OneQuestion[];
  answers: string[];
}) {
  const answered = answers.filter((a) => a && a.trim() !== "").length;

  return (
    <div className="oqrc-completed">
      <div className="oqrc-completed-badge" aria-hidden="true">✓</div>
      <h2 className="oqrc-completed-heading">
        You answered {answered} of {questions.length} questions
      </h2>
      <p className="oqrc-completed-note">
        These reflections are saved to your backpack. Return to them anytime —
        honest answers today make for better decisions tomorrow.
      </p>
      <div className="oqrc-completed-actions">
        <Link href="/backpack" className="oqrc-completed-cta">
          Continue to My Backpack
        </Link>
        <a
          href={`mailto:hello@goodluckislandcollective.com?subject=My 1QRC Reflections&body=${encodeURIComponent(
            questions
              .map((q, i) => `Q${i + 1}: ${q.content}\nA: ${answers[i] ?? ""}`)
              .join("\n\n"),
          )}`}
          className="oqrc-completed-share"
        >
          Share with a Coach
        </a>
      </div>
      {questions.map((q, i) => (
        <OqrcAnswerItem
          key={q.id}
          num={i + 1}
          label={q.content}
          answer={answers[i]}
        />
      ))}
    </div>
  );
}
