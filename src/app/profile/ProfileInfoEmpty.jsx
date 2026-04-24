export default function ProfileInfoEmpty({ onEdit }) {
  return (
    <p className="info-row-value empty">
      No details added yet.{" "}
      <button
        type="button"
        className="inline-link"
        onClick={onEdit}
      >
        Add info →
      </button>
    </p>
  );
}
