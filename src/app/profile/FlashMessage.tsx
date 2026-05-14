export default function FlashMessage({ message, error = false }: { message: string; error?: boolean }) {
  return (
    <span className={`saved-flash${error ? " saved-flash--error" : ""}`}>
      {message}
    </span>
  );
}
