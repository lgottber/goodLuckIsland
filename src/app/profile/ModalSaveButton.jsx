export default function ModalSaveButton({ onSave }) {
  return (
    <button type="button" className="btn-save" onClick={onSave}>
      Save Changes
    </button>
  );
}
