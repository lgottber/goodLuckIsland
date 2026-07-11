export default function ModalActionButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" className="btn-save" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
