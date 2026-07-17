import type { CalendarEvent } from "../../lib/ical";
import { formatEventDate } from "../../lib/ical";

export default function UpcomingEventRow({ event }: { event: CalendarEvent }) {
  return (
    <tr className="upcoming-event-row">
      <td className="upcoming-event-when">{formatEventDate(event.start)}</td>
      <td className="upcoming-event-summary">
        {event.summary}
        {event.location && (
          <div className="upcoming-event-location">{event.location}</div>
        )}
      </td>
    </tr>
  );
}
