export default function ModalSaveButton({ onSave }: { onSave: () => void }) {
  return (
    <button type="button" className="btn-save" onClick={onSave}>
      Save
    </button>
  );
}
