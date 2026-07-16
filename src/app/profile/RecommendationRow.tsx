import Link from "next/link";
import type { RecommendedItem } from "../../lib/recommendationsApi";

const CONTENT_TYPE_LABELS: Record<RecommendedItem["contentType"], string> = {
  article: "Post",
  episode: "Podcast",
  video: "Video",
};

interface Props {
  item: RecommendedItem;
}

export default function RecommendationRow({ item }: Props) {
  return (
    <li className="assess-row">
      <span className="assess-step">{CONTENT_TYPE_LABELS[item.contentType]}</span>
      <span className="assess-title">{item.title}</span>
      <Link href={item.href} className="assess-action">
        View →
      </Link>
    </li>
  );
}
