import Link from "next/link";

export default function BackpackDrawer({ description }: { description: string }) {
  return (
    <div className="backpack-drawer">
      {description && <p className="backpack-drawer-summary">{description}</p>}
      <a
        href="/one-question-challenge.pdf"
        download
        className="backpack-drawer-link"
      >
        Download the One Question Challenge whitepaper
      </a>
      <Link href="/one-question-retirement-challenge" className="btn-assignment-start">
        Start Assignment
      </Link>
    </div>
  );
}
