export default function ValueCard({ icon, title, desc }) {
  return (
    <div className="value-card">
      <span className="value-icon">{icon}</span>
      <span className="value-title">{title}</span>
      <span className="value-desc">{desc}</span>
    </div>
  );
}
