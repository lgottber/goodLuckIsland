import { ReactNode } from "react";

export default function Field({ label, hint, error, required, children }: { label: string; hint?: string; error?: boolean; required?: boolean; children: ReactNode }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {required && <span className="field-required">required</span>}
      {hint && <span className={error ? "field-hint field-error" : "field-hint"}>{hint}</span>}
    </div>
  );
}
