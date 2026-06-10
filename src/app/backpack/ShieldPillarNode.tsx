import Icon from "../../components/Icon";
import type { IconName } from "../../components/Icon";

type ShieldPillar = {
  id: string;
  num: number;
  color: string;
  iconName: IconName;
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
        <span className="shield-pillar-num">{pillar.num}</span>
        <span className="shield-pillar-icon">
          <Icon name={pillar.iconName} size={11} />
        </span>
      </div>
      {!isLast && <div className="shield-pillar-connector" />}
    </div>
  );
}
