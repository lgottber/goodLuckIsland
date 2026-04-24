import { useState } from "react";

/**
 * Returns [active, trigger] for temporary success/feedback states.
 * Calling trigger() sets active=true, then resets after `duration` ms.
 */
export function useSubmitFeedback(duration = 3000) {
  const [active, setActive] = useState(false);
  const trigger = () => {
    setActive(true);
    setTimeout(() => setActive(false), duration);
  };
  return [active, trigger];
}
