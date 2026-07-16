export interface CalEvent {
  summary: string;
  start: Date;
  end: Date | null;
  url: string | null;
  location: string | null;
}

// iCal lines can be folded — continuation lines start with a space or tab.
function unfold(raw: string): string {
  return raw.replace(/\r?\n[ \t]/g, "");
}

function parseICalDate(value: string): Date | null {
  // UTC date-time: 20240101T120000Z
  const mUtc = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (mUtc) {
    return new Date(
      Date.UTC(+mUtc[1], +mUtc[2] - 1, +mUtc[3], +mUtc[4], +mUtc[5], +mUtc[6]),
    );
  }
  // Local date-time (no timezone): 20240101T120000
  const mLocal = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
  if (mLocal) {
    return new Date(
      +mLocal[1],
      +mLocal[2] - 1,
      +mLocal[3],
      +mLocal[4],
      +mLocal[5],
      +mLocal[6],
    );
  }
  // All-day date: 20240101
  const mDate = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (mDate) {
    return new Date(+mDate[1], +mDate[2] - 1, +mDate[3]);
  }
  return null;
}

function unescapeICalText(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

export function parseICalEvents(icalText: string): CalEvent[] {
  const lines = unfold(icalText).split(/\r?\n/);
  const events: CalEvent[] = [];

  let inEvent = false;
  let props: Record<string, string> = {};

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      props = {};
    } else if (line === "END:VEVENT") {
      inEvent = false;
      const summary = props["SUMMARY"];
      const dtstart = props["DTSTART"];
      if (!summary || !dtstart) continue;

      const start = parseICalDate(dtstart);
      if (!start) continue;

      events.push({
        summary: unescapeICalText(summary),
        start,
        end: props["DTEND"] ? parseICalDate(props["DTEND"]) : null,
        url: props["URL"] ? unescapeICalText(props["URL"]) : null,
        location: props["LOCATION"] ? unescapeICalText(props["LOCATION"]) : null,
      });
    } else if (inEvent) {
      const colonIdx = line.indexOf(":");
      if (colonIdx < 0) continue;
      // Property name may include parameters (e.g. DTSTART;TZID=...) — strip them.
      const propName = line.slice(0, colonIdx).split(";")[0].toUpperCase();
      const propVal = line.slice(colonIdx + 1);
      props[propName] = propVal;
    }
  }

  return events;
}

export function getUpcomingEvents(events: CalEvent[], now: Date, count = 3): CalEvent[] {
  return events
    .filter((e) => e.start >= now || (e.end !== null && e.end >= now))
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, count);
}
