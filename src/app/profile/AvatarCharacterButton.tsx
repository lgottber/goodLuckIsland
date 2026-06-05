type AvatarCharacter = {
  id: string;
  name: string;
  image: string;
  bg: string;
  fg: string;
  desc: string;
};

export default function AvatarCharacterButton({
  char,
  isSelected,
  onSelect,
}: {
  char: AvatarCharacter;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
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
        <img src={char.image} alt={char.name} className="avatar-char-img" />
        {isSelected && <div className="avatar-selected-check">✓</div>}
      </div>
    </button>
  );
}
