import { describe, expect, it } from "vitest";
import { formatEventDate, getUpcomingEvents, parseIcs } from "./ical";

const SAMPLE_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//kabukiman//horaro//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:VikingTV test
BEGIN:VEVENT
DTSTART:20160220T150000Z
DTEND:20160220T153000Z
DTSTAMP:20260407T181149Z
UID:vikingtv_test_315bcv50xk54od4878@horaro.org
SUMMARY:Past event
CLASS:PUBLIC
END:VEVENT
BEGIN:VEVENT
DTSTART:20990601T180000Z
UID:future-1@horaro.org
SUMMARY:Far future event
LOCATION:Main Hall
END:VEVENT
BEGIN:VEVENT
DTSTART:20990301T120000Z
UID:future-2@horaro.org
SUMMARY:Nearer future event
END:VEVENT
BEGIN:VEVENT
DTSTART:20990401T120000Z
UID:future-3@horaro.org
SUMMARY:Middle future event
END:VEVENT
BEGIN:VEVENT
DTSTART:20990501T120000Z
UID:future-4@horaro.org
SUMMARY:Fourth future event
END:VEVENT
END:VCALENDAR
`;

describe("parseIcs", () => {
  it("extracts every VEVENT with uid, summary, and ISO start", () => {
    const events = parseIcs(SAMPLE_ICS);
    expect(events).toHaveLength(5);
    expect(events[0]).toEqual({
      uid: "vikingtv_test_315bcv50xk54od4878@horaro.org",
      summary: "Past event",
      start: "2016-02-20T15:00:00.000Z",
      location: null,
    });
  });

  it("captures an optional LOCATION", () => {
    const events = parseIcs(SAMPLE_ICS);
    const withLocation = events.find((e) => e.uid === "future-1@horaro.org");
    expect(withLocation?.location).toBe("Main Hall");
  });

  it("returns an empty array for a calendar with no events", () => {
    expect(parseIcs("BEGIN:VCALENDAR\nEND:VCALENDAR")).toEqual([]);
  });

  it("ignores malformed input without throwing", () => {
    expect(parseIcs("not an ics file at all")).toEqual([]);
  });
});

describe("getUpcomingEvents", () => {
  it("filters out past events and sorts the rest chronologically", () => {
    const now = new Date("2099-01-01T00:00:00Z");
    const events = getUpcomingEvents(SAMPLE_ICS, 3, now);
    expect(events.map((e) => e.uid)).toEqual([
      "future-2@horaro.org",
      "future-3@horaro.org",
      "future-4@horaro.org",
    ]);
  });

  it("returns an empty array when every event is in the past", () => {
    const now = new Date("2100-01-01T00:00:00Z");
    expect(getUpcomingEvents(SAMPLE_ICS, 3, now)).toEqual([]);
  });

  it("respects the requested count", () => {
    const now = new Date("2099-01-01T00:00:00Z");
    expect(getUpcomingEvents(SAMPLE_ICS, 1, now)).toHaveLength(1);
  });
});

describe("formatEventDate", () => {
  it("formats an ISO string as a fixed-UTC date and time", () => {
    expect(formatEventDate("2016-02-20T15:00:00.000Z")).toBe(
      "Sat, Feb 20 · 3:00 PM UTC",
    );
  });
});
