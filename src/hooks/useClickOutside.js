import { useEffect } from "react";

/**
 * Calls onClickOutside when a mousedown event fires outside ref.current.
 * Pass enabled=false to disable the listener (e.g. when the element is hidden).
 */
export function useClickOutside(ref, onClickOutside, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClickOutside, enabled]);
}
