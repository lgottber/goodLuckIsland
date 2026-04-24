import "./SectionCard.css";

const SPAN_CLASS = {
  2: "section-card--span-2",
  3: "section-card--span-3",
  4: "section-card--span-4",
};

export default function SectionCard({ title, children, span }) {
  const spanClass = span ? (SPAN_CLASS[span] ?? "") : "";
  return (
    <div className={`section-card${spanClass ? ` ${spanClass}` : ""}`}>
      <p className="section-card-label">{title}</p>
      {children}
    </div>
  );
}
