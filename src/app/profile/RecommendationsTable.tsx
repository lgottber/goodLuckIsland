"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchRecommendations, type RecommendedItem } from "../../lib/recommendationsApi";
import RecommendationRow from "./RecommendationRow";

export default function RecommendationsTable() {
  const [items, setItems] = useState<RecommendedItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchRecommendations()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoaded(true));
  }, []);

  let body: ReactNode;
  if (!loaded) {
    body = <p className="assess-empty">Loading…</p>;
  } else if (items.length === 0) {
    body = <p className="assess-empty">Browse some content to get personalized recommendations.</p>;
  } else {
    body = (
      <ul className="assess-list">
        {items.map((item) => (
          <RecommendationRow key={`${item.contentType}-${item.id}`} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div className="profile-card profile-card--assess-table">
      <h3>Recommended for You</h3>
      {body}
    </div>
  );
}
