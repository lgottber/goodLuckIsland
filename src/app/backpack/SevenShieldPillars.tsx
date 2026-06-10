"use client";

import { useState, type ReactNode } from "react";
import ShieldPillarNode from "./ShieldPillarNode";
import PillarItem from "./PillarItem";
import OneQuestionDrawer from "./OneQuestionDrawer";

const PILLARS = [
  {
    id: "one-question",
    num: 1,
    title: 'The "One Question Challenge"',
    color: "#e8673a",
    iconName: "help" as const,
    definition:
      "Each week, one powerful question invites you to reflect more deeply on what retirement means to you personally. There are no right answers — only honest ones.",
    chapter: "Chapter 1 — Awakening the Question",
  },
  {
    id: "wayfair",
    num: 2,
    title: "The Wayfair Tool",
    color: "#2e8b7a",
    iconName: "rotate" as const,
    definition:
      "A guided self-assessment that helps you map where you stand across life's key dimensions — financial, social, physical, and purposeful — giving you a clear picture of today and a compass for tomorrow.",
    chapter: "Chapter 2 — Mapping Your Terrain",
  },
  {
    id: "values",
    num: 3,
    title: "Values and Beliefs",
    color: "#1e2d5a",
    iconName: "compass" as const,
    definition:
      "Before you can build a fulfilling retirement, you need to know what you truly stand for. This pillar helps you surface, articulate, and commit to the values that will guide your next chapter.",
    chapter: "Chapter 3 — The Core of You",
  },
  {
    id: "purpose",
    num: 4,
    title: "Finding your Purpose",
    color: "#7a5a9a",
    iconName: "lightbulb" as const,
    definition:
      "Purpose doesn't retire when you do. This pillar walks you through exercises to discover what gives your life meaning beyond your career title — the 'why' that gets you out of bed.",
    chapter: "Chapter 4 — The Why Behind the What",
  },
  {
    id: "skills",
    num: 5,
    title: "New Skills for Retirement Life",
    color: "#5a8a6a",
    iconName: "wrench" as const,
    definition:
      "Retirement brings a whole new set of everyday challenges. From managing health and finances to embracing technology and new hobbies, this pillar helps you identify and develop the skills your next chapter requires.",
    chapter: "Chapter 5 — Learning Never Retires",
  },
  {
    id: "together",
    num: 6,
    title: "Retirement — Bringing it all together!",
    color: "#c87840",
    iconName: "sparkle" as const,
    definition:
      "You've reflected, explored, and grown. Now it's time to synthesize everything you've uncovered into a cohesive, personal retirement vision — one you can live with intention and joy.",
    chapter: "Chapter 6 — Your Complete Picture",
  },
  {
    id: "giveback",
    num: 7,
    title: 'The "Give Back" Step',
    color: "#3a6a9a",
    iconName: "hands" as const,
    definition:
      "Your journey and wisdom matter. This pillar invites you to share your story, mentor others just starting their path, and find ways to contribute beyond yourself — because a life well-lived is one worth passing on.",
    chapter: "Chapter 7 — The Legacy You Leave",
  },
];

const ACTIVE_PILLAR_IDS = new Set(["one-question"]);

export default function SevenShieldPillars() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const customDrawers: Record<string, ReactNode> = {
    "one-question": <OneQuestionDrawer />,
  };

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

      <div className="pillar-accordion" role="list">
        {PILLARS.map((pillar) => (
          <PillarItem
            key={pillar.id}
            pillar={pillar}
            isOpen={openId === pillar.id}
            onToggle={toggle}
            customDrawer={customDrawers[pillar.id]}
            comingSoon={!ACTIVE_PILLAR_IDS.has(pillar.id)}
          />
        ))}
      </div>
    </section>
  );
}
