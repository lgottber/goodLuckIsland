"use client";

import { useState } from "react";
import FilterTabs from "../../components/FilterTabs";
import BackpackJourneyTab from "./BackpackJourneyTab";
import BackpackAssessmentsTab from "./BackpackAssessmentsTab";
import BackpackSavedTab from "./BackpackSavedTab";
import BackpackWatchHistoryTab from "./BackpackWatchHistoryTab";
import BackpackBadgesTab from "./BackpackBadgesTab";
import type { UserProgress } from "../../lib/sevenStepApi";
import type { EarnedBadge } from "../../lib/badgesApi";

type Tab = "journey" | "assessments" | "saved" | "watch-history" | "badges";

const TABS: { label: string; value: Tab }[] = [
  { label: "My Journey", value: "journey" },
  { label: "Assessments", value: "assessments" },
  { label: "Saved", value: "saved" },
  { label: "Watch History", value: "watch-history" },
  { label: "My Badges", value: "badges" },
];

function isTab(v: string): v is Tab {
  return v === "journey" || v === "assessments" || v === "saved" || v === "watch-history" || v === "badges";
}

interface Props {
  progress: UserProgress | null;
  badges: EarnedBadge[];
}

export default function BackpackContent({ progress, badges }: Props) {
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
        {activeTab === "watch-history" && <BackpackWatchHistoryTab />}
        {activeTab === "badges" && <BackpackBadgesTab badges={badges} />}
      </div>
    </>
  );
}
