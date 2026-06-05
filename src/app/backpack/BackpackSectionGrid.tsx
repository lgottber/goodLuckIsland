import type { ReactNode } from "react";
import BackpackSectionCard from "./BackpackSectionCard";

type BackpackSection = {
  id: string;
  type: string;
  color: string;
  emoji: ReactNode;
  label: string;
  tagline: string;
};

export default function BackpackSectionGrid({
  sections,
  onSectionSelect,
}: {
  sections: BackpackSection[];
  onSectionSelect: (id: string) => void;
}) {
  return (
    <div className="backpack-section-grid">
      {sections.map((section, i) => (
        <BackpackSectionCard
          key={section.id}
          section={section}
          index={i}
          onSelect={onSectionSelect}
        />
      ))}
    </div>
  );
}
