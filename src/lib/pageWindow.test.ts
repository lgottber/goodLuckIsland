import { describe, expect, it } from "vitest";
import { getPageWindow } from "./pageWindow";

describe("getPageWindow", () => {
  it("shows every page when there's no need to collapse", () => {
    expect(getPageWindow(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("collapses pages far from the current one behind a single ellipsis", () => {
    expect(getPageWindow(1, 10)).toEqual([1, 2, "…", 10]);
    expect(getPageWindow(10, 10)).toEqual([1, "…", 9, 10]);
  });

  it("keeps a window around the current page plus both edges", () => {
    expect(getPageWindow(5, 10)).toEqual([1, "…", 4, 5, 6, "…", 10]);
  });

  it("handles a single page", () => {
    expect(getPageWindow(1, 1)).toEqual([1]);
  });
});
