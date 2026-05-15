import Icon from "./Icon";

export default function ProfileInfoEmpty({ onEdit }: { onEdit: () => void }) {
  return (
    <p className="info-row-value empty">
      No details added yet.{" "}
      <button type="button" className="inline-link" onClick={onEdit}>
        Add info <Icon name="arrow-right" size={12} />
      </button>
    </p>
  );
}
