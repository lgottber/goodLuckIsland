import { useEffect, useState } from "react";
import { fetchPlaylist } from "../../lib/playlistsApi";
import type { Playlist, PlaylistDetail } from "../../lib/playlistsApi";
import PlaylistCard from "./PlaylistCard";
import PlaylistBody from "./PlaylistBody";
import FeaturedPlaylist from "./FeaturedPlaylist";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 12;

interface Props {
  playlists: Playlist[];
  userId: string;
  savedEpisodeIds: Set<number>;
}

export default function PlaylistsSection({ playlists, userId, savedEpisodeIds }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PlaylistDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    setDetailLoading(true);
    setDetailError(false);
    fetchPlaylist(selectedId)
      .then((result) => {
        if (!cancelled) setDetail(result);
      })
      .catch(() => {
        if (!cancelled) setDetailError(true);
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  if (selectedId) {
    return (
      <div>
        <button
          type="button"
          className="playlist-back-link"
          onClick={() => {
            setSelectedId(null);
            setDetail(null);
          }}
        >
          ← Back to Playlists
        </button>
        {detailLoading && <p className="articles-loading">Loading playlist…</p>}
        {detailError && (
          <p className="articles-load-error">
            Could not load this playlist. It may have been removed.
          </p>
        )}
        {!detailLoading && !detailError && detail && (
          <PlaylistBody playlist={detail} userId={userId} savedEpisodeIds={savedEpisodeIds} />
        )}
      </div>
    );
  }

  if (playlists.length === 0) {
    return <p className="podcast-empty">No playlists yet.</p>;
  }

  // Playlists are fetched oldest-first (created_at ASC), so the most
  // recently created one is the last element -- mirrors how podcast/videos
  // treat their first (newest) item as "featured".
  const featured = playlists[playlists.length - 1];
  const rest = playlists.slice(0, -1);

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const pagePlaylists = rest.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <FeaturedPlaylist featured={featured} onSelect={() => setSelectedId(featured.id)} />
      <div className="playlists-grid">
        {pagePlaylists.map((p) => (
          <PlaylistCard key={p.id} playlist={p} onSelect={() => setSelectedId(p.id)} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </>
  );
}
