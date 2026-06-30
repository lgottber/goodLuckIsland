import BackpackPhotoTrio from "./BackpackPhotoTrio";
import BackpackSectionGrid from "./BackpackSectionGrid";
import SevenShieldPillars from "./SevenShieldPillars";
import type { BackpackSection } from "../../lib/backpackApi";
import type { UserProgress } from "../../lib/sevenStepApi";

interface Props {
  sections: BackpackSection[];
  progress: UserProgress | null;
  lockedIndices: Set<number>;
}

export default function BackpackJourneyTab({ sections, progress, lockedIndices }: Props) {
  return (
    <>
      <BackpackPhotoTrio />
      <BackpackSectionGrid sections={sections} lockedIndices={lockedIndices} />
      <SevenShieldPillars progress={progress} />
    </>
  );
}
