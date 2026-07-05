import { describe, expect, it } from "vitest";
import { matchesDurationFilter, parseDurationMinutes } from "./durationFilter";

describe("parseDurationMinutes", () => {
  it("parses plain minutes", () => {
    expect(parseDurationMinutes("42 min")).toBe(42);
  });

  it("parses hours and minutes combined", () => {
    expect(parseDurationMinutes("1h 5 min")).toBe(65);
  });

  it("parses hours only", () => {
    expect(parseDurationMinutes("2h")).toBe(120);
  });

  it("returns 0 for null or unparseable input", () => {
    expect(parseDurationMinutes(null)).toBe(0);
    expect(parseDurationMinutes("")).toBe(0);
    expect(parseDurationMinutes("TBD")).toBe(0);
  });
});

describe("matchesDurationFilter", () => {
  it("matches everything for the 'all' filter", () => {
    expect(matchesDurationFilter("90 min", "all")).toBe(true);
    expect(matchesDurationFilter(null, "all")).toBe(true);
  });

  it("buckets short/medium/long at the 30 and 60 minute boundaries", () => {
    expect(matchesDurationFilter("29 min", "short")).toBe(true);
    expect(matchesDurationFilter("30 min", "short")).toBe(false);
    expect(matchesDurationFilter("30 min", "medium")).toBe(true);
    expect(matchesDurationFilter("60 min", "medium")).toBe(true);
    expect(matchesDurationFilter("61 min", "medium")).toBe(false);
    expect(matchesDurationFilter("61 min", "long")).toBe(true);
  });
});
