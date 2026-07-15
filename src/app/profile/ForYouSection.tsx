"use client";

import { useEffect, useState } from "react";
import ArticleCard from "../articles/ArticleCard";
import EpisodeCard from "../articles/EpisodeCard";
import VideoCard from "../articles/VideoCard";
import { useUserDataStore } from "../../lib/stores/userDataStore";
import { fetchForYou, type ForYouItem } from "../../lib/forYouApi";

interface Props {
  userId: string;
}

// 3x3 grid of the latest content matched to the member's most-engaged tags
// (#37) -- doubles as the analytics-driven content-recommendation section
// (#36), per that ticket's own recommendation to build them together since
// both need the same underlying signal (lib/forYouApi.ts, populated by
// goodLuckAdmin's update_tag_affinity queued job). Renders nothing until a
// member has enough view history to have any tag affinity at all.
export default function ForYouSection({ userId }: Props) {
  const [items, setItems] = useState<ForYouItem[] | null>(null);
  const saved = useUserDataStore((state) => state.saved);
  const ensureSaved = useUserDataStore((state) => state.ensureSaved);

  useEffect(() => {
    if (userId) ensureSaved(userId);
  }, [ensureSaved, userId]);

  useEffect(() => {
    let cancelled = false;
    fetchForYou()
      .then((result) => {
        if (!cancelled) setItems(result);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!items || items.length === 0) return null;

  const isSaved = (itemType: "article" | "episode" | "video", numericId: number) =>
    saved.some((s) => s.itemType === itemType && s.numericId === numericId);

  return (
    <section className="for-you-section">
      <h2 className="for-you-title">For You</h2>
      <div className="for-you-grid">
        {items.map((item) => {
          if (item.kind === "article") {
            return (
              <ArticleCard
                key={`article-${item.article.id}`}
                article={item.article}
                userId={userId}
                isSaved={isSaved("article", item.article.id)}
              />
            );
          }
          if (item.kind === "episode") {
            return (
              <EpisodeCard
                key={`episode-${item.episode.id}`}
                ep={item.episode}
                userId={userId}
                isSaved={isSaved("episode", item.episode.id)}
              />
            );
          }
          return (
            <VideoCard
              key={`video-${item.video.id}`}
              video={item.video}
              userId={userId}
              isSaved={isSaved("video", item.video.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
