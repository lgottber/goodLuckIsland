export default function Modal({ onClose, backdropClassName, contentClassName, children }) {
  return (
    <div className={backdropClassName} onClick={onClose}>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
