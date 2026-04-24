export default function AvatarEraTab({ era, active, onSelect }) {
  return (
    <button
      type="button"
      className={`avatar-era-tab ${active ? "active" : ""}`}
      onClick={() => onSelect(era.era)}
    >
      <span className="era-decade">{era.era}</span>
      <span className="era-label">{era.label}</span>
    </button>
  );
}
