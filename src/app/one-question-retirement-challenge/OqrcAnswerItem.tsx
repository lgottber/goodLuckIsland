export default function OqrcAnswerItem({
  num,
  label,
  answer,
}: {
  num: number;
  label: string;
  answer: string;
}) {
  return (
    <div className="oqrc-answer-item">
      <p className="oqrc-answer-num">Q{num}</p>
      <p className="oqrc-answer-q">{label}</p>
      <p className="oqrc-answer-text">
        {answer || <em className="oqrc-answer-empty">No answer recorded.</em>}
      </p>
    </div>
  );
}
