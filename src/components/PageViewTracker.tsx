"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "../lib/analyticsApi";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", { page: pathname });
  }, [pathname]);

  return null;
}
