"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      body: JSON.stringify({ event: "page_view", properties: { page: pathname } }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
