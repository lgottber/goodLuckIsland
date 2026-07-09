"use client";

import { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import WatchHistoryItem from "./WatchHistoryItem";
import { fetchVideoWatchHistory } from "../../lib/videoProgressApi";
import type { VideoWatchHistoryEntry } from "../../lib/videoProgressApi";
import { fetchVideosByIds } from "../../lib/videosApi";
import type { Video } from "../../lib/videosApi";

export default function BackpackWatchHistoryTab() {
  const [history, setHistory] = useState<VideoWatchHistoryEntry[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoWatchHistory()
      .then((entries) => {
        setHistory(entries);
        return fetchVideosByIds(entries.map((entry) => entry.videoId));
      })
      .then(setVideos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="watch-history-loading">Loading…</p>;
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
