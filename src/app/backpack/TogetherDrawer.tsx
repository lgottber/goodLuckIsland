"use client";

import Link from "next/link";

export default function TogetherDrawer() {
  return (
    <div className="pillar-custom-drawer">
      <p className="oqc-summary">
        You&apos;ve reflected, explored, and grown. Now it&apos;s time to
        synthesize everything you&apos;ve uncovered into a cohesive, personal
        retirement vision — one you can live with intention and joy.
      </p>
      <Link href="/refining-your-retirement" className="btn-pillar-start">
        Refine Your Vision
      </Link>
    </div>
  );
}
