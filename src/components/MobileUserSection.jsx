import Link from "next/link";

export default function MobileUserSection({ setMobileOpen, isAdmin = false }) {
  return (
    <>
      <div className="nav-mobile-divider" />
      <Link href="/profile" onClick={() => setMobileOpen(false)}>
        👤 My Profile
      </Link>
      <Link href="/saved" onClick={() => setMobileOpen(false)}>
        🔖 Saved Content
      </Link>
      <Link href="/backpack" onClick={() => setMobileOpen(false)}>
        🎒 My Backpack
      </Link>
      {isAdmin && (
        <Link href="/admin" onClick={() => setMobileOpen(false)}>
          ⚙️ Admin Portal
        </Link>
      )}
      <a href="/auth/logout">↩ Logout</a>
    </>
  );
}
