import BackpackPhotoTrio from "./BackpackPhotoTrio";
import SevenShieldPillars from "./SevenShieldPillars";
import JourneyIntro from "./JourneyIntro";
import type { UserProgress } from "../../lib/sevenStepApi";
import type { Tables } from "../../types/supabase";

interface Props {
  progress: UserProgress | null;
  profile: Tables<"users"> | null;
}

export default function BackpackJourneyTab({ progress, profile }: Props) {
  return (
    <>
      <JourneyIntro profile={profile} />
      <BackpackPhotoTrio />
      <SevenShieldPillars progress={progress} />
    </>
  );
}
