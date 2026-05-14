import { ReactNode } from "react";

export default function ValueCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="value-card">
      <span className="value-icon">{icon}</span>
      <span className="value-title">{title}</span>
      <span className="value-desc">{desc}</span>
    </div>
  );
}
