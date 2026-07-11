import Link from "next/link";

export default function JourneyIntroGate() {
  return (
    <div className="journey-intro-gate">
      <p className="journey-intro-disclaimer">
        Note: if you have not completed your profile, this will not allow you
        to start. Completing your profile is essential to our research on Gen
        X retirement — none of your personal info is being used, only
        high-level age and demographic data for research purposes only. Any
        confidential personal info is protected by our user information
        policy and our do-not-share-or-solicit promise.
      </p>
      <Link href="/profile" className="journey-intro-cta">
        Complete Your Profile
      </Link>
    </div>
  );
}
