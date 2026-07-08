import { useEffect, useState } from "react";
import VideosBody from "./VideosBody";
import VideoModal from "./VideoModal";
import type { Video } from "../../lib/videosApi";
import { matchesDurationFilter } from "../../lib/durationFilter";
import { trackEvent } from "../../lib/analyticsApi";

const PAGE_SIZE = 12;

export default function VideosSection({ videos }: { videos: Video[] }) {
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [modalVideo, setModalVideo] = useState<Video | null>(null);
  const [durationFilter, setDurationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [durationFilter]);

  const featured = videos[0];
  if (!featured) {
    return <p className="podcast-empty">No videos yet.</p>;
  }

  const rest = videos.slice(1);
  const visibleVideos = rest.filter((v) => matchesDurationFilter(v.duration, durationFilter));
  const totalPages = Math.max(1, Math.ceil(visibleVideos.length / PAGE_SIZE));
  const pageVideos = visibleVideos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function playVideo(video: Video) {
    trackEvent("content_viewed", { contentType: "video", contentId: video.id });
    setModalVideo(video);
  }

  return (
    <>
      <VideosBody
        featured={featured}
        visibleVideos={pageVideos}
        featuredPlaying={featuredPlaying}
        setFeaturedPlaying={setFeaturedPlaying}
        onPlayVideo={playVideo}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {modalVideo && (
        <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
      )}
    </>
  );
}
