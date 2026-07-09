import { type ReactNode } from "react";
import Icon from "../../components/Icon";
import PillarLogo from "./PillarLogo";
import type { PillarId } from "./PillarLogo";

export type Pillar = {
  id: PillarId;
  num: number;
  title: string;
  color: string;
  definition: string;
  chapter: string;
};

export default function PillarItem({
  pillar,
  isOpen,
  isComplete,
  onToggle,
  customDrawer,
  comingSoon,
}: {
  pillar: Pillar;
  isOpen: boolean;
  isComplete?: boolean;
  onToggle: (id: string) => void;
  customDrawer?: ReactNode;
  comingSoon?: boolean;
}) {
  const drawerId = `pillar-drawer-${pillar.id}`;
  const drawerContent: ReactNode = customDrawer ?? (
    <>
      <p className="pillar-definition">{pillar.definition}</p>
      <p className="pillar-chapter">
        <Icon name="book" size={11} />
        {pillar.chapter}
      </p>
    </>
  );

  return (
    <div
      className={`pillar-item${isOpen ? " pillar-item--open" : ""}${comingSoon ? " pillar-item--coming-soon" : ""}`}
      role="listitem"
      ref={(el) => {
        if (el) el.style.setProperty("--pillar-color", pillar.color);
      }}
    >
      <div className="pillar-row">
        <button
          type="button"
          className="pillar-header"
          onClick={() => onToggle(pillar.id)}
          aria-expanded={isOpen}
          aria-controls={drawerId}
        >
          <span className="pillar-num-badge">{pillar.num}</span>
          <span className="pillar-icon">
            <PillarLogo id={pillar.id} size={26} />
          </span>
          <span className={`pillar-title${isComplete ? " pillar-title--complete" : ""}`}>
            {pillar.title}
          </span>
          {comingSoon && <span className="pillar-coming-soon-badge">Coming Soon</span>}
          <span className="pillar-chevron" aria-hidden="true" />
        </button>
      </div>
      <div
        id={drawerId}
        className={`pillar-drawer${isOpen ? " pillar-drawer--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="pillar-drawer-inner">
          {drawerContent}
        </div>
      </div>
    </div>
  );
}
