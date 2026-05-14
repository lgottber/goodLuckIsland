export default function InterestTagItem({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) {
  return (
    <span className="tag tag--removable">
      {tag}
      <button
        type="button"
        className="tag-remove-btn"
        onClick={() => onRemove(tag)}
      >
        ✕
      </button>
    </span>
  );
}
