export interface EventItem {
  summary: string;
  start: string;
  end: string | null;
  url: string | null;
  location: string | null;
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

  if (start.toDateString() === end.toDateString()) {
    return `${dateStr} · ${timeStr} – ${endTimeStr}`;
  }

  return `${dateStr} · ${timeStr}`;
}

export default function EventRow({ event }: { event: EventItem }) {
  return (
    <li className="events-row">
      <div className="events-row-main">
        {event.url ? (
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="events-title">
            {event.summary}
          </a>
        ) : (
          <span className="events-title">{event.summary}</span>
        )}
        <span className="events-date">{formatEventDate(event.start, event.end)}</span>
        {event.location && <span className="events-location">{event.location}</span>}
      </div>
    </li>
  );
}
