import { useEffect } from "react";
import VideoCard from "./VideoCard";
import { useUserDataStore } from "../../lib/stores/userDataStore";

const MAX_ITEMS = 6;

export default function ContinueWatchingRow({
  userId,
  savedVideoIds,
}: {
  userId?: string;
  savedVideoIds?: Set<number>;
}) {
  const entries = useUserDataStore((state) => state.watchHistory.entries);
  const videos = useUserDataStore((state) => state.watchHistory.videos);
  const status = useUserDataStore((state) => state.watchHistoryStatus);
  const ensureWatchHistory = useUserDataStore((state) => state.ensureWatchHistory);

  useEffect(() => {
    ensureWatchHistory();
  }, [ensureWatchHistory]);

  if (status !== "loaded") return null;

  const videosById = new Map(videos.map((video) => [video.id, video]));
  const inProgress = entries
    .filter((entry) => entry.percent > 0 && entry.percent < 100 && videosById.has(entry.videoId))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, MAX_ITEMS);

  if (inProgress.length === 0) return null;

  return (
    <div className="continue-watching-section">
      <p className="episodes-section-label">Continue Watching</p>
      <div className="episodes-grid">
        {inProgress.map((entry) => (
          <VideoCard
            key={entry.videoId}
            video={videosById.get(entry.videoId)!}
            userId={userId}
            isSaved={savedVideoIds?.has(entry.videoId) ?? false}
          />
        ))}
      </div>
    </div>
  );
}
