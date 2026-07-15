import { describe, expect, it } from "vitest";
import { buildArticleTeaser } from "./articleTeaser";

describe("buildArticleTeaser", () => {
  it("returns an empty teaser for null, undefined, or empty body", () => {
    expect(buildArticleTeaser(null)).toEqual({ teaserHtml: "", teaserText: "", truncated: false });
    expect(buildArticleTeaser(undefined)).toEqual({ teaserHtml: "", teaserText: "", truncated: false });
    expect(buildArticleTeaser("")).toEqual({ teaserHtml: "", teaserText: "", truncated: false });
  });

  it("treats bodies with no <p> tags as one untruncated paragraph", () => {
    const result = buildArticleTeaser("Just plain text, no markup.");
    expect(result).toEqual({
      teaserHtml: "<p>Just plain text, no markup.</p>",
      teaserText: "Just plain text, no markup.",
      truncated: false,
    });
  });

  it("returns a single short paragraph unchanged when there's no remainder", () => {
    const body = "<p>Only one paragraph here.</p>";
    const result = buildArticleTeaser(body);
    expect(result).toEqual({
      teaserHtml: "<p>Only one paragraph here.</p>",
      teaserText: "Only one paragraph here.",
      truncated: false,
    });
  });

  it("truncates a single paragraph when there's unwrapped trailing content after it", () => {
    const body = "<p>Only one paragraph here.</p>More stuff outside a tag.";
    const result = buildArticleTeaser(body);
    expect(result.teaserHtml).toBe("<p>Only one paragraph here.</p><p>…</p>");
    expect(result.teaserText).toBe("Only one paragraph here.…");
    expect(result.truncated).toBe(true);
  });

  it("does not truncate exactly two paragraphs when the second is a single short sentence", () => {
    const body = "<p>First paragraph.</p><p>Second one.</p>";
    const result = buildArticleTeaser(body);
    expect(result.teaserHtml).toBe("<p>First paragraph.</p><p>Second one.</p>");
    expect(result.teaserText).toBe("First paragraph. Second one.");
    expect(result.truncated).toBe(false);
  });

  it("truncates to the first sentence when the second paragraph has more than one sentence", () => {
    const body = "<p>First paragraph.</p><p>First sentence. Second sentence.</p>";
    const result = buildArticleTeaser(body);
    expect(result.teaserHtml).toBe("<p>First paragraph.</p><p>First sentence.…</p>");
    expect(result.teaserText).toBe("First paragraph. First sentence.…");
    expect(result.truncated).toBe(true);
  });

  it("truncates when there's a third paragraph, even if the second paragraph is a single sentence", () => {
    const body = "<p>First.</p><p>Second.</p><p>Third.</p>";
    const result = buildArticleTeaser(body);
    expect(result.teaserHtml).toBe("<p>First.</p><p>Second.…</p>");
    expect(result.truncated).toBe(true);
  });

  it("decodes HTML entities in plain text and re-escapes them in generated markup", () => {
    const body = "<p>Tom &amp; Jerry said &quot;hi&quot;.</p><p>More &lt;stuff&gt; here now.</p>";
    const result = buildArticleTeaser(body);
    expect(result.teaserText).toContain('Tom & Jerry said "hi".');
    expect(result.teaserHtml).toContain("More &lt;stuff&gt; here");
  });

  it("strips inline tags from paragraph text used in teaserText", () => {
    const body = "<p>Some <strong>bold</strong> and <em>italic</em> text.</p>";
    const result = buildArticleTeaser(body);
    expect(result.teaserText).toBe("Some bold and italic text.");
    expect(result.teaserHtml).toBe(body);
  });
});
