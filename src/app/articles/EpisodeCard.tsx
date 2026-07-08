import Icon from "../../components/Icon";
import PictureImage from "../../components/PictureImage";
import BookmarkButton from "./BookmarkButton";
import type { Episode } from "../../lib/articlesApi";
import { trackEvent } from "../../lib/analyticsApi";

interface Props {
  ep: Episode;
  userId: string;
  isSaved: boolean;
}

export default function EpisodeCard({ ep, userId, isSaved }: Props) {
  function handleClick() {
    if (!ep.podcastUrl) return;
    trackEvent("content_viewed", { contentType: "episode", contentId: ep.id });
    globalThis.open(ep.podcastUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="episode-card" onClick={handleClick}>
      <div className="episode-thumb">
        <PictureImage
          name={ep.thumbnail ?? undefined}
          alt={`Thumbnail for podcast episode ${ep.num}: ${ep.title}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="episode-thumb-overlay">
          <button type="button" className="episode-thumb-play">
            <Icon name="headphones" size={16} />
          </button>
        </div>
        <span className="episode-duration-badge">{ep.duration}</span>
        {userId && (
          <BookmarkButton
            userId={userId}
            itemType="episode"
            itemId={ep.id}
            initialSaved={isSaved}
          />
        )}
      </div>
      <div className="episode-body">
        <div className="episode-body-meta">
          <span className="episode-body-num">{ep.num}</span>
          <span className="episode-body-date">{ep.date}</span>
        </div>
        <h3 className="episode-body-title">{ep.title}</h3>
        <p className="episode-body-desc">{ep.desc}</p>
        <div className="episode-body-watch">
          <Icon name="headphones" size={12} /> Listen to Episode
        </div>
      </div>
    </div>
  );
}
