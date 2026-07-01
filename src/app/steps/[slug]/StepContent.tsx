import Link from "next/link";
import type { BackpackSection } from "../../../lib/backpackApi";
import type { StepKey } from "../../../lib/sevenStepApi";
import ReflectionList from "./ReflectionList";
import GiveBackCard from "./GiveBackCard";
import StepJournalCard from "./StepJournalCard";
import StepCompleteSection from "./StepCompleteSection";

interface Props {
  section: BackpackSection;
  slug: string;
  userId: string;
  reflections: string[];
  giveBackMessage: string;
  onGiveBackChange: (v: string) => void;
  stepKey: StepKey | undefined;
  isComplete: boolean;
  completing: boolean;
  onMarkComplete: () => void;
}

export default function StepContent({
  section,
  slug,
  userId,
  reflections,
  giveBackMessage,
  onGiveBackChange,
  stepKey,
  isComplete,
  completing,
  onMarkComplete,
}: Props) {
  return (
    <>
      <div className="step-header">
        <span className="step-header-emoji">{section.emoji}</span>
        <p className="step-eyebrow">7SHieLD Process</p>
        <h1>{section.label}</h1>
        <p className="step-header-tagline">{section.tagline}</p>
      </div>

      <div className="step-body">
        <Link href="/backpack" className="step-back-link">
          ← Back to My Backpack
        </Link>

        <div className="step-card">
          <p className="step-card-title">Overview</p>
          <p className="step-card-body">{section.description}</p>
        </div>

        <div className="step-card">
          <p className="step-card-title">Reflection Prompts</p>
          <ReflectionList prompts={reflections} />
        </div>

        {slug === "giveback" && (
          <GiveBackCard value={giveBackMessage} onChange={onGiveBackChange} />
        )}

        {userId && <StepJournalCard userId={userId} stepSlug={slug} />}

        {stepKey && (
          <StepCompleteSection
            isComplete={isComplete}
            completing={completing}
            onComplete={onMarkComplete}
          />
        )}
      </div>
    </>
  );
}
