export default function ModalNextButton({ onNext }: { onNext: () => void }) {
  return (
    <button type="button" className="btn-save" onClick={onNext}>
      Next →
    </button>
  );
}
