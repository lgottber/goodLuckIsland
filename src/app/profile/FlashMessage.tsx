import { ReactNode } from "react";

export default function FlashMessage({ message, error = false }: { message: ReactNode; error?: boolean }) {
  return (
    <span className={`saved-flash${error ? " saved-flash--error" : ""}`}>
      {message}
    </span>
  );
}
