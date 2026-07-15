export default function TopThreeOption({
  option,
  checked,
  disabled,
  onToggle,
}: {
  option: string;
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <label className={`top-three-option${disabled ? " top-three-option--disabled" : ""}`}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onToggle} />
      {option}
    </label>
  );
}
