"use client";

import { useEffect, useState } from "react";

interface EventItem {
  summary: string;
  start: string;
  end: string | null;
  url: string | null;
  location: string | null;
}

interface EventsResponse {
  events: EventItem[];
  subscribeUrl: string | null;
  error?: string;
}

function formatEventDate(isoStart: string, isoEnd: string | null): string {
  const start = new Date(isoStart);
  const dateStr = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (!isoEnd) return `${dateStr} · ${timeStr}`;

  const end = new Date(isoEnd);
  const endTimeStr = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Same day — show "Jan 1, 2025 · 12:00 PM – 1:00 PM"
  if (start.toDateString() === end.toDateString()) {
    return `${dateStr} · ${timeStr} – ${endTimeStr}`;
  }

  return `${dateStr} · ${timeStr}`;
}

export default function UpcomingEvents() {
  const [data, setData] = useState<EventsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json() as Promise<EventsResponse>)
      .then(setData)
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="profile-card profile-card--events">
      <h3>Upcoming Events</h3>
      {loading ? (
        <p className="events-empty">Loading…</p>
      ) : fetchError ? (
        <p className="events-empty">Unable to load events.</p>
      ) : !data || data.events.length === 0 ? (
        <p className="events-empty">No upcoming events at this time.</p>
      ) : (
        <ul className="events-list">
          {data.events.map((event) => (
            <li key={`${event.start}-${event.summary}`} className="events-row">
              <div className="events-row-main">
                {event.url ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="events-title"
                  >
                    {event.summary}
                  </a>
                ) : (
                  <span className="events-title">{event.summary}</span>
                )}
                <span className="events-date">{formatEventDate(event.start, event.end)}</span>
                {event.location && (
                  <span className="events-location">{event.location}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {data?.subscribeUrl && (
        <a
          href={data.subscribeUrl}
          className="events-subscribe"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe to Calendar
        </a>
      )}
    </div>
  );
}
