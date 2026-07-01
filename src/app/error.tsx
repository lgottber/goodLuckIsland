"use client";

import { useEffect } from "react";
import "./error.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-content">
        <p className="error-eyebrow">Something went wrong</p>
        <h1>Rough Waters</h1>
        <p className="error-sub">
          An unexpected error occurred. It&apos;s not you — the island hit a
          wave. Try refreshing, or head back to the homepage.
        </p>
        <div className="error-actions">
          <button type="button" className="error-btn-primary" onClick={reset}>
            Try Again
          </button>
          <a href="/" className="error-btn-ghost">
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
