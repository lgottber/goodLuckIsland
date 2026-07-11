import { type ReactNode } from "react";
import PillarAccordion from "./PillarAccordion";
import type { Pillar } from "./PillarItem";

export default function PillarSection({
  label,
  variant,
  pillars,
  sectionIsComplete,
  openId,
  onToggle,
  customDrawers,
  activePillarIds,
}: {
  label: string;
  variant: "backpack" | "todo";
  pillars: Pillar[];
  sectionIsComplete: boolean;
  openId: string | null;
  onToggle: (id: string) => void;
  customDrawers: Record<string, ReactNode>;
  activePillarIds: Set<string>;
}) {
  return (
    <div className="pillar-section">
      <h3 className={`pillar-section-heading pillar-section-heading--${variant}`}>
        {label}
      </h3>
      <PillarAccordion
        pillars={pillars}
        sectionIsComplete={sectionIsComplete}
        openId={openId}
        onToggle={onToggle}
        customDrawers={customDrawers}
        activePillarIds={activePillarIds}
      />
    </div>
  );
}
