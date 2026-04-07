export default function MobileArticlesGatedButton({ setMobileOpen, setShowGate }) {
  return (
    <button
      type="button"
      className="nav-mobile-gated"
      onClick={() => {
        setMobileOpen(false);
        setShowGate(true);
      }}
    >
      Podcasts &amp; Articles
    </button>
  );
}
