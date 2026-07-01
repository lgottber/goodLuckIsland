import BackpackPhotoTrio from "./BackpackPhotoTrio";
import SevenShieldPillars from "./SevenShieldPillars";
import type { UserProgress } from "../../lib/sevenStepApi";

interface Props {
  progress: UserProgress | null;
}

export default function BackpackJourneyTab({ progress }: Props) {
  return (
    <>
      <BackpackPhotoTrio />
      <SevenShieldPillars progress={progress} />
    </>
  );
}
