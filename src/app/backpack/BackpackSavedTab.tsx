"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BookmarkRow from "./BookmarkRow";
import { removeSaved } from "../../lib/savedApi";
import type { SavedItemData } from "../saved/SavedItem";
import { useUserDataStore } from "../../lib/stores/userDataStore";

export default function BackpackSavedTab() {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";
  const items = useUserDataStore((state) => state.saved);
  const status = useUserDataStore((state) => state.savedStatus);
  const ensureSaved = useUserDataStore((state) => state.ensureSaved);
  const removeSavedItem = useUserDataStore((state) => state.removeSavedItem);
  const restoreSavedItem = useUserDataStore((state) => state.restoreSavedItem);

  useEffect(() => {
    if (!userId) return;
    ensureSaved(userId);
  }, [userId, ensureSaved]);

  const loading = status === "idle" || status === "loading";
  const fetchError = status === "error";

  function handleRemove(item: SavedItemData) {
    removeSavedItem(item.id);
    removeSaved(item.itemType, item.numericId).catch(() => {
      restoreSavedItem(item);
    });
  }

  return (
    <div className="backpack-saved-tab">
      {loading && <p className="bm-loading">Loading saved items…</p>}
      {!loading && fetchError && (
        <p className="bm-empty">Could not load your saved items. Please try again later.</p>
      )}
      {!loading && !fetchError && items.length === 0 && (
        <p className="bm-empty">Nothing saved yet — bookmark articles, podcast episodes, and videos to find them here.</p>
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
