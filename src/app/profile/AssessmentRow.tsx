import Link from "next/link";

interface Props {
  title: string;
  href: string;
  step: string;
  completed: boolean;
}

export default function AssessmentRow({ title, href, step, completed }: Props) {
  return (
    <li className="assess-row">
      {completed
        ? <span className="assess-check">✓</span>
        : <span className="assess-step">{step}</span>}
      <span className="assess-title">{title}</span>
      <Link
        href={href}
        className={completed ? "assess-action assess-action--review" : "assess-action"}
      >
        {completed ? "Review" : "Start Now →"}
      </Link>
    </li>
  );
}
