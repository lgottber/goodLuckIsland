interface NewItemButtonProps {
  onClick: () => void;
}

export default function NewItemButton({ onClick }: NewItemButtonProps) {
  return (
    <button type="button" className="admin-new-btn" onClick={onClick}>
      + New
    </button>
  );
}
