import Link from "next/link";

export default function PinwirlLocked() {
  return (
    <div className="pinwirl-intro">
      <h1>Step Locked</h1>
      <p>
        Complete the &ldquo;One Question Challenge&rdquo; first to unlock the
        Pinwirl Tool.
      </p>
      <div className="pinwirl-start-wrap">
        <Link href="/one-question-retirement-challenge" className="pinwirl-start-btn">
          Go to One Question Challenge
        </Link>
      </div>
    </div>
  );
}
