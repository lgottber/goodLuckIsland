import TopThreeOption from "./TopThreeOption";

const MAX_SELECTIONS = 3;

export default function TopThreeChecklist({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
      return;
    }
    if (value.length >= MAX_SELECTIONS) return;
    onChange([...value, opt]);
  }

  return (
    <div className="top-three-checklist">
      {options.map((opt) => (
        <TopThreeOption
          key={opt}
          option={opt}
          checked={value.includes(opt)}
          disabled={!value.includes(opt) && value.length >= MAX_SELECTIONS}
          onToggle={() => toggle(opt)}
        />
      ))}
    </div>
  );
}
