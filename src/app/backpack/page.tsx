"use client";

import { useEffect, useState } from "react";
import NavBar from "../../components/NavBarDynamic";
import BackpackPhotoTrio from "./BackpackPhotoTrio";
import BackpackSectionGrid from "./BackpackSectionGrid";
import { fetchBackpackSections } from "../../lib/backpackApi";
import type { BackpackSection } from "../../lib/backpackApi";
import "./backpack.css";

export default function BackpackPage() {
  const [sections, setSections] = useState<BackpackSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetchBackpackSections()
      .then((data) => {
        setSections(data);
        setLoading(false);
      })
      .catch(() => {
        setLoadError(true);
        setLoading(false);
      });
  }, []);


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

        {loading && <p className="backpack-loading">Loading your backpack…</p>}

        {loadError && (
          <p className="backpack-load-error">
            Could not load your backpack data. Please try again later.
          </p>
        )}

        {!loading && !loadError && (
          <>
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
              <BackpackSectionGrid sections={sections} onSectionSelect={() => {}} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
