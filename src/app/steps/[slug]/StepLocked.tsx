import Link from "next/link";

export default function StepLocked() {
  return (
    <div className="step-body">
      <Link href="/backpack" className="step-back-link">
        ← Back to My Backpack
      </Link>

      <div className="step-card">
        <p className="step-card-title">Step Locked</p>
        <p className="step-card-body">
          Complete the previous step first to unlock this one.
        </p>
      </div>
    </div>
  );
}
