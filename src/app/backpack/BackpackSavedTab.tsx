"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BookmarkRow from "./BookmarkRow";
import { fetchSavedContent, removeSaved } from "../../lib/savedApi";
import type { SavedItemData } from "../saved/SavedItem";

export default function BackpackSavedTab() {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";
  const [items, setItems] = useState<SavedItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setFetchError(false);
    fetchSavedContent(userId)
      .then(setItems)
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, [userId]);

  function handleRemove(item: SavedItemData) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
    removeSaved(item.itemType, item.numericId).catch(() => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.id === item.id);
        if (idx !== -1) return prev;
        return [...prev, item];
      });
    });
  }

  return (
    <div className="backpack-saved-tab">
      {loading && <p className="bm-loading">Loading saved items…</p>}
      {!loading && fetchError && (
        <p className="bm-empty">Could not load your saved items. Please try again later.</p>
      )}
      {!loading && !fetchError && items.length === 0 && (
        <p className="bm-empty">Nothing saved yet — bookmark articles and podcast episodes to find them here.</p>
      )}
      {!loading && !fetchError && items.length > 0 && (
        <div className="bm-list">
          {items.map((item) => (
            <BookmarkRow key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}
