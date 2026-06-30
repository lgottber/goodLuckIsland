"use client";

import { useEffect, useState } from "react";
import "./step-celebration.css";

interface Props {
  show: boolean;
}

const PARTICLE_COUNT = 12;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => i);

export default function StepCelebration({ show }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(id);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="step-celebration" aria-live="polite">
      <div className="step-celebration-burst">
        {PARTICLES.map((i) => (
          <span key={i} className={`step-celebration-particle step-celebration-particle--${i}`} />
        ))}
      </div>
      <p className="step-celebration-message">Step complete!</p>
    </div>
  );
}
