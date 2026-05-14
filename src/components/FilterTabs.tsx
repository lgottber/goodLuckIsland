type FilterTabItem = { label: string; value: string };

export default function FilterTabs({
  items,
  active,
  onChange,
  containerClass,
  buttonClass,
}: {
  items: string[] | FilterTabItem[];
  active: string;
  onChange: (v: string) => void;
  containerClass: string;
  buttonClass: string;
}) {
  return (
    <div className={containerClass}>
      {items.map((item) => {
        const value = typeof item === "string" ? item : item.value;
        const label = typeof item === "string" ? item : item.label;
        return (
          <button
            key={value}
            type="button"
            className={`${buttonClass}${active === value ? " active" : ""}`}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
