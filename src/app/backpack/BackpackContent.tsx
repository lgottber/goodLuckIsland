import BackpackPhotoTrio from "./BackpackPhotoTrio";
import BackpackSectionGrid from "./BackpackSectionGrid";
import type { BackpackSection } from "../../lib/backpackApi";

export default function BackpackContent({ sections }: { sections: BackpackSection[] }) {
  return (
    <>
      <div className="backpack-progress-strip">
        <span className="backpack-progress-label">Your Progress</span>
        <div className="backpack-progress-bar-wrap">
          <div className="backpack-progress-bar" />
        </div>
        <span className="backpack-progress-pct">1 of 7 started</span>
      </div>
      <div className="backpack-content">
        <BackpackPhotoTrio />
        <BackpackSectionGrid sections={sections} onSectionSelect={() => {}} />
      </div>
    </>
  );
}
