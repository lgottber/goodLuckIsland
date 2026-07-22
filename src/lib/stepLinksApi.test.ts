import { describe, expect, it } from "vitest";
import { resolveInternalLinkHref } from "./stepLinksApi";
import type { StepLink } from "./stepLinksApi";

function link(overrides: Partial<StepLink>): StepLink {
  return {
    id: "1",
    linkType: "internal",
    externalUrl: null,
    internalContentType: null,
    internalContentId: "42",
    label: "Label",
    labelWhenComplete: null,
    ...overrides,
  };
}

describe("resolveInternalLinkHref", () => {
  it("resolves an assessment to /assessment/:id", () => {
    expect(resolveInternalLinkHref(link({ internalContentType: "assessment", internalContentId: "abc" }))).toBe(
      "/assessment/abc",
    );
  });

  it("resolves a video to /articles/videos/:id", () => {
    expect(resolveInternalLinkHref(link({ internalContentType: "video", internalContentId: "7" }))).toBe(
      "/articles/videos/7",
    );
  });

  it("resolves an episode to /articles/podcast/:id", () => {
    expect(resolveInternalLinkHref(link({ internalContentType: "episode", internalContentId: "9" }))).toBe(
      "/articles/podcast/9",
    );
  });

  it("resolves a playlist to the podcasts hub, since there's no per-playlist route", () => {
    expect(resolveInternalLinkHref(link({ internalContentType: "playlist" }))).toBe("/articles");
  });

  it("falls back to # when content type is missing", () => {
    expect(resolveInternalLinkHref(link({ internalContentType: null }))).toBe("#");
  });
});
