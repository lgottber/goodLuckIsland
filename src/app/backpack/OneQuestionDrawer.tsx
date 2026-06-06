import Link from "next/link";
import Icon from "../../components/Icon";

export default function OneQuestionDrawer() {
  return (
    <div className="oqc-drawer">
      <p className="oqc-summary">
        Most retirement plans stall on the same surface-level goals — security,
        travel, comfort — what we call the Hangman Answers. This challenge helps
        you move past those defaults and into the deeper lifestyle vision that
        makes your plan truly yours.
      </p>
      <a
        className="oqc-pdf-link"
        href="/one-question-challenge-whitepaper.pdf"
        download="one-question-challenge-whitepaper.pdf"
      >
        <Icon name="download" size={13} />
        One Question Challenge Whitepaper
      </a>
      <Link href="/one-question-retirement-challenge" className="btn-oqc-start">
        Start Assignment
      </Link>
    </div>
  );
}
