import type { ReactElement } from "react";

export type RefiningIllustrationId =
  | "one-question-worksheet"
  | "financial-priorities"
  | "wayfinder-report"
  | "affinity-aptitude-affirmation"
  | "rollercoaster"
  | "trophy"
  | "message-in-bottle";

const LABELS: Record<RefiningIllustrationId, string> = {
  "one-question-worksheet": "One Question Challenge worksheet",
  "financial-priorities": "Financial Priorities and Goals Sheet",
  "wayfinder-report": "Wayfinder report page",
  "affinity-aptitude-affirmation": "Affinity, aptitude, affirmation diagram",
  rollercoaster: "Rollercoaster illustration",
  trophy: "Trophy and celebration",
  "message-in-bottle": "Message in a bottle on the island of retirement thought",
};

const GRAPHICS: Record<RefiningIllustrationId, ReactElement> = {
  "one-question-worksheet": (
    <>
      <rect x="34" y="14" width="92" height="92" rx="4" opacity="0.9" />
      <line x1="48" y1="34" x2="112" y2="34" opacity="0.6" />
      <line x1="48" y1="48" x2="112" y2="48" opacity="0.6" />
      <line x1="48" y1="48" x2="98" y2="48" opacity="0.6" />
      <path d="M50 66 q6 -8 12 0 q6 8 12 0" opacity="0.9" />
      <line x1="50" y1="84" x2="90" y2="84" opacity="0.6" />
      <circle cx="106" cy="84" r="3" fill="white" stroke="none" />
    </>
  ),
  "financial-priorities": (
    <>
      <rect x="30" y="12" width="100" height="96" rx="4" opacity="0.9" />
      <line x1="44" y1="30" x2="90" y2="30" />
      <rect x="44" y="44" width="10" height="10" rx="2" opacity="0.8" />
      <line x1="60" y1="49" x2="116" y2="49" opacity="0.6" />
      <rect x="44" y="62" width="10" height="10" rx="2" opacity="0.8" />
      <line x1="60" y1="67" x2="116" y2="67" opacity="0.6" />
      <rect x="44" y="80" width="10" height="10" rx="2" opacity="0.8" />
      <line x1="60" y1="85" x2="104" y2="85" opacity="0.6" />
    </>
  ),
  "wayfinder-report": (
    <>
      <rect x="32" y="12" width="96" height="96" rx="4" opacity="0.9" />
      <line x1="46" y1="28" x2="98" y2="28" />
      <line x1="46" y1="38" x2="80" y2="38" opacity="0.6" />
      <line x1="46" y1="58" x2="46" y2="94" opacity="0.7" />
      <rect x="54" y="76" width="10" height="18" opacity="0.8" />
      <rect x="70" y="66" width="10" height="28" opacity="0.8" />
      <rect x="86" y="72" width="10" height="22" opacity="0.8" />
      <rect x="102" y="60" width="10" height="34" opacity="0.8" />
    </>
  ),
  "affinity-aptitude-affirmation": (
    <>
      <circle cx="80" cy="34" r="22" opacity="0.35" />
      <circle cx="58" cy="72" r="22" opacity="0.35" />
      <circle cx="102" cy="72" r="22" opacity="0.35" />
      <text x="80" y="30" fill="white" stroke="none" fontSize="8" textAnchor="middle">Affinity</text>
      <text x="58" y="76" fill="white" stroke="none" fontSize="8" textAnchor="middle">Aptitude</text>
      <text x="102" y="76" fill="white" stroke="none" fontSize="8" textAnchor="middle">Affirmation</text>
      <circle cx="80" cy="60" r="3" fill="white" stroke="none" />
    </>
  ),
  rollercoaster: (
    <>
      <path d="M20 96 C 34 40, 50 40, 62 70 C 72 94, 86 94, 94 62 C 100 40, 112 30, 122 46 C 128 56, 132 70, 140 96" />
      <line x1="20" y1="96" x2="140" y2="96" opacity="0.6" />
      <circle cx="62" cy="70" r="3" fill="white" stroke="none" />
      <circle cx="94" cy="62" r="3" fill="white" stroke="none" />
      <line x1="34" y1="96" x2="34" y2="70" opacity="0.5" />
      <line x1="108" y1="96" x2="108" y2="50" opacity="0.5" />
    </>
  ),
  trophy: (
    <>
      <path d="M58 24h44v20a22 22 0 0 1-44 0z" opacity="0.9" />
      <path d="M58 30h-12a10 10 0 0 0 10 14" opacity="0.7" />
      <path d="M102 30h12a10 10 0 0 1-10 14" opacity="0.7" />
      <line x1="80" y1="64" x2="80" y2="80" />
      <path d="M64 96h32l-4 -12h-24z" opacity="0.9" />
      <line x1="60" y1="96" x2="100" y2="96" />
    </>
  ),
  "message-in-bottle": (
    <>
      <path d="M74 16v14c-4 3-6 6-6 11v46a10 10 0 0 0 20 0V41c0-5-2-8-6-11V16z" opacity="0.9" />
      <line x1="70" y1="16" x2="90" y2="16" />
      <rect x="78" y="40" width="6" height="16" rx="1" opacity="0.7" />
      <path d="M20 100 q30 -14 60 0 q30 14 60 0" opacity="0.6" />
    </>
  ),
};

export default function RefiningIllustration({
  id,
  showCaption = true,
}: {
  id: RefiningIllustrationId;
  showCaption?: boolean;
}) {
  const label = LABELS[id];
  return (
    <figure className="refining-illustration">
      <svg
        viewBox="0 0 160 120"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label={label}
      >
        {GRAPHICS[id]}
      </svg>
      {showCaption && <figcaption>{label}</figcaption>}
    </figure>
  );
}
