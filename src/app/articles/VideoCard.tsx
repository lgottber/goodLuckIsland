import Link from "next/link";
import { PlayIcon } from "../../components/Icons";
import PictureImage from "../../components/PictureImage";
import BookmarkButton from "./BookmarkButton";
import TagPills from "../../components/TagPills";
import type { Video } from "../../lib/videosApi";
import { trackEvent } from "../../lib/analyticsApi";

interface Props {
  video: Video;
  userId?: string;
  isSaved?: boolean;
}

export default function VideoCard({ video, userId, isSaved }: Props) {
  return (
    <Link
      href={`/articles/videos/${video.id}`}
      className="episode-card"
      onClick={() =>
        trackEvent("content_viewed", { contentType: "video", contentId: video.id, tags: video.tagIds })
      }
    >
      <div className="episode-thumb">
        <PictureImage
          name={video.thumbnail ?? undefined}
          alt={`Thumbnail for video ${video.num}: ${video.title}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="episode-thumb-overlay">
          <span className="episode-thumb-play">
            <PlayIcon size={16} />
          </span>
        </div>
        <span className="episode-duration-badge">{video.duration}</span>
        {userId && (
          <BookmarkButton
            userId={userId}
            itemType="video"
            itemId={video.id}
            initialSaved={isSaved ?? false}
          />
        )}
      </div>
      <div className="episode-body">
        <div className="episode-body-meta">
          <span className="episode-body-num">{video.num}</span>
          <span className="episode-body-date">{video.date}</span>
        </div>
        <h3 className="episode-body-title">{video.title}</h3>
        <TagPills tags={video.tags} />
        <p className="episode-body-desc">{video.desc}</p>
        <div className="episode-body-watch">
          <PlayIcon size={12} /> Watch Video
        </div>
      </div>
    </Link>
  );
}
