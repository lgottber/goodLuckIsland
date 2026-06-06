"use client";

import NavBar from "../../components/NavBarDynamic";
import BackpackPhotoTrio from "./BackpackPhotoTrio";
import SevenShieldPillars from "./SevenShieldPillars";
import "./backpack.css";

export default function BackpackPage() {
  return (
    <>
      <NavBar activePage="backpack" largeAvatar />

      <div className="backpack-page">
        {/* ── HEADER ── */}
        <div className="backpack-header">
          <p className="backpack-eyebrow">Good Luck Island Collective</p>
          <h1>My Backpack</h1>
          <p>
            Your personal retirement toolkit. Work through each section at your
            own pace — every step brings your next chapter into clearer focus.
          </p>
        </div>

        {/* ── PROGRESS STRIP ── */}
        <div className="backpack-progress-strip">
          <span className="backpack-progress-label">Your Progress</span>
          <div className="backpack-progress-bar-wrap">
            <div className="backpack-progress-bar" />
          </div>
          <span className="backpack-progress-pct">1 of 7 started</span>
        </div>

        <div className="backpack-content">
          <BackpackPhotoTrio />
          <SevenShieldPillars />
        </div>
      </div>
    </>
  );
}
