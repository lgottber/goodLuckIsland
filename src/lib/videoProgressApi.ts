import { apiFetch } from "./apiClient";
import { trackEvent } from "./analyticsApi";

export type VideoWatchHistoryEntry = {
  videoId: number;
  percent: number;
  updatedAt: string;
};

export type VideoProgressPercent = 25 | 50 | 75 | 100;

export function recordVideoProgress(videoId: number, percent: VideoProgressPercent): void {
  trackEvent("video_progress", { contentType: "video", contentId: videoId, percent });
}

// Mirror the { contentType, contentId } blob shape used by content_viewed
// events (see EpisodeCard/VideoCard/ArticleCard) so these can be read with
// the same decode-in-JS pattern as goodLuckAdmin's getContentViewCounts.
export function recordVideoPlayEvent(videoId: number): void {
  trackEvent("video_play", { contentType: "video", contentId: videoId });
}

export function recordVideoPauseEvent(videoId: number): void {
  trackEvent("video_pause", { contentType: "video", contentId: videoId });
}

export function fetchVideoWatchHistory(): Promise<VideoWatchHistoryEntry[]> {
  return apiFetch<VideoWatchHistoryEntry[]>("/video-progress/history");
}
