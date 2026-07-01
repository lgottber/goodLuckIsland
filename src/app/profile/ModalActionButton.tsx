export default function ModalActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="btn-save" onClick={onClick}>
      {label}
    </button>
  );
}
