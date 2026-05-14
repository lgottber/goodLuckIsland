import Icon from "./Icon";

export default function BioEmpty({ onEditClick }: { onEditClick: () => void }) {
  return (
    <p className="bio-text empty">
      No bio yet.{" "}
      <button type="button" className="inline-link" onClick={onEditClick}>
        Add a bio <Icon name="arrow-right" size={12} />
      </button>
    </p>
  );
}
