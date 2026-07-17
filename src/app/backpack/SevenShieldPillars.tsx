"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import ShieldPillarNode from "./ShieldPillarNode";
import PillarSection from "./PillarSection";
import StepLinksDrawer from "./StepLinksDrawer";
import type { UserProgress } from "../../lib/sevenStepApi";
import { SLUG_TO_STEP } from "../../lib/sevenStepApi";
import type { PillarId } from "./PillarLogo";

type Pillar = {
  id: PillarId;
  num: number;
  title: string;
  color: string;
  definition: string;
  chapter: string;
};

const PILLARS: Pillar[] = [
  {
    id: "one-question",
    num: 1,
    title: 'The "One Question Challenge"',
    color: "#e8673a",
    definition:
      "Each week, one powerful question invites you to reflect more deeply on what retirement means to you personally. There are no right answers — only honest ones.",
    chapter: "Chapter 1 — Awakening the Question",
  },
  {
    id: "pinwirl",
    num: 2,
    title: "The Pinwirl Tool",
    color: "#2e8b7a",
    definition:
      "A guided self-assessment that helps you map where you stand across life's key dimensions — financial, social, physical, and purposeful — giving you a clear picture of today and a compass for tomorrow.",
    chapter: "Chapter 2 — Mapping Your Terrain",
  },
  {
    id: "values",
    num: 3,
    title: "Values and Beliefs",
    color: "#1e2d5a",
    definition:
      "Before you can build a fulfilling retirement, you need to know what you truly stand for. This pillar helps you surface, articulate, and commit to the values that will guide your next chapter.",
    chapter: "Chapter 3 — The Core of You",
  },
  {
    id: "purpose",
    num: 4,
    title: "Finding your Purpose",
    color: "#7a5a9a",
    definition:
      "Purpose doesn't retire when you do. This pillar walks you through exercises to discover what gives your life meaning beyond your career title — the 'why' that gets you out of bed.",
    chapter: "Chapter 4 — The Why Behind the What",
  },
  {
    id: "skills",
    num: 5,
    title: "New Skills for Retirement Life",
    color: "#5a8a6a",
    definition:
      "Retirement brings a whole new set of everyday challenges. From managing health and finances to embracing technology and new hobbies, this pillar helps you identify and develop the skills your next chapter requires.",
    chapter: "Chapter 5 — Learning Never Retires",
  },
  {
    id: "together",
    num: 6,
    title: "Retirement — Bringing it all together!",
    color: "#c87840",
    definition:
      "You've reflected, explored, and grown. Now it's time to synthesize everything you've uncovered into a cohesive, personal retirement vision — one you can live with intention and joy.",
    chapter: "Chapter 6 — Your Complete Picture",
  },
  {
    id: "giveback",
    num: 7,
    title: 'The "Give Back" Step',
    color: "#3a6a9a",
    definition:
      "Your journey and wisdom matter. This pillar invites you to share your story, mentor others just starting their path, and find ways to contribute beyond yourself — because a life well-lived is one worth passing on.",
    chapter: "Chapter 7 — The Legacy You Leave",
  },
];

// All 7 pillars are DB-driven now (#103) -- an empty link list renders
// StepLinksDrawer's own "no links yet" state rather than a hardcoded
// "Coming Soon" badge, so every pillar is active.
const ACTIVE_PILLAR_IDS = new Set(PILLARS.map((p) => p.id));

function pillarIsComplete(pillarId: string, progress: UserProgress | null): boolean {
  const stepKey = SLUG_TO_STEP[pillarId];
  return stepKey !== undefined && progress !== null ? progress[stepKey] : false;
}

export default function SevenShieldPillars({ progress }: { progress: UserProgress | null }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const scrollTargetRef = useRef<string | null>(null);

  useEffect(() => {
    function handleHash() {
      const match = window.location.hash.match(/^#step-(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        const pillar = PILLARS.find((p) => p.num === num);
        if (pillar) {
          scrollTargetRef.current = `step-${num}`;
          setOpenId(pillar.id);
        }
      }
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    if (!scrollTargetRef.current) return;
    const id = scrollTargetRef.current;
    scrollTargetRef.current = null;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [openId]);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const customDrawers: Record<string, ReactNode> = Object.fromEntries(
    PILLARS.map((pillar) => [
      pillar.id,
      <StepLinksDrawer
        key={pillar.id}
        stepKey={SLUG_TO_STEP[pillar.id]}
        definition={pillar.definition}
        chapter={pillar.chapter}
        isComplete={pillarIsComplete(pillar.id, progress)}
      />,
    ]),
  );

  const completedPillars = PILLARS.filter((p) => pillarIsComplete(p.id, progress));
  const todoPillars = PILLARS.filter((p) => !pillarIsComplete(p.id, progress));

  const sectionProps = { openId, onToggle: toggle, customDrawers, activePillarIds: ACTIVE_PILLAR_IDS };

  return (
    <section className="seven-shield-section">
      <div className="seven-shield-header">
        <p className="seven-shield-eyebrow">Personal Discovery</p>
        <h2>The 7Shield Pillars</h2>
        <p className="seven-shield-subtext">
          Seven reflective steps toward a life of clarity, purpose, and meaning
          in retirement. Work through each pillar at your own pace.
        </p>
      </div>

      <div className="shield-pillars-visual" aria-hidden="true">
        {PILLARS.map((pillar, i) => (
          <ShieldPillarNode
            key={pillar.id}
            pillar={pillar}
            isLast={i === PILLARS.length - 1}
          />
        ))}
      </div>

      {completedPillars.length > 0 && (
        <PillarSection {...sectionProps} label="Backpack" variant="backpack" pillars={completedPillars} sectionIsComplete={true} />
      )}

      {todoPillars.length > 0 && (
        <PillarSection {...sectionProps} label="To Do" variant="todo" pillars={todoPillars} sectionIsComplete={false} />
      )}
    </section>
  );
}
