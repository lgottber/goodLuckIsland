import { useState, useRef, useEffect } from "react";

/**
 * Returns [active, trigger] for temporary success/feedback states.
 * Calling trigger() sets active=true, then resets after `duration` ms.
 */
export function useSubmitFeedback(duration = 3000) {
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);

  const reset = () => setActive(false);
  const cleanup = () => clearTimeout(timerRef.current);

  useEffect(() => cleanup, []);

  const trigger = () => {
    cleanup();
    setActive(true);
    timerRef.current = setTimeout(reset, duration);
  };

  return [active, trigger];
}
