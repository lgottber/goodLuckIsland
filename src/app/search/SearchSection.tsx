import type { ReactNode } from "react";

export default function SearchSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="search-section">
      <h2 className="search-section-title">{title}</h2>
      {children}
    </section>
  );
}
