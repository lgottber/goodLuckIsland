"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterPatreonLink from "./FooterPatreonLink";
import "./Footer.css";

export default function Footer() {
  // The landing page (src/app/page.tsx) has its own full footer (nav links,
  // social icons, copyright) -- rendering this sitewide footer there too
  // produced two stacked footers.
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <img
          src="/promise_footer.png"
          alt="We will never sell your personal information — The Goodluck Island Collective"
          className="footer-seal"
        />
        <FooterPatreonLink />
      </div>
      <div className="site-footer-links">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms">Terms of Use</Link>
      </div>
    </footer>
  );
}
