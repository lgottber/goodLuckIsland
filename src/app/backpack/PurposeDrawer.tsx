"use client";

import Link from "next/link";

export default function PurposeDrawer() {
  return (
    <div className="pillar-custom-drawer">
      <p className="oqc-summary">
        Purpose doesn&apos;t retire when you do. This pillar walks you through
        the difference between big-P Purpose and small-p purpose, the research
        behind why it matters in retirement, and a practical framework — the
        3A Method — to help you discover the &ldquo;why&rdquo; that gets you
        out of bed.
      </p>
      <Link href="/purpose" className="btn-pillar-start">
        Explore Purpose
      </Link>
    </div>
  );
}
