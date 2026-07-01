"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./session-guard.css";

const IDLE_MS  = 30 * 60 * 1000; // 30 min idle before warning appears
const WARN_S   = 60;              // seconds of countdown before auto sign-out

export default function SessionGuard() {
  const { isAuthenticated, logout } = useAuth0();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown]     = useState(WARN_S);

  const idleTimerRef   = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const warnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isWarningRef   = useRef(false);
  const resetIdleRef   = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isAuthenticated) return;

    function startWarning() {
      isWarningRef.current = true;
      let secs = WARN_S;
      setCountdown(secs);
      setShowWarning(true);
      warnIntervalRef.current = setInterval(() => {
        secs -= 1;
        setCountdown(secs);
        if (secs <= 0) {
          clearInterval(warnIntervalRef.current!);
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      }, 1000);
    }

    function resetIdle() {
      if (isWarningRef.current) return;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(startWarning, IDLE_MS);
    }

    resetIdleRef.current = resetIdle;

    const events = ["mousemove", "mousedown", "keypress", "touchstart", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    resetIdle();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimerRef.current)   clearTimeout(idleTimerRef.current);
      if (warnIntervalRef.current) clearInterval(warnIntervalRef.current);
    };
  }, [isAuthenticated, logout]);

  function handleContinue() {
    if (warnIntervalRef.current) clearInterval(warnIntervalRef.current);
    isWarningRef.current = false;
    setShowWarning(false);
    resetIdleRef.current();
  }

  function handleSignOut() {
    if (warnIntervalRef.current) clearInterval(warnIntervalRef.current);
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  if (!isAuthenticated || !showWarning) return null;

  return (
    <div className="session-guard-backdrop">
      <div
        className="session-guard-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="session-guard-title"
      >
        <p className="session-guard-eyebrow">Still there?</p>
        <h2 id="session-guard-title">Your session is about to expire</h2>
        <p className="session-guard-body">
          You&apos;ve been inactive for a while. For your security, you&apos;ll
          be signed out in{" "}
          <strong>
            {countdown} second{countdown !== 1 ? "s" : ""}
          </strong>
          .
        </p>
        <div className="session-guard-actions">
          <button
            type="button"
            className="session-guard-btn-primary"
            onClick={handleContinue}
          >
            Continue Session
          </button>
          <button
            type="button"
            className="session-guard-btn-ghost"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
