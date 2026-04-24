export default function AvatarCharacterButton({ char, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`avatar-character-btn ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(char.id)}
    >
      <div
        className="avatar-character-face"
        ref={(el) => {
          if (el) el.style.setProperty("background", char.bg);
        }}
      >
        <span className="avatar-emoji">{char.emoji}</span>
        {isSelected && <div className="avatar-selected-check">✓</div>}
      </div>
      <span className="avatar-character-name">{char.name}</span>
      <span className="avatar-character-show">{char.desc}</span>
    </button>
  );
}
