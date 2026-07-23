"use client";

import { usePatreonLink } from "../hooks/usePatreonLink";
import { trackEvent } from "../lib/analyticsApi";

export default function FooterPatreonLink() {
  const url = usePatreonLink();

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-patreon-link"
      onClick={() => trackEvent("patreon_link_clicked")}
    >
      Support us on Patreon
    </a>
  );
}
