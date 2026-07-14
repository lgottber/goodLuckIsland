import { NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../../lib/db.server";

export const runtime = "edge";

interface PlaylistRow {
  id: string;
  name: string;
  description: string;
  spotify_url: string | null;
}

interface PlaylistItemRow {
  id: string;
  playlist_id: string;
  episode_id: number;
  order_index: number;
}

interface EpisodeRow {
  id: number;
  num: string | null;
  title: string;
  description: string | null;
  date: string | null;
  duration: string | null;
  podcast_url: string | null;
  thumbnail: string | null;
}

function mapEpisode(ep: EpisodeRow) {
  return {
    id: ep.id,
    num: ep.num,
    title: ep.title,
    desc: ep.description,
    date: ep.date,
    duration: ep.duration,
    podcastUrl: ep.podcast_url,
    thumbnail: ep.thumbnail,
  };
}

// Public CMS content -- no auth check needed, matching no-RLS today.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = getDb();

  const playlist = await db
    .prepare("SELECT * FROM playlists WHERE id = ?")
    .bind(id)
    .first<PlaylistRow>();
  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
  }

  const { results: items } = await db
    .prepare(
      "SELECT * FROM playlist_items WHERE playlist_id = ? ORDER BY order_index ASC",
    )
    .bind(id)
    .all<PlaylistItemRow>();

  const episodeIds = (items ?? []).map((i) => i.episode_id);
  let episodesById = new Map<number, EpisodeRow>();
  if (episodeIds.length > 0) {
    const placeholders = episodeIds.map(() => "?").join(",");
    const { results: episodeRows } = await db
      .prepare(`SELECT * FROM episodes WHERE id IN (${placeholders})`)
      .bind(...episodeIds)
      .all<EpisodeRow>();
    episodesById = new Map((episodeRows ?? []).map((e) => [e.id, e]));
  }

  const episodes = (items ?? [])
    .map((i) => episodesById.get(i.episode_id))
    .filter((ep): ep is EpisodeRow => ep !== undefined)
    .map(mapEpisode);

  return NextResponse.json(
    {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      spotifyUrl: playlist.spotify_url,
      episodes,
    },
    { headers: publicCacheHeaders(300, 3600) },
  );
}
