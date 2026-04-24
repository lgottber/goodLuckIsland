import Icon from "./Icon";

export default function ProfileMetaItem({ className, iconName, value }) {
  return (
    <span className={className}>
      <Icon name={iconName} size={13} />
      {value}
    </span>
  );
}
