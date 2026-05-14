import Link from "next/link";

export default function MobileArticlesLink({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
  return (
    <Link href="/articles" onClick={() => setMobileOpen(false)}>
      Podcasts &amp; Articles
    </Link>
  );
}
