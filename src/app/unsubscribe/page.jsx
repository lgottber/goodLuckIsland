import { Suspense } from "react";
import { UnsubscribeContent } from "./UnsubscribeContent";
import "./unsubscribe.css";

export default function UnsubscribePage() {
  return (
    <div className="unsub-page">
      <Suspense fallback={null}>
        <UnsubscribeContent />
      </Suspense>
    </div>
  );
}
