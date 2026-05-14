import { useEffect, ReactNode } from "react";

export default function Modal({
  onClose,
  backdropClassName,
  contentClassName,
  children,
}: {
  onClose: () => void;
  backdropClassName: string;
  contentClassName: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className={backdropClassName} onClick={onClose}>
      <div
        className={contentClassName}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
