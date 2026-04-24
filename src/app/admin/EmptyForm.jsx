export default function EmptyForm({ icon, text }) {
  return (
    <div className="admin-empty-form">
      <div className="admin-empty-form-icon">{icon}</div>
      <div className="admin-empty-form-text">{text}</div>
    </div>
  );
}
