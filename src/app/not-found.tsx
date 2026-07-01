import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <p className="notfound-eyebrow">404</p>
        <h1>Lost at Sea</h1>
        <p className="notfound-sub">
          This page doesn&apos;t exist — or it may have drifted off. The island
          is still here, though.
        </p>
        <Link href="/" className="notfound-btn">
          Back to Good Luck Island
        </Link>
      </div>
    </div>
  );
}
