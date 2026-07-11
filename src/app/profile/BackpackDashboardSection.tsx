import type { UserProgress } from "../../lib/sevenStepApi";
import AssessmentRow from "./AssessmentRow";

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
              <AssessmentRow key={a.key} title={a.title} href={a.href} step={a.step} completed={false} />
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
              <AssessmentRow key={a.key} title={a.title} href={a.href} step={a.step} completed={true} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
