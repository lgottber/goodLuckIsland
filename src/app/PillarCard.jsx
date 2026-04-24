export default function PillarCard({ icon, label }) {
  return (
    <div className="pillar-card">
      <span className="pillar-icon">{icon}</span>
      <span className="pillar-label">{label}</span>
    </div>
  );
}
