import { describe, expect, it } from "vitest";
import { isValidZip } from "./zip";

describe("isValidZip", () => {
  it("accepts a 5-digit ZIP", () => {
    expect(isValidZip("94103")).toBe(true);
  });

  it("rejects empty, null, and undefined", () => {
    expect(isValidZip("")).toBe(false);
    expect(isValidZip(null)).toBe(false);
    expect(isValidZip(undefined)).toBe(false);
  });

  it("rejects ZIPs that are too short or too long", () => {
    expect(isValidZip("9410")).toBe(false);
    expect(isValidZip("941035")).toBe(false);
  });

  it("rejects non-digit characters, including ZIP+4", () => {
    expect(isValidZip("9410a")).toBe(false);
    expect(isValidZip("94103-1234")).toBe(false);
  });
});
