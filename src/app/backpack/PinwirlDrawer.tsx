"use client";

import Link from "next/link";

export default function PinwirlDrawer() {
  return (
    <div className="pillar-custom-drawer">
      <p className="oqc-summary">
        A guided self-assessment that helps you map where you stand across
        life&apos;s key dimensions — financial, social, physical, and purposeful
        — giving you a clear picture of today and a compass for tomorrow.
      </p>
      <Link href="/pinwirl" className="btn-pillar-start">
        Start Assignment
      </Link>
    </div>
  );
}
