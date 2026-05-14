import Icon, { IconName } from "./Icon";

export default function ProfileMetaItem({ className, iconName, value }: { className: string; iconName: IconName; value: string }) {
  return (
    <span className={className}>
      <Icon name={iconName} size={13} />
      {value}
    </span>
  );
}
