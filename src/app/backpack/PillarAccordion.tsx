import { type ReactNode } from "react";
import PillarItem from "./PillarItem";
import type { Pillar } from "./PillarItem";

export default function PillarAccordion({
  pillars,
  sectionIsComplete,
  openId,
  onToggle,
  customDrawers,
  activePillarIds,
}: {
  pillars: Pillar[];
  sectionIsComplete: boolean;
  openId: string | null;
  onToggle: (id: string) => void;
  customDrawers: Record<string, ReactNode>;
  activePillarIds: Set<string>;
}) {
  return (
    <div className="pillar-accordion" role="list">
      {pillars.map((pillar) => (
        <PillarItem
          key={pillar.id}
          pillar={pillar}
          isOpen={openId === pillar.id}
          isComplete={sectionIsComplete}
          onToggle={onToggle}
          customDrawer={customDrawers[pillar.id]}
          comingSoon={!activePillarIds.has(pillar.id)}
        />
      ))}
    </div>
  );
}
