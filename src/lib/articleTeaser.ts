// Builds the logged-out preview of an article body: the entire first
// paragraph, plus up to the first sentence of the second paragraph (if any),
// followed by an ellipsis when there's more content beyond that. Used both
// to render the gated article page and to populate the og:description /
// twitter:description meta tags, so crawlers and logged-out visitors see
// exactly the same slice of the article.
//
// Deliberately dependency-free (no HTML parser) so it runs on the `edge`
// runtime: assumes `body` is sanitized HTML made of block-level `<p>` tags
// (Tiptap's StarterKit output, as sanitized by the admin's saveArticle),
// with only inline formatting inside them.

export interface ArticleTeaser {
  teaserHtml: string;
  teaserText: string;
  truncated: boolean;
}

const PARAGRAPH_RE = /<p[^>]*>([\s\S]*?)<\/p>/gi;

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function firstSentence(text: string): { sentence: string; hasMore: boolean } {
  const trimmed = text.trim();
  const match = trimmed.match(/^[\s\S]*?[.!?](?=\s|$)/);
  if (!match) return { sentence: trimmed, hasMore: false };
  const sentence = match[0].trim();
  return { sentence, hasMore: trimmed.length > sentence.length };
}

export function buildArticleTeaser(body: string | null | undefined): ArticleTeaser {
  const html = body ?? "";
  const paragraphs: { full: string; inner: string; end: number }[] = [];
  let match: RegExpExecArray | null;
  PARAGRAPH_RE.lastIndex = 0;
  while ((match = PARAGRAPH_RE.exec(html)) !== null) {
    paragraphs.push({ full: match[0], inner: match[1], end: match.index + match[0].length });
  }

  if (paragraphs.length === 0) {
    const plain = decodeEntities(stripTags(html)).trim();
    // With no paragraph structure, treat the whole thing as one paragraph --
    // take the full text (not just one sentence), since there's no "second
    // paragraph" concept to invoke sentence-level truncation, and nothing is
    // being withheld.
    return {
      teaserHtml: plain ? `<p>${escapeHtml(plain)}</p>` : "",
      teaserText: plain,
      truncated: false,
    };
  }

  const firstParagraphFull = paragraphs[0].full;
  const firstParagraphPlain = decodeEntities(stripTags(paragraphs[0].inner)).trim();

  if (paragraphs.length === 1) {
    const remainder = html.slice(paragraphs[0].end).trim();
    const truncated = remainder.length > 0;
    return {
      teaserHtml: truncated ? `${firstParagraphFull}<p>…</p>` : firstParagraphFull,
      teaserText: truncated ? `${firstParagraphPlain}…` : firstParagraphPlain,
      truncated,
    };
  }

  const secondParagraphPlain = decodeEntities(stripTags(paragraphs[1].inner)).trim();
  const { sentence, hasMore } = firstSentence(secondParagraphPlain);
  const truncated = hasMore || paragraphs.length > 2;
  const secondParagraphTeaser = `<p>${escapeHtml(sentence)}${truncated ? "…" : ""}</p>`;

  return {
    teaserHtml: `${firstParagraphFull}${secondParagraphTeaser}`,
    teaserText: `${firstParagraphPlain} ${sentence}${truncated ? "…" : ""}`.trim(),
    truncated,
  };
}
