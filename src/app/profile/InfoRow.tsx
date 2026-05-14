import Icon, { IconName } from "./Icon";

export default function InfoRow({ iconName, label, value }: { iconName: IconName; label: string; value: string }) {
  return (
    <div className="info-row">
      <Icon name={iconName} size={16} />
      <div className="info-row-text">
        <div className="info-row-label">{label}</div>
        <div className="info-row-value">{value}</div>
      </div>
    </div>
  );
}
