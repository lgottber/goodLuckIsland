<<<<<<< Updated upstream:src/components/MobileArticlesGatedButton.jsx
export default function MobileArticlesGatedButton(
  { setMobileOpen, setShowGate },
) {
=======
export default function MobileArticlesGatedButton({
  setMobileOpen,
  setShowGate,
}: {
  setMobileOpen: (v: boolean) => void;
  setShowGate: (v: boolean) => void;
}) {
>>>>>>> Stashed changes:src/components/MobileArticlesGatedButton.tsx
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
