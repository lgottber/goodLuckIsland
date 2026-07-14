import VideoCard from "../../VideoCard";
import type { Video } from "../../../../lib/videosApi";

export default function RelatedVideos({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="content-detail-related">
      <p className="content-detail-related-title">More Videos</p>
      <div className="content-detail-related-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
