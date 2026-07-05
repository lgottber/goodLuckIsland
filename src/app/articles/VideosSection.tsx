import { useEffect, useState } from "react";
import VideosBody from "./VideosBody";
import VideoModal from "./VideoModal";
import type { Video } from "../../lib/videosApi";

const PAGE_SIZE = 12;

function parseMins(duration: string | null): number {
  if (!duration) return 0;
  const h = duration.match(/(\d+)h/);
  const m = duration.match(/(\d+)\s*min/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

function matchesDuration(video: Video, filter: string): boolean {
  if (filter === "all") return true;
  const mins = parseMins(video.duration);
  if (filter === "short") return mins < 30;
  if (filter === "medium") return mins >= 30 && mins <= 60;
  if (filter === "long") return mins > 60;
  return true;
}

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
  const visibleVideos = rest.filter((v) => matchesDuration(v, durationFilter));
  const totalPages = Math.max(1, Math.ceil(visibleVideos.length / PAGE_SIZE));
  const pageVideos = visibleVideos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <VideosBody
        featured={featured}
        visibleVideos={pageVideos}
        featuredPlaying={featuredPlaying}
        setFeaturedPlaying={setFeaturedPlaying}
        onPlayVideo={setModalVideo}
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
