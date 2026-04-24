import BackpackComingSoonBadge from "./BackpackComingSoonBadge";
import BackpackCardCta from "./BackpackCardCta";

export default function BackpackSectionCard({ section, index, onSelect }) {
  return (
    <button
      type="button"
      className={`backpack-section-card ${
        section.type === "coming-soon" ? "coming-soon" : ""
      }`}
      onClick={() => section.type !== "coming-soon" && onSelect(section.id)}
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
        {section.type === "coming-soon"
          ? <BackpackComingSoonBadge />
          : <BackpackCardCta />}
      </div>
    </button>
  );
}
