import BackpackSectionCard from "./BackpackSectionCard";
import type { BackpackSection } from "../../lib/backpackApi";

export default function BackpackSectionGrid({ sections, onSectionSelect }: { sections: BackpackSection[]; onSectionSelect: (id: string) => void }) {
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
