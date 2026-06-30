"use client";

import { useRouter } from "next/navigation";
import BackpackComingSoonBadge from "./BackpackComingSoonBadge";
import BackpackCardCta from "./BackpackCardCta";
import BackpackCardLocked from "./BackpackCardLocked";
import type { BackpackSection } from "../../lib/backpackApi";

interface Props {
  section: BackpackSection;
  index: number;
  locked?: boolean;
}

export default function BackpackSectionCard({ section, index, locked = false }: Props) {
  const router = useRouter();
  const isComingSoon = section.type === "coming-soon";
  const isDisabled = isComingSoon || locked;

  function handleClick() {
    if (!isDisabled) router.push(`/steps/${section.id}`);
  }

  return (
    <button
      type="button"
      className={`backpack-section-card${isComingSoon ? " coming-soon" : ""}${locked ? " backpack-section-card--locked" : ""}`}
      onClick={handleClick}
      disabled={isDisabled}
      ref={(el) => {
        if (el) el.style.setProperty("--section-color", section.color);
      }}
    >
      <div className="backpack-card-accent" />
      <div className="backpack-card-body">
        <div className="backpack-section-num">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="backpack-section-emoji">{section.emoji}</div>
        <div className="backpack-section-info">
          <h4 className="backpack-section-title">{section.label}</h4>
          <p className="backpack-section-tagline">{section.tagline}</p>
        </div>
      </div>
      <div className="backpack-card-footer">
        {isComingSoon ? (
          <BackpackComingSoonBadge />
        ) : locked ? (
          <BackpackCardLocked />
        ) : (
          <BackpackCardCta />
        )}
      </div>
    </button>
  );
}
