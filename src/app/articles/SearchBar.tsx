"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "../../components/Icon";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: { preventDefault(): void }): void {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className="articles-search" onSubmit={handleSubmit} role="search">
      <span className="articles-search-icon" aria-hidden="true">
        <Icon name="compass" size={16} />
      </span>
      <input
        type="search"
        className="articles-search-input"
        placeholder="Search articles &amp; podcasts…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search articles and podcasts"
      />
      <button type="submit" className="articles-search-btn">Search</button>
    </form>
  );
}
