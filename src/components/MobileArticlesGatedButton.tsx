export default function MobileArticlesGatedButton({
  setMobileOpen,
  setShowGate,
}: {
  setMobileOpen: (v: boolean) => void;
  setShowGate: (v: boolean) => void;
}) {
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
