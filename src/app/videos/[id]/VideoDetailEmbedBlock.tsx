import TrackedYouTubeEmbed from "../../../components/TrackedYouTubeEmbed";

interface Props {
  videoId: number;
  youtubeId: string;
  title: string;
}

export default function VideoDetailEmbedBlock({ videoId, youtubeId, title }: Props) {
  return (
    <>
      <div className="video-detail-embed-wrap">
        <TrackedYouTubeEmbed
          videoId={videoId}
          youtubeId={youtubeId}
          title={title}
          autoplay={false}
          className="video-detail-embed"
        />
      </div>
      <div className="video-detail-actions">
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-youtube"
        >
          Open on YouTube
        </a>
      </div>
    </>
  );
}
