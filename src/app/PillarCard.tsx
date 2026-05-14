import { ReactNode } from "react";

export default function PillarCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="pillar-card">
      <span className="pillar-icon">{icon}</span>
      <span className="pillar-label">{label}</span>
    </div>
  );
}
