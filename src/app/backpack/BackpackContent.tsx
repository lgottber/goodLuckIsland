"use client";

import { useState } from "react";
import FilterTabs from "../../components/FilterTabs";
import BackpackJourneyTab from "./BackpackJourneyTab";
import BackpackAssessmentsTab from "./BackpackAssessmentsTab";
import BackpackSavedTab from "./BackpackSavedTab";
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
  progress: UserProgress | null;
}

export default function BackpackContent({ progress }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("journey");

  return (
    <>
      <FilterTabs
        items={TABS}
        active={activeTab}
        onChange={(v) => { if (isTab(v)) setActiveTab(v); }}
        containerClass="backpack-tabs"
        buttonClass="backpack-tab"
      />

      <div className="backpack-content">
        {activeTab === "journey" && (
          <BackpackJourneyTab progress={progress} />
        )}
        {activeTab === "assessments" && <BackpackAssessmentsTab progress={progress} />}
        {activeTab === "saved" && <BackpackSavedTab />}
      </div>
    </>
  );
}
