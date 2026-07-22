export type CalendarEvent = {
  uid: string;
  summary: string;
  start: string; // ISO 8601, always UTC
  location: string | null;
};

type IcsLine = { name: string; params: Record<string, string>; value: string };

// RFC 5545 line folding: a line that starts with a space or tab is a
// continuation of the previous line, with the leading whitespace removed.
function unfoldLines(text: string): string[] {
  const rawLines = text.replace(/\r\n/g, "\n").split("\n");
  const unfolded: string[] = [];
  for (const line of rawLines) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && unfolded.length > 0) {
      unfolded[unfolded.length - 1] += line.slice(1);
    } else if (line.length > 0) {
      unfolded.push(line);
    }
  }
  return unfolded;
}

function parseIcsLine(line: string): IcsLine {
  const colonIdx = line.indexOf(":");
  const head = colonIdx === -1 ? line : line.slice(0, colonIdx);
  const value = colonIdx === -1 ? "" : line.slice(colonIdx + 1);
  const [name, ...paramParts] = head.split(";");
  const params: Record<string, string> = {};
  for (const part of paramParts) {
    const [key, val] = part.split("=");
    if (key && val) params[key] = val;
  }
  return { name: name.toUpperCase(), params, value };
}

function unescapeText(value: string): string {
  return value
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

// Parses DTSTART-style date/date-time values (basic form, no RRULE support).
function parseIcsDate(value: string, params: Record<string, string>): Date | null {
  const isDateOnly = params.VALUE === "DATE" || /^\d{8}$/.test(value);
  const datePart = value.slice(0, 8);
  if (!/^\d{8}$/.test(datePart)) return null;
  const year = Number(datePart.slice(0, 4));
  const month = Number(datePart.slice(4, 6));
  const day = Number(datePart.slice(6, 8));

  if (isDateOnly) return new Date(Date.UTC(year, month - 1, day));

  const timePart = value.slice(9);
  const hour = Number(timePart.slice(0, 2)) || 0;
  const minute = Number(timePart.slice(2, 4)) || 0;
  const second = Number(timePart.slice(4, 6)) || 0;
  // Floating (no "Z", no TZID) times are treated as UTC -- there's no
  // reliable IANA zone to resolve TZID against without a tzdata table.
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

export function parseIcs(text: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let current: { uid?: string; summary?: string; start?: string; location?: string } | null = null;

  for (const rawLine of unfoldLines(text)) {
    const { name, params, value } = parseIcsLine(rawLine);

    if (name === "BEGIN" && value === "VEVENT") {
      current = {};
      continue;
    }
    if (name === "END" && value === "VEVENT") {
      if (current?.uid && current.summary && current.start) {
        events.push({
          uid: current.uid,
          summary: current.summary,
          start: current.start,
          location: current.location ?? null,
        });
      }
      current = null;
      continue;
    }
    if (!current) continue;

    if (name === "UID") current.uid = value;
    else if (name === "SUMMARY") current.summary = unescapeText(value);
    else if (name === "LOCATION") current.location = unescapeText(value);
    else if (name === "DTSTART") {
      const date = parseIcsDate(value, params);
      if (date) current.start = date.toISOString();
    }
  }

  return events;
}

export function getUpcomingEvents(
  text: string,
  count: number,
  now: Date = new Date(),
): CalendarEvent[] {
  return parseIcs(text)
    .filter((event) => new Date(event.start).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, count);
}

const EVENT_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
  month: "short",
  day: "numeric",
});

const EVENT_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

// Formatted in fixed UTC rather than the viewer's local timezone -- this
// site is a fully static export, so the text baked in at build time must
// match exactly what a client-side re-render would produce, regardless of
// the build machine's or the visitor's local timezone.
export function formatEventDate(iso: string): string {
  const date = new Date(iso);
  return `${EVENT_DATE_FORMAT.format(date)} · ${EVENT_TIME_FORMAT.format(date)}`;
}
