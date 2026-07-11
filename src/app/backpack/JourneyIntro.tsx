import type { Tables } from "../../types/supabase";
import { isProfileComplete } from "../../lib/profileCompleteness";
import JourneyIntroGate from "./JourneyIntroGate";

export default function JourneyIntro({ profile }: { profile: Tables<"users"> | null }) {
  const complete = isProfileComplete(profile);
  const firstName = profile?.first_name;

  return (
    <div className="journey-intro">
      <p className="journey-intro-welcome">
        Welcome to the island{firstName ? `, ${firstName}` : ""}
      </p>
      <p className="journey-intro-p">
        This is the reason you are here, your next adventure in self-discovery
        that we call the 7SHieLD Process. A journey designed to awaken and
        inspire you to think deeply about what retirement life can be. What it
        looks like to live, be happy, and continue to grow. This process is
        essential to formulating more specific goals and action steps
        you&apos;ll need to know for yourself — and later share with your
        advisor and planners.
      </p>
      <p className="journey-intro-p">
        Like all of us, I will one day be a retirement rookie. Together, by
        being proactive and open to future realities, we can learn how to
        grow, deal with, and meet life&apos;s challenges — and hopefully
        attain what we all seek in life: fulfillment. Click the first icon on
        the map below to begin your journey.
      </p>

      {!complete && <JourneyIntroGate />}
    </div>
  );
}
