import "./StatCard.css";

export default function StatCard({ label, value, sub, accent }) {
  return (
    <div
      className="stat-card"
      ref={(el) => {
        if (el && accent) {
          el.style.setProperty("--stat-accent", accent);
        }
      }}
    >
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-value">{value}</span>
      {sub && <span className="stat-card-sub">{sub}</span>}
    </div>
  );
}
