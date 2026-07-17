import Link from "next/link";
import Icon from "../../components/Icon";
import { resolveInternalLinkHref, type StepLink } from "../../lib/stepLinksApi";

function isDownloadUrl(url: string): boolean {
  return /\.(pdf|docx?|xlsx?)$/i.test(url);
}

// Pinwirl and the One Question Challenge predate the generic assessment
// builder and are seeded as external links to their own standalone routes
// (see migrations/0018_seven_shield_step_links.sql) rather than internal
// assessment records -- their URL is the only stable way to recognize them
// as "take an assessment" links here, since internal_content_type is
// always nulled out for link_type='external' on save (StepLinkForm.tsx).
const LEGACY_ASSESSMENT_URLS = new Set(["/pinwirl", "/one-question-retirement-challenge"]);

function isAssessmentLink(link: StepLink): boolean {
  if (link.linkType === "internal") return link.internalContentType === "assessment";
  return link.externalUrl !== null && LEGACY_ASSESSMENT_URLS.has(link.externalUrl);
}

interface Props {
  link: StepLink;
  isComplete: boolean;
}

export default function StepLinkAction({ link, isComplete }: Props) {
  const label = isComplete && link.labelWhenComplete ? link.labelWhenComplete : link.label;
  // Assessment links read as plain links (matching the assigned-assessments
  // table's .backpack-assess-link), not the pill-shaped CTA buttons used for
  // non-assessment actions like "Explore Purpose"/"Refine Your Vision".
  const btnClass = isAssessmentLink(link)
    ? "backpack-assess-link"
    : isComplete && link.labelWhenComplete
      ? "btn-pillar-edit"
      : "btn-pillar-start";

  if (link.linkType === "internal") {
    return (
      <Link href={resolveInternalLinkHref(link)} className={btnClass}>
        {label}
      </Link>
    );
  }

  const url = link.externalUrl ?? "#";

  // Existing app routes (e.g. /pinwirl) are stored as relative external
  // URLs -- not backed by a content record, but still same-tab navigation.
  if (url.startsWith("/") && !isDownloadUrl(url)) {
    return (
      <Link href={url} className={btnClass}>
        {label}
      </Link>
    );
  }

  if (isDownloadUrl(url)) {
    return (
      <a className="oqc-pdf-link" href={url} download>
        <Icon name="download" size={13} />
        {label}
      </a>
    );
  }

  return (
    <a className={btnClass} href={url} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
