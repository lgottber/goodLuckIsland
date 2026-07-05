import PictureImage from "../../components/PictureImage";
import ListenOverlay from "./ListenOverlay";
import type { Episode } from "../../lib/articlesApi";

export default function FeaturedEpisode({ episode }: { episode: Episode }) {
  return (
    <>
      <PictureImage
        className="featured-thumbnail"
        name={episode.thumbnail ?? undefined}
        alt={`Thumbnail for featured podcast episode: ${episode.title}`}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
      {episode.podcastUrl && (
        <ListenOverlay url={episode.podcastUrl} title={episode.title} />
      )}
    </>
  );
}
