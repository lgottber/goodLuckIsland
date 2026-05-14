import { ReactNode, ChangeEventHandler } from "react";

export default function Select({ value, onChange, children, placeholder }: { value: string; onChange: ChangeEventHandler<HTMLSelectElement>; children: ReactNode; placeholder?: string }) {
  return (
    <select value={value} onChange={onChange}>
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
}
