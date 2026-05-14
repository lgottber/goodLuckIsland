import { PlayIcon } from "../../components/Icons";

type Episode = { id: number; num: string; title: string; desc: string | null; date: string | null; duration: string | null; youtubeId: string | null; thumbnail: string | null };

export default function EpisodeCard({ ep, onPlay }: { ep: Episode; onPlay: () => void }) {
  return (
    <div className="episode-card" onClick={onPlay}>
      <div className="episode-thumb">
        <img src={ep.thumbnail ?? undefined} alt={ep.title} />
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
