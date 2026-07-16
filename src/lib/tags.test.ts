import { describe, expect, it } from "vitest";
import { resolveTagLabels, parseContentViewedTagIds } from "./tags";

describe("resolveTagLabels", () => {
  it("maps tag ids to their labels in order", () => {
    const labelMap = new Map([
      [1, "Retirement"],
      [2, "Health"],
      [3, "Longevity"],
    ]);
    expect(resolveTagLabels([3, 1], labelMap)).toEqual(["Longevity", "Retirement"]);
  });

  it("drops ids with no matching label (e.g. a deleted tag)", () => {
    const labelMap = new Map([[1, "Retirement"]]);
    expect(resolveTagLabels([1, 99], labelMap)).toEqual(["Retirement"]);
  });

  it("returns an empty array for no tag ids", () => {
    expect(resolveTagLabels([], new Map())).toEqual([]);
  });
});

describe("parseContentViewedTagIds", () => {
  it("extracts tag ids from a JSON properties blob", () => {
    expect(
      parseContentViewedTagIds(JSON.stringify({ contentType: "video", contentId: 1, tags: [3, 7] })),
    ).toEqual([3, 7]);
  });

  it("dedupes repeated tag ids", () => {
    expect(parseContentViewedTagIds(JSON.stringify({ tags: [3, 3, 7] }))).toEqual([3, 7]);
  });

  it("drops non-integer values (strings, floats, null)", () => {
    expect(parseContentViewedTagIds(JSON.stringify({ tags: ["3", 7.5, null, 9] }))).toEqual([9]);
  });

  it("returns an empty array when tags is missing or not an array", () => {
    expect(parseContentViewedTagIds(JSON.stringify({ contentType: "video" }))).toEqual([]);
    expect(parseContentViewedTagIds(JSON.stringify({ tags: "not-an-array" }))).toEqual([]);
  });

  it("returns an empty array for malformed JSON instead of throwing", () => {
    expect(parseContentViewedTagIds("not json")).toEqual([]);
    expect(parseContentViewedTagIds(undefined)).toEqual([]);
  });
});
