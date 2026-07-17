import Link from "next/link";
import Icon from "../../components/Icon";
import { resolveInternalLinkHref, type StepLink } from "../../lib/stepLinksApi";

function isDownloadUrl(url: string): boolean {
  return /\.(pdf|docx?|xlsx?)$/i.test(url);
}

interface Props {
  link: StepLink;
  isComplete: boolean;
}

export default function StepLinkAction({ link, isComplete }: Props) {
  const label = isComplete && link.labelWhenComplete ? link.labelWhenComplete : link.label;
  const btnClass = isComplete && link.labelWhenComplete ? "btn-pillar-edit" : "btn-pillar-start";

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
