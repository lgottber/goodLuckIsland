"use client";

import { type MouseEvent, useState } from "react";
import Icon from "../../components/Icon";
import { toggleSave } from "../../lib/savedApi";

interface Props {
  userId: string;
  itemType: "article" | "episode";
  itemId: number;
  initialSaved: boolean;
}

export default function BookmarkButton({ userId, itemType, itemId, initialSaved }: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function handleClick(e: MouseEvent<HTMLButtonElement>): Promise<void> {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      const nowSaved = await toggleSave(userId, itemType, itemId);
      setSaved(nowSaved);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={`bookmark-btn${saved ? " bookmark-btn--saved" : ""}`}
      onClick={handleClick}
      disabled={loading}
      aria-label={saved ? "Remove bookmark" : "Save for later"}
    >
      <Icon name="bookmark" size={15} />
    </button>
  );
}
