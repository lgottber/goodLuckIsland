interface Props {
  questionKey: string;
  text: string;
  placeholder: string;
  index: number;
  value: string;
  onChange: (key: string, value: string) => void;
}

export default function PastPersonQuestion({
  questionKey,
  text,
  placeholder,
  index,
  value,
  onChange,
}: Props) {
  return (
    <div className="past-person-question">
      <label className="past-person-question-label" htmlFor={`q-${questionKey}`}>
        <span className="past-person-question-num">{index + 1}</span>
        {text}
      </label>
      <textarea
        id={`q-${questionKey}`}
        className="past-person-textarea"
        value={value}
        onChange={(e) => onChange(questionKey, e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  );
}
