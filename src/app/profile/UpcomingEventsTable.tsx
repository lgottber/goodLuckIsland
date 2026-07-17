import type { CalendarEvent } from "../../lib/ical";
import UpcomingEventRow from "./UpcomingEventRow";

export default function UpcomingEventsTable({ events }: { events: CalendarEvent[] }) {
  return (
    <table className="upcoming-events-table">
      <tbody>
        {events.map((event) => (
          <UpcomingEventRow key={event.uid} event={event} />
        ))}
      </tbody>
    </table>
  );
}
