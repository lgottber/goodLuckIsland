import Link from "next/link";
import FooterPatreonLink from "./FooterPatreonLink";
import "./Footer.css";

export default function Footer() {
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
