"use client";

import { useSearchParams } from "next/navigation";

export function UnsubscribeContent() {
  const params = useSearchParams();
  const isError = params.get("error") === "1";

  return isError ? (
    <>
      <h1 className="unsub-title">Something went wrong.</h1>
      <p className="unsub-body">
        We couldn&apos;t process your unsubscribe request. Please try the link in
        your email again, or contact us if the problem persists.
      </p>
    </>
  ) : (
    <>
      <h1 className="unsub-title">You&apos;ve been unsubscribed.</h1>
      <p className="unsub-body">
        You won&apos;t receive any more newsletters from Good Luck Island.
      </p>
    </>
  );
}
