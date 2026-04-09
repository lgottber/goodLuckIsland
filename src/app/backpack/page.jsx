"use client";

import { useState, useEffect } from "react";
import NavBar from "../../components/NavBarDynamic";
import BackpackPhotoTrio from "./BackpackPhotoTrio";
import BackpackSectionGrid from "./BackpackSectionGrid";
import { supabase } from "../../lib/supabase";
import "./backpack.css";

const BACKPACK_SECTIONS = [
  {
    id: "challenge",
    label: "The 1 Question Retirement Challenge",
    emoji: "❓",
    color: "#e8673a",
    tagline: "One question. One week. A lifetime of clarity.",
    description:
      "Each week a single powerful question helps you think more clearly about what retirement really means to you. No right answers — just honest reflection.",
    type: "coming-soon",
  },
  {
    id: "pinwhirl",
    label: "The Pinwhirl Tool",
    emoji: "🌀",
    color: "#2e8b7a",
    tagline: "Spin your priorities into focus.",
    description:
      "A guided self-assessment that helps you visualize the different dimensions of your retirement life — financial, social, physical, purposeful — and where you stand today.",
    type: "coming-soon",
  },
  {
    id: "values",
    label: "Values & Beliefs",
    emoji: "🧭",
    color: "#1e2d5a",
    tagline: "Know what you stand for before you stand down.",
    description:
      "Retirement is a chance to live more aligned with what you truly value. This section helps you identify, articulate, and commit to the values that will guide your next chapter.",
    type: "coming-soon",
  },
  {
    id: "purpose",
    label: "Finding Your Purpose",
    emoji: "🔦",
    color: "#7a5a9a",
    tagline: "What gets you out of bed when work doesn't?",
    description:
      "Purpose doesn't retire when you do. This section guides you through exercises to discover what gives your life meaning beyond your career identity.",
    type: "coming-soon",
  },
  {
    id: "skills",
    label: "New Skills",
    emoji: "🛠️",
    color: "#5a8a6a",
    tagline: "Life skills for the chapter ahead.",
    description:
      "From cooking to budgeting to technology to health management — retirement comes with a new set of everyday skills worth developing. Explore what's worth learning next.",
    type: "coming-soon",
  },
  {
    id: "refinement",
    label: "Refinement",
    emoji: "✨",
    color: "#c87840",
    tagline: "Bringing it all together.",
    description:
      "You've reflected, you've explored, you've grown. This section helps you synthesize everything into a clear, personal retirement vision you can actually live.",
    type: "coming-soon",
  },
  {
    id: "giveback",
    label: "Giveback & Share",
    emoji: "🤲",
    color: "#3a6a9a",
    tagline: "Share your story. Give back. Pay it forward.",
    description:
      "Your journey matters. This section invites you to share your experiences with the collective, mentor others just starting out, and find ways to contribute beyond yourself.",
    type: "coming-soon",
  },
];

export default function BackpackPage() {
  const [sections, setSections] = useState(BACKPACK_SECTIONS);

  useEffect(() => {
    supabase
      .from("backpack_sections")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data?.length) {
          setSections(
            data.map((s) => ({
              id: s.slug,
              label: s.label,
              emoji: s.emoji,
              color: s.color,
              tagline: s.tagline,
              description: s.description,
              type: s.type,
            })),
          );
        }
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
      </div>
    </>
  );
}
