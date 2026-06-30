import BackpackPhotoTrio from "./BackpackPhotoTrio";
import BackpackSectionGrid from "./BackpackSectionGrid";
import SevenShieldPillars from "./SevenShieldPillars";
import type { BackpackSection } from "../../lib/backpackApi";
import { countCompleted, isStepLocked } from "../../lib/sevenStepApi";
import type { UserProgress } from "../../lib/sevenStepApi";

interface Props {
  sections: BackpackSection[];
  progress: UserProgress | null;
}

export default function BackpackContent({ sections, progress }: Props) {
  const completed = countCompleted(progress);
  const total = sections.filter((s) => s.type !== "coming-soon").length;

  const lockedIndices = new Set(
    sections
      .map((s, i) => (s.type !== "coming-soon" && isStepLocked(i, progress) ? i : -1))
      .filter((i) => i !== -1),
  );

  return (
    <>
      <div className="backpack-progress-strip">
        <span className="backpack-progress-label">Your Progress</span>
        <div className="backpack-progress-bar-wrap">
          <div
            className="backpack-progress-bar"
            ref={(el) => {
              if (el) el.style.width = total > 0 ? `${(completed / total) * 100}%` : "0%";
            }}
          />
        </div>
        <span className="backpack-progress-pct">
          {completed} of {total} complete
        </span>
      </div>
      <div className="backpack-content">
        <BackpackPhotoTrio />
        <BackpackSectionGrid sections={sections} lockedIndices={lockedIndices} />
        <SevenShieldPillars progress={progress} />
      </div>
    </>
  );
}
