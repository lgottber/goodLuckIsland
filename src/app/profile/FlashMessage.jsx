export default function FlashMessage({ message, error = false }) {
  return (
    <span className={`saved-flash${error ? " saved-flash--error" : ""}`}>
      {message}
    </span>
  );
}
