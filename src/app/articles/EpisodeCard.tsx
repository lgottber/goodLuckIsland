import { PlayIcon } from "../../components/Icons";
import PictureImage from "../../components/PictureImage";
import type { Episode } from "../../lib/articlesApi";

export default function EpisodeCard({ ep, onPlay }: { ep: Episode; onPlay: () => void }) {
  return (
    <div className="episode-card" onClick={onPlay}>
      <div className="episode-thumb">
        <PictureImage
          name={ep.thumbnail ?? undefined}
          alt={`Thumbnail for podcast episode ${ep.num}: ${ep.title}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="episode-thumb-overlay">
          <button type="button" className="episode-thumb-play">
            <PlayIcon size={16} />
          </button>
        </div>
        <span className="episode-duration-badge">{ep.duration}</span>
      </div>
      <div className="episode-body">
        <div className="episode-body-meta">
          <span className="episode-body-num">{ep.num}</span>
          <span className="episode-body-date">{ep.date}</span>
        </div>
        <h3 className="episode-body-title">{ep.title}</h3>
        <p className="episode-body-desc">{ep.desc}</p>
        <div className="episode-body-watch">
          <PlayIcon size={12} /> Watch Episode
        </div>
      </div>
    </div>
  );
}
