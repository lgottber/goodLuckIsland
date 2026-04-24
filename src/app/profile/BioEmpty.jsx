export default function BioEmpty({ onEditClick }) {
  return (
    <p className="bio-text empty">
      No bio yet.{" "}
      <button type="button" className="inline-link" onClick={onEditClick}>
        Add a bio →
      </button>
    </p>
  );
}
