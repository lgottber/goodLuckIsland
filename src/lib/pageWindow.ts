// Shared by src/components/Pagination.tsx -- split out from the component
// so this pure page-window math can be unit tested without needing a
// JSX/DOM test environment.
export function getPageWindow(current: number, total: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  const window = 1;

  for (let p = 1; p <= total; p++) {
    const isEdge = p === 1 || p === total;
    const isNearCurrent = Math.abs(p - current) <= window;
    if (isEdge || isNearCurrent) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }
  return pages;
}
