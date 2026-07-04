"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { trackEvent } from "../../../lib/analyticsApi";

export default function LogoutPage() {
  const { logout } = useAuth0();

  useEffect(() => {
    trackEvent("logout");
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }, [logout]);

  return null;
}
