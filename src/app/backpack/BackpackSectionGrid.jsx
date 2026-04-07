import BackpackComingSoonBadge from "./BackpackComingSoonBadge";
import BackpackCardCta from "./BackpackCardCta";

export default function BackpackSectionGrid({ sections, onSectionSelect }) {
  return (
    <div className="backpack-section-grid">
      {sections.map((section, i) => (
        <button
          type="button"
          key={section.id}
          className={`backpack-section-card ${
            section.type === "coming-soon" ? "coming-soon" : ""
          }`}
          onClick={() =>
            section.type !== "coming-soon" && onSectionSelect(section.id)}
          style={{ "--section-color": section.color }}
        >
          <div className="backpack-card-accent" />
          <div className="backpack-card-body">
            <div className="backpack-section-num">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="backpack-section-emoji">{section.emoji}</div>
            <div className="backpack-section-info">
              <h4 className="backpack-section-title">{section.label}</h4>
              <p className="backpack-section-tagline">{section.tagline}</p>
            </div>
          </div>
          <div className="backpack-card-footer">
            {section.type === "coming-soon"
              ? <BackpackComingSoonBadge />
              : <BackpackCardCta />}
          </div>
        </button>
      ))}
    </div>
  );
}
