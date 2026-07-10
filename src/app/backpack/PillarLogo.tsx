import type { ReactElement } from "react";

export type PillarId =
  | "one-question"
  | "pinwirl"
  | "values"
  | "purpose"
  | "skills"
  | "together"
  | "giveback";

export default function PillarLogo({ id, size = 16 }: { id: PillarId; size?: number }) {
  const logos: Record<PillarId, ReactElement> = {
    "one-question": (
      <>
        <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2 1.8-2 3.5" />
        <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
    pinwirl: (
      <>
        <path
          d="M12 9 Q16 8 16 3.5 Q11.5 4.5 12 9 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12 9 Q13 13 17.5 13.5 Q17 9 12 9 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12 9 Q8 10 8 14.5 Q12.5 13.5 12 9 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M12 9 Q11 5 6.5 4.5 Q7 9 12 9 Z"
          fill="currentColor"
          stroke="none"
        />
        <line x1="12" y1="9" x2="12" y2="21" strokeWidth="1.3" />
        <circle cx="12" cy="9" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
    values: (
      <path
        d="M12 20c-.3 0-.6-.1-.8-.3C7 16 3.5 12.9 3.5 9.1 3.5 6.3 5.7 4 8.5 4c1.6 0 3 .8 3.5 2 .5-1.2 1.9-2 3.5-2 2.8 0 5 2.3 5 5.1 0 3.8-3.5 6.9-7.7 10.6-.2.2-.5.3-.8.3z"
        fill="currentColor"
        stroke="none"
      />
    ),
    purpose: (
      <>
        <line x1="2" y1="16" x2="22" y2="16" />
        <path d="M6 16a6 6 0 0 1 12 0" />
        <line x1="12" y1="4" x2="12" y2="6" />
        <line x1="6" y1="7" x2="7.4" y2="8.4" />
        <line x1="18" y1="7" x2="16.6" y2="8.4" />
      </>
    ),
    skills: (
      <>
        <path d="M2 8 L12 3 L22 8 L12 13 Z" />
        <path d="M6 9.5v4a6 2 0 0 0 12 0v-4" />
        <line x1="12" y1="8" x2="16" y2="15" />
        <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    together: (
      <>
        <circle cx="9" cy="9" r="6" />
        <circle cx="15" cy="9" r="6" />
        <circle cx="12" cy="15" r="6" />
      </>
    ),
    giveback: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="1.2" />
        <rect x="2" y="7.5" width="20" height="4" rx="1" />
        <line x1="12" y1="7.5" x2="12" y2="21" />
        <path
          d="M12 7.5c-1.8 0-3-1.1-3-2.4C9 3.9 9.9 3 11 3c.9 0 1 .8 1 1.5 0-.7.1-1.5 1-1.5 1.1 0 2 .9 2 2.1 0 1.3-1.2 2.4-3 2.4z"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {logos[id]}
    </svg>
  );
}
