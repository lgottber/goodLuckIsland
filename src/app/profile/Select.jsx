export default function Select({ value, onChange, children, placeholder }) {
  return (
    <select value={value} onChange={onChange}>
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
}
