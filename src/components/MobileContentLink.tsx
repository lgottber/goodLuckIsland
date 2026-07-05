import Link from "next/link";

export default function MobileContentLink({
  loggedIn,
  setMobileOpen,
  setShowGate,
}: {
  loggedIn: boolean;
  setMobileOpen: (v: boolean) => void;
  setShowGate: (v: boolean) => void;
}) {
  if (loggedIn) {
    return (
      <Link href="/articles" onClick={() => setMobileOpen(false)}>
        Membership Content
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="nav-mobile-gated"
      onClick={() => {
        setMobileOpen(false);
        setShowGate(true);
      }}
    >
      Membership Content
    </button>
  );
}
