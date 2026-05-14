import { useEffect, useRef } from "react";
import "./StatCard.css";

export default function StatCard({ label, value, sub, accent }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !accent) return;
    cardRef.current.style.setProperty("--stat-accent", accent);
  }, [accent]);

  return (
    <div className="stat-card" ref={cardRef}>
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-value">{value}</span>
      {sub && <span className="stat-card-sub">{sub}</span>}
    </div>
  );
}
