import { ReactNode } from "react";
import BackpackSectionCard from "./BackpackSectionCard";

type BackpackSection = { id: string; type: string; color: string; emoji: ReactNode; label: string; tagline: string; description: string };

export default function BackpackSectionGrid({ sections, onSectionSelect, expandedId }: { sections: BackpackSection[]; onSectionSelect: (id: string) => void; expandedId: string | null }) {
  return (
    <div className="backpack-section-grid">
      {sections.map((section, i) => (
        <BackpackSectionCard
          key={section.id}
          section={section}
          index={i}
          onSelect={onSectionSelect}
          isOpen={expandedId === section.id}
        />
      ))}
    </div>
  );
}
