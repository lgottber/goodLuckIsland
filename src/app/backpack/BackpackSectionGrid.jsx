import BackpackSectionCard from "./BackpackSectionCard";

export default function BackpackSectionGrid({ sections, onSectionSelect }) {
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
