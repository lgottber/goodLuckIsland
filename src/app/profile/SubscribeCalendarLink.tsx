import Icon from "./Icon";

export default function SubscribeCalendarLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="upcoming-events-subscribe"
    >
      <Icon name="link" size={14} />
      Subscribe to the calendar
    </a>
  );
}
