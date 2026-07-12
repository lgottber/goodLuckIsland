"use client";

import { useEffect } from "react";
import Icon from "../../components/Icon";
import WatchHistoryItem from "./WatchHistoryItem";
import { useUserDataStore } from "../../lib/stores/userDataStore";

export default function BackpackWatchHistoryTab() {
  const history = useUserDataStore((state) => state.watchHistory.entries);
  const videos = useUserDataStore((state) => state.watchHistory.videos);
  const status = useUserDataStore((state) => state.watchHistoryStatus);
  const ensureWatchHistory = useUserDataStore((state) => state.ensureWatchHistory);

  useEffect(() => {
    ensureWatchHistory();
  }, [ensureWatchHistory]);

  const loading = status === "idle" || status === "loading";
  const error = status === "error";

  if (loading) {
    return <p className="watch-history-loading">Loading…</p>;
  }

  if (error) {
    return <p className="watch-history-loading">Could not load watch history. Please try again later.</p>;
  }

  if (history.length === 0) {
    return (
      <div className="watch-history-empty">
        <div className="watch-history-empty-icon">
          <Icon name="film" size={32} />
        </div>
        <h3>No videos watched yet</h3>
        <p>Videos you watch will show up here with your progress.</p>
      </div>
    );
  }

  const videosById = new Map(videos.map((video) => [video.id, video]));

  return (
    <div className="watch-history-list">
      {history.map((entry) => {
        const video = videosById.get(entry.videoId);
        if (!video) return null;
        return <WatchHistoryItem key={entry.videoId} video={video} percent={entry.percent} />;
      })}
    </div>
  );
}
