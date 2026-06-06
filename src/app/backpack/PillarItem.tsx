import Icon from "../../components/Icon";
import type { IconName } from "../../components/Icon";

type Pillar = {
  id: string;
  num: number;
  title: string;
  color: string;
  iconName: IconName;
  definition: string;
  chapter: string;
};

export default function PillarItem({
  pillar,
  isOpen,
  onToggle,
}: {
  pillar: Pillar;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div
      className={`pillar-item${isOpen ? " pillar-item--open" : ""}`}
      role="listitem"
    >
      <button
        type="button"
        className="pillar-header"
        onClick={() => onToggle(pillar.id)}
        aria-expanded={isOpen}
      >
        <span
          className="pillar-num-badge"
          ref={(el) => {
            if (el) el.style.setProperty("background", pillar.color);
          }}
        >
          {pillar.num}
        </span>
        <span
          className="pillar-icon"
          ref={(el) => {
            if (el) el.style.setProperty("color", pillar.color);
          }}
        >
          <Icon name={pillar.iconName} size={15} />
        </span>
        <span className="pillar-title">{pillar.title}</span>
        <span className="pillar-header-right">
          <input
            type="checkbox"
            className="pillar-checkbox"
            disabled
            aria-label={`${pillar.title} completed`}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="pillar-chevron" aria-hidden="true" />
        </span>
      </button>
      <div
        className={`pillar-drawer${isOpen ? " pillar-drawer--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="pillar-drawer-inner">
          <p className="pillar-definition">{pillar.definition}</p>
          <p className="pillar-chapter">
            <Icon name="book" size={11} />
            {pillar.chapter}
          </p>
        </div>
      </div>
    </div>
  );
}
