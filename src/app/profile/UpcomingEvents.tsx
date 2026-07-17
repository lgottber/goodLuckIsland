"use client";

import { useEffect, useState } from "react";
import EventRow, { type EventItem } from "./EventRow";

interface EventsResponse {
  events: EventItem[];
  subscribeUrl: string | null;
  error?: string;
}

export default function UpcomingEvents() {
  const [data, setData] = useState<EventsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function loadEvents(): Promise<EventsResponse> {
      const res = await fetch("/api/events");
      return res.json();
    }
    loadEvents()
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
            <EventRow key={`${event.start}-${event.summary}`} event={event} />
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
