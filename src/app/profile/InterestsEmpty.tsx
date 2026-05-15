import Icon from "./Icon";

export default function InterestsEmpty({ onEditClick }: { onEditClick: () => void }) {
  return (
    <p className="info-row-value empty">
      No interests added.{" "}
      <button type="button" className="inline-link" onClick={onEditClick}>
        Add some <Icon name="arrow-right" size={12} />
      </button>
    </p>
  );
}
