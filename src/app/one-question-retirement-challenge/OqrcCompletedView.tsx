"use client";

import Link from "next/link";
import OqrcAnswerItem from "./OqrcAnswerItem";

type Question = { label: string; placeholder: string };

export default function OqrcCompletedView({
  questions,
  answers,
}: {
  questions: Question[];
  answers: string[];
}) {
  return (
    <div className="oqrc-completed">
      <div className="oqrc-completed-badge" aria-hidden="true">
        ✓
      </div>
      <p className="oqrc-completed-note">
        Challenge complete. Your answers are saved below.
      </p>
      <Link href="/backpack" className="oqrc-back-link">
        ← Back to My Backpack
      </Link>
      {questions.map((q, i) => (
        <OqrcAnswerItem
          key={i}
          num={i + 1}
          label={q.label}
          answer={answers[i]}
        />
      ))}
    </div>
  );
}
