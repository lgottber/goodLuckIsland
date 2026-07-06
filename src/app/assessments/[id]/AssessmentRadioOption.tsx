export default function AssessmentRadioOption({
  questionId,
  option,
  checked,
  onChange,
}: {
  questionId: string;
  option: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="pw-radio-label">
      <input type="radio" name={questionId} checked={checked} onChange={onChange} />
      {option}
    </label>
  );
}
