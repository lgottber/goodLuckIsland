import Icon from "./Icon";

export default function InfoRow({ iconName, label, value }) {
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
