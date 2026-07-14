import SearchSection from "./SearchSection";
import StepResultItem from "./StepResultItem";
import type { BackpackSection } from "../../lib/backpackApi";

export default function StepResults({ steps }: { steps: BackpackSection[] }) {
  return (
    <SearchSection title="7SHieLD Steps">
      <div className="search-step-list">
        {steps.map((step) => (
          <StepResultItem key={step.id} step={step} />
        ))}
      </div>
    </SearchSection>
  );
}
