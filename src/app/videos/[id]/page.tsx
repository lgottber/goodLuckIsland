"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../../../components/NavBarDynamic";
import VideoDetailContent from "./VideoDetailContent";
import { fetchVideosByIds } from "../../../lib/videosApi";
import type { Video } from "../../../lib/videosApi";
import "./video-detail.css";

export default function VideoDetailPage() {
  const params = useParams();
  const rawId = typeof params.id === "string" ? params.id : (params.id?.[0] ?? "");
  const id = parseInt(rawId, 10);

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!rawId || isNaN(id)) {
      setError(true);
      setLoading(false);
      return;
    }
    fetchVideosByIds([id])
      .then((videos) => {
        if (videos.length > 0) setVideo(videos[0]);
        else setError(true);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id, rawId]);

  return (
    <>
      <NavBar activePage="videos" />
      <div className="video-detail-page">
        <div className="video-detail-inner">
          <Link href="/articles?tab=videos" className="video-detail-back">
            ← Back to Videos
          </Link>

          {loading && <p className="video-detail-status">Loading…</p>}
          {!loading && error && <p className="video-detail-status">Video not found.</p>}
          {video && <VideoDetailContent video={video} />}
        </div>
      </div>
    </>
  );
}
