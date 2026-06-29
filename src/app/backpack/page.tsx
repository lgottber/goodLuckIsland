"use client";

import { useEffect, useState } from "react";
import NavBar from "../../components/NavBarDynamic";
import BackpackContent from "./BackpackContent";
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

        {!loading && !loadError && <BackpackContent sections={sections} />}
      </div>
    </>
  );
}
