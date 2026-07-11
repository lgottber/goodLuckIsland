import { ReactNode } from "react";

export default function Field({ label, hint, error, children }: { label: string; hint?: string; error?: boolean; children: ReactNode }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint && <span className={error ? "field-hint field-error" : "field-hint"}>{hint}</span>}
    </div>
  );
}
