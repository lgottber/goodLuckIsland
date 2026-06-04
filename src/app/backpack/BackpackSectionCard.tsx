import { ReactNode } from "react";
import BackpackComingSoonBadge from "./BackpackComingSoonBadge";
import BackpackCardCta from "./BackpackCardCta";
import BackpackDrawer from "./BackpackDrawer";
import Icon from "../../components/Icon";

type BackpackSection = { id: string; type: string; color: string; emoji: ReactNode; label: string; tagline: string; description: string };

export default function BackpackSectionCard({ section, index, onSelect, isOpen }: { section: BackpackSection; index: number; onSelect: (id: string) => void; isOpen?: boolean }) {
  const num = String(index + 1).padStart(2, "0");
  const setColor = (el: HTMLElement | null) => {
    if (el) el.style.setProperty("--section-color", section.color);
  };

  if (section.type === "active") {
    return (
      <div
        className={`backpack-section-card${isOpen ? " is-open" : ""}`}
        ref={setColor}
      >
        <button
          type="button"
          className="backpack-section-card-trigger"
          onClick={() => onSelect(section.id)}
          aria-expanded={isOpen}
        >
          <div className="backpack-card-accent" />
          <div className="backpack-card-body">
            <div className="backpack-section-num">{num}</div>
            <div className="backpack-section-emoji">{section.emoji}</div>
            <div className="backpack-section-info">
              <h4 className="backpack-section-title">{section.label}</h4>
              {section.tagline && <p className="backpack-section-tagline">{section.tagline}</p>}
            </div>
          </div>
          <div className="backpack-card-footer">
            <span className="backpack-card-cta">Begin <Icon name="arrow-right" size={12} /></span>
          </div>
        </button>
        {isOpen && <BackpackDrawer description={section.description} />}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`backpack-section-card${section.type === "coming-soon" ? " coming-soon" : ""}`}
      onClick={() => section.type !== "coming-soon" && onSelect(section.id)}
      ref={setColor}
    >
      <div className="backpack-card-accent" />
      <div className="backpack-card-body">
        <div className="backpack-section-num">{num}</div>
        <div className="backpack-section-emoji">{section.emoji}</div>
        <div className="backpack-section-info">
          <h4 className="backpack-section-title">{section.label}</h4>
          <p className="backpack-section-tagline">{section.tagline}</p>
        </div>
      </div>
      <div className="backpack-card-footer">
        {section.type === "coming-soon" ? (
          <BackpackComingSoonBadge />
        ) : (
          <BackpackCardCta />
        )}
      </div>
    </button>
  );
}
