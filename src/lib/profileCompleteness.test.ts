import { describe, expect, it } from "vitest";
import { isProfileComplete } from "./profileCompleteness";

describe("isProfileComplete", () => {
  it("is false for null or undefined profiles", () => {
    expect(isProfileComplete(null)).toBe(false);
    expect(isProfileComplete(undefined)).toBe(false);
  });

  it("is true when all four fields are present", () => {
    expect(
      isProfileComplete({ first_name: "Ada", last_name: "Lovelace", age: 36, zip_code: "94103" }),
    ).toBe(true);
  });

  it("is false when any single field is missing", () => {
    expect(
      isProfileComplete({ first_name: "", last_name: "Lovelace", age: 36, zip_code: "94103" }),
    ).toBe(false);
    expect(
      isProfileComplete({ first_name: "Ada", last_name: null, age: 36, zip_code: "94103" }),
    ).toBe(false);
    expect(
      isProfileComplete({ first_name: "Ada", last_name: "Lovelace", age: null, zip_code: "94103" }),
    ).toBe(false);
    expect(
      isProfileComplete({ first_name: "Ada", last_name: "Lovelace", age: 36, zip_code: "" }),
    ).toBe(false);
  });

  it("is false when age is 0 (falsy but a real value)", () => {
    expect(
      isProfileComplete({ first_name: "Ada", last_name: "Lovelace", age: 0, zip_code: "94103" }),
    ).toBe(false);
  });
});
