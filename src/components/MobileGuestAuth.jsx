export default function MobileGuestAuth({ setMobileOpen }) {
  return (
    <div className="nav-mobile-auth">
      <a
        href="/auth/login?screen_hint=signup"
        className="nav-btn-solid"
        onClick={() => setMobileOpen(false)}
      >
        Join Free
      </a>
      <a
        href="/auth/login"
        className="nav-btn-ghost"
        onClick={() => setMobileOpen(false)}
      >
        Sign In
      </a>
    </div>
  );
}
