export default function RadioListOption({
  option,
  checked,
  onSelect,
}: {
  option: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="radio-list-option">
      <input type="radio" name="retirement-identity" checked={checked} onChange={onSelect} />
      {option}
    </label>
  );
}
