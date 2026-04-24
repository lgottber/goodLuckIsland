export default function InterestTagItem({ tag, onRemove }) {
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
