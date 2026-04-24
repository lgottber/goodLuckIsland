import Link from "next/link";

export default function MobileArticlesLink({ setMobileOpen }) {
  return (
    <Link href="/articles" onClick={() => setMobileOpen(false)}>
      Podcasts &amp; Articles
    </Link>
  );
}
