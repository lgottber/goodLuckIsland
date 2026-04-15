export interface ListItemButtonProps {
  eyebrow: string;
  name: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ListItemButton(
  { eyebrow, name, active, onClick }: ListItemButtonProps,
) {
  return (
    <button
      type="button"
      className={`admin-list-item${active ? " active" : ""}`}
      onClick={onClick}
    >
      <div className="admin-list-eyebrow">{eyebrow}</div>
      <div className="admin-list-name">{name}</div>
    </button>
  );
}
