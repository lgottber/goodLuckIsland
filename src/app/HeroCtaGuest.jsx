import Link from "next/link";

export default function HeroCtaGuest() {
  return (
    <>
      <a href="/auth/login?screen_hint=signup" className="cta-primary">
        Start Your Lifestyle Discovery
      </a>
      <Link href="/profile" className="cta-ghost">
        Explore the Island
      </Link>
    </>
  );
}
