import PillarLogo from "./PillarLogo";
import type { PillarId } from "./PillarLogo";

type ShieldPillar = {
  id: PillarId;
  color: string;
};

export default function ShieldPillarNode({
  pillar,
  isLast,
}: {
  pillar: ShieldPillar;
  isLast: boolean;
}) {
  return (
    <div className="shield-pillar-node-wrap">
      <div
        className="shield-pillar-node"
        ref={(el) => {
          if (el) el.style.setProperty("--pillar-color", pillar.color);
        }}
      >
        <span className="shield-pillar-icon">
          <PillarLogo id={pillar.id} size={22} />
        </span>
      </div>
      {!isLast && <div className="shield-pillar-connector" />}
    </div>
  );
}
