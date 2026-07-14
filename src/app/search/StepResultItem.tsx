import Link from "next/link";
import type { BackpackSection } from "../../lib/backpackApi";

// one-question and pinwirl have their own dedicated interactive flows
// (survey / assessment) rather than the generic /steps/[slug] reflection
// page -- link to those directly instead of the generic route.
const STEP_HREF_OVERRIDES: Record<string, string> = {
  "one-question": "/one-question-retirement-challenge",
  pinwirl: "/pinwirl",
};

function stepHref(step: BackpackSection): string {
  return STEP_HREF_OVERRIDES[step.id] ?? `/steps/${step.id}`;
}

export default function StepResultItem({ step }: { step: BackpackSection }) {
  return (
    <Link href={stepHref(step)} className="search-step-item">
      <span className="search-step-emoji">{step.emoji}</span>
      <span className="search-step-body">
        <span className="search-step-label">{step.label}</span>
        <span className="search-step-tagline">{step.tagline}</span>
      </span>
    </Link>
  );
}
