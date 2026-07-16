"use client";

import { useState } from "react";
import FilterTabs from "../../components/FilterTabs";
import BackpackJourneyTab from "./BackpackJourneyTab";
import BackpackAssessmentsTab from "./BackpackAssessmentsTab";
import BackpackSavedTab from "./BackpackSavedTab";
import BackpackBadgesTab from "./BackpackBadgesTab";
import BackpackWatchHistoryTab from "./BackpackWatchHistoryTab";
import type { UserProgress } from "../../lib/sevenStepApi";
import type { EarnedBadge } from "../../lib/badgesApi";
import type { Tables } from "../../types/supabase";

export type Tab = "journey" | "assessments" | "saved" | "badges" | "watch-history";

const TABS: { label: string; value: Tab }[] = [
  { label: "My Journey", value: "journey" },
  { label: "Assessments", value: "assessments" },
  { label: "Saved", value: "saved" },
  { label: "My Badges", value: "badges" },
  { label: "Watch History", value: "watch-history" },
];

export function isTab(v: string): v is Tab {
  return (
    v === "journey" ||
    v === "assessments" ||
    v === "saved" ||
    v === "badges" ||
    v === "watch-history"
  );
}

interface Props {
  progress: UserProgress | null;
  badges: EarnedBadge[];
  profile: Tables<"users"> | null;
  initialTab?: Tab;
}

export default function BackpackContent({ progress, badges, profile, initialTab }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab ?? "journey");

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
          <BackpackJourneyTab progress={progress} profile={profile} />
        )}
        {activeTab === "assessments" && <BackpackAssessmentsTab progress={progress} />}
        {activeTab === "saved" && <BackpackSavedTab />}
        {activeTab === "badges" && <BackpackBadgesTab badges={badges} />}
        {activeTab === "watch-history" && <BackpackWatchHistoryTab />}
      </div>
    </>
  );
}
