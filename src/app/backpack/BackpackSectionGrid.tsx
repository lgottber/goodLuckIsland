import BackpackSectionCard from "./BackpackSectionCard";
import type { BackpackSection } from "../../lib/backpackApi";

interface Props {
  sections: BackpackSection[];
  lockedIndices: Set<number>;
}

export default function BackpackSectionGrid({ sections, lockedIndices }: Props) {
  return (
    <div className="backpack-section-grid">
      {sections.map((section, i) => (
        <BackpackSectionCard
          key={section.id}
          section={section}
          index={i}
          locked={lockedIndices.has(i)}
        />
      ))}
    </div>
  );
}
