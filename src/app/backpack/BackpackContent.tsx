"use client";

import { useState } from "react";
import FilterTabs from "../../components/FilterTabs";
import BackpackJourneyTab from "./BackpackJourneyTab";
import BackpackAssessmentsTab from "./BackpackAssessmentsTab";
import BackpackSavedTab from "./BackpackSavedTab";
import type { BackpackSection } from "../../lib/backpackApi";
import { countCompleted, isStepLocked } from "../../lib/sevenStepApi";
import type { UserProgress } from "../../lib/sevenStepApi";

type Tab = "journey" | "assessments" | "saved";

const TABS: { label: string; value: Tab }[] = [
  { label: "My Journey", value: "journey" },
  { label: "Assessments", value: "assessments" },
  { label: "Saved", value: "saved" },
];

function isTab(v: string): v is Tab {
  return v === "journey" || v === "assessments" || v === "saved";
}

interface Props {
  sections: BackpackSection[];
  progress: UserProgress | null;
}

export default function BackpackContent({ sections, progress }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("journey");

  const completed = countCompleted(progress);
  const total = sections.filter((s) => s.type !== "coming-soon").length;

  const lockedIndices = new Set(
    sections
      .map((s, i) => (s.type !== "coming-soon" && isStepLocked(i, progress) ? i : -1))
      .filter((i) => i !== -1),
  );

  return (
    <>
      <div className="backpack-progress-strip">
        <span className="backpack-progress-label">Your Progress</span>
        <div className="backpack-progress-bar-wrap">
          <div
            className="backpack-progress-bar"
            ref={(el) => {
              if (el) el.style.width = total > 0 ? `${(completed / total) * 100}%` : "0%";
            }}
          />
        </div>
        <span className="backpack-progress-pct">
          {completed} of {total} complete
        </span>
      </div>

      <FilterTabs
        items={TABS}
        active={activeTab}
        onChange={(v) => { if (isTab(v)) setActiveTab(v); }}
        containerClass="backpack-tabs"
        buttonClass="backpack-tab"
      />

      <div className="backpack-content">
        {activeTab === "journey" && (
          <BackpackJourneyTab
            sections={sections}
            progress={progress}
            lockedIndices={lockedIndices}
          />
        )}
        {activeTab === "assessments" && <BackpackAssessmentsTab progress={progress} />}
        {activeTab === "saved" && <BackpackSavedTab />}
      </div>
    </>
  );
}
