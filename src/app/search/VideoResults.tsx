import VideoCard from "../articles/VideoCard";
import SearchSection from "./SearchSection";
import type { Video } from "../../lib/videosApi";

interface Props {
  videos: Video[];
  userId: string;
  savedVideoIds: Set<number>;
}

export default function VideoResults({ videos, userId, savedVideoIds }: Props) {
  return (
    <SearchSection title="Videos">
      <div className="search-video-grid">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            userId={userId}
            isSaved={savedVideoIds.has(v.id)}
          />
        ))}
      </div>
    </SearchSection>
  );
}
