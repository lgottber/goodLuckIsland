import { useState, useRef, useEffect } from "react";

export function useSubmitFeedback(duration = 3000): [boolean, () => void] {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => setActive(false);
  const cleanup = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  };

  useEffect(() => cleanup, []);

  const trigger = () => {
    cleanup();
    setActive(true);
    timerRef.current = setTimeout(reset, duration);
  };

  return [active, trigger];
}
