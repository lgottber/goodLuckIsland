import type { CalendarEvent } from "../../lib/ical";
import SubscribeCalendarLink from "./SubscribeCalendarLink";
import UpcomingEventsTable from "./UpcomingEventsTable";

export default function UpcomingEventsSection({
  events,
  subscribeUrl,
}: {
  events: CalendarEvent[];
  subscribeUrl: string | null;
}) {
  return (
    <div className="profile-card profile-card--events">
      <h3>Upcoming Events</h3>
      {events.length > 0 ? (
        <UpcomingEventsTable events={events} />
      ) : (
        <p className="upcoming-events-empty">
          No upcoming events right now — check back soon.
        </p>
      )}
      {subscribeUrl && <SubscribeCalendarLink url={subscribeUrl} />}
    </div>
  );
}
