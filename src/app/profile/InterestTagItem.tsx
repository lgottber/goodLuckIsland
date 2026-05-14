import Icon from "./Icon";

export default function InterestTagItem({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) {
  return (
    <span className="tag tag--removable">
      {tag}
      <button
        type="button"
        className="tag-remove-btn"
        onClick={() => onRemove(tag)}
      >
        <Icon name="x" size={10} />
      </button>
    </span>
  );
}
