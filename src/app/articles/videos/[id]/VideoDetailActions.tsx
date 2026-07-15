"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BookmarkButton from "../../BookmarkButton";
import { fetchSavedIds } from "../../../../lib/savedApi";
import { fetchVideoWatchHistory, recordVideoProgress } from "../../../../lib/videoProgressApi";
import { trackEvent } from "../../../../lib/analyticsApi";

export default function VideoDetailActions({ videoId }: { videoId: number }) {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";
  const [isSaved, setIsSaved] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!userId) return;
    Promise.all([fetchSavedIds(userId), fetchVideoWatchHistory()])
      .then(([saved, history]) => {
        setIsSaved(saved.videos.has(videoId));
        setCompleted(history.some((h) => h.videoId === videoId && h.percent === 100));
      })
      .finally(() => setLoaded(true));
  }, [userId, videoId]);

  function handleMarkComplete() {
    if (completed) return;
    recordVideoProgress(videoId, 100);
    trackEvent("video_marked_complete", { contentType: "video", contentId: videoId });
    setCompleted(true);
  }

  if (!userId || !loaded) return null;

  return (
    <div className="video-detail-actions-row">
      <BookmarkButton userId={userId} itemType="video" itemId={videoId} initialSaved={isSaved} />
      <button
        type="button"
        className="content-detail-mark-complete-btn"
        onClick={handleMarkComplete}
        disabled={completed}
      >
        {completed ? "✓ Marked as Watched" : "Mark as Watched"}
      </button>
    </div>
  );
}
