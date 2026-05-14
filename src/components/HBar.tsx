import { useEffect, useRef } from "react";
import "./HBar.css";

export default function HBar({ label, pct, color = "#2e8b7a", total }: { label: string; pct: number; color?: string; total?: number }) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    fillRef.current.style.setProperty("--hbar-width", `${pct}%`);
    fillRef.current.style.setProperty("--hbar-color", color);
  }, [pct, color]);

  return (
    <div className="hbar">
      <span className="hbar-label">{label}</span>
      <div className="hbar-track">
        <div className="hbar-fill" ref={fillRef} />
      </div>
      <span className="hbar-pct">{pct}%</span>
      {total && (
        <span className="hbar-total">{Math.round((total * pct) / 100)}</span>
      )}
    </div>
  );
}
