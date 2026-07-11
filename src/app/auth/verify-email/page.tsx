"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import "./verify-email.css";

export default function VerifyEmailPage() {
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/signup");
      return;
    }
    if (user?.email_verified) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  function handleContinue() {
    // Re-authenticate to get a fresh token. Auth0 will issue a new ID token
    // with email_verified: true once the user has clicked the link.
    loginWithRedirect({ appState: { returnTo: "/" } });
  }

  if (isLoading || !isAuthenticated || user?.email_verified) return null;

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">
        <div className="verify-email-icon" aria-hidden="true">
          ✉️
        </div>

        <h1 className="verify-email-title">Check your inbox</h1>

        <p className="verify-email-body">
          We sent a verification link to{" "}
          {user?.email ? (
            <span className="verify-email-address">{user.email}</span>
          ) : (
            "your email address"
          )}
          . Click the link to activate your account.
        </p>

        <p className="verify-email-hint">
          Don&apos;t see it? Check your spam or junk folder.
        </p>

        <div className="verify-email-actions">
          <button
            type="button"
            className="verify-email-btn-primary"
            onClick={handleContinue}
          >
            I&apos;ve verified my email
          </button>

          <a href="/signup" className="verify-email-btn-ghost">
            Back to sign up
          </a>
        </div>
      </div>
    </div>
  );
}
