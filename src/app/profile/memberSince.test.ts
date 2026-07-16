import { describe, expect, it } from "vitest";
import { formatMemberSince } from "./memberSince";

describe("formatMemberSince", () => {
  it("returns empty string for null or invalid input", () => {
    expect(formatMemberSince(null)).toBe("");
    expect(formatMemberSince(undefined)).toBe("");
    expect(formatMemberSince("not-a-date")).toBe("");
  });

  it("reports joining today", () => {
    const now = new Date("2026-07-16T12:00:00Z");
    expect(formatMemberSince("2026-07-16T09:00:00Z", now)).toBe("July 16, 2026 · joined today");
  });

  it("reports a few days for a recent join", () => {
    const now = new Date("2026-07-16T12:00:00Z");
    expect(formatMemberSince("2026-07-13T09:00:00Z", now)).toBe("July 13, 2026 · 3 days");
  });

  it("reports years and months for a long-tenured member", () => {
    const now = new Date("2026-07-16T12:00:00Z");
    expect(formatMemberSince("2024-01-03T09:00:00Z", now)).toBe("January 3, 2024 · 2 years, 6 months");
  });

  it("borrows correctly across a month boundary", () => {
    const now = new Date("2026-03-01T12:00:00Z");
    // Joined Jan 31 -> as of Mar 1, that's 1 month (Jan 31 to Feb 28) + 1 day, not 1 month 1 day naively.
    expect(formatMemberSince("2026-01-31T09:00:00Z", now)).toBe("January 31, 2026 · 1 month");
  });
});
