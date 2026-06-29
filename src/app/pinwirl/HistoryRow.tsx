interface Props {
  takenAt: string;
  overall: number;
}

export default function HistoryRow({ takenAt, overall }: Props) {
  const date = new Date(takenAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="pw-history-row">
      <span className="pw-history-date">{date}</span>
      <span className="pw-history-overall">Overall: {overall}</span>
    </div>
  );
}
