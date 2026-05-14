type AvatarEra = { era: string; label: string; characters: unknown[] };

export default function AvatarEraTab({ era, active, onSelect }: { era: AvatarEra; active: boolean; onSelect: (era: string) => void }) {
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
