export default function GuestAuthButtons() {
  return (
    <>
      <a href="/auth/login" className="nav-btn-ghost">Sign In</a>
      <a href="/auth/login?screen_hint=signup" className="nav-btn-solid">
        Join Free
      </a>
    </>
  );
}
