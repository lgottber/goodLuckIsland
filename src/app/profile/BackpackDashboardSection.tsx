import Link from "next/link";
import type { UserProgress } from "../../lib/sevenStepApi";

interface Props {
  progress: UserProgress | null;
}

type AssessmentEntry = {
  step: string;
  title: string;
  href: string;
  key: keyof UserProgress;
};

const ASSESSMENTS: AssessmentEntry[] = [
  {
    step: "Step 1",
    title: "One Question Challenge",
    href: "/one-question-retirement-challenge",
    key: "one_question_challenge",
  },
  {
    step: "Step 2",
    title: "Wayfinder (PinWIRL)",
    href: "/pinwirl",
    key: "wayfair_tool",
  },
];

export default function BackpackDashboardSection({ progress }: Props) {
  const todo = ASSESSMENTS.filter((a) => !progress?.[a.key]);
  const done = ASSESSMENTS.filter((a) => !!progress?.[a.key]);

  return (
    <>
      <div className="profile-card profile-card--assess-table">
        <h3>To Do</h3>
        {todo.length === 0 ? (
          <p className="assess-empty">All assessments complete!</p>
        ) : (
          <ul className="assess-list">
            {todo.map((a) => (
              <li key={a.key} className="assess-row">
                <span className="assess-step">{a.step}</span>
                <span className="assess-title">{a.title}</span>
                <Link href={a.href} className="assess-action">
                  Start Now →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="profile-card profile-card--assess-table">
        <h3>Backpack</h3>
        {done.length === 0 ? (
          <p className="assess-empty">No completed assessments yet.</p>
        ) : (
          <ul className="assess-list">
            {done.map((a) => (
              <li key={a.key} className="assess-row">
                <span className="assess-check">✓</span>
                <span className="assess-title">{a.title}</span>
                <Link href={a.href} className="assess-action assess-action--review">
                  Review
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
