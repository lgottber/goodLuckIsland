"use client";

import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import LegalCard from "./LegalCard";
import "./legal.css";

const LEGAL_SECTIONS = [
  {
    href: "/privacy-policy",
    icon: "lock" as const,
    title: "Privacy Policy",
    description:
      "How we collect, use, and protect your personal information. What data we store, who has access to it, and how you can export or delete it.",
    updated: "June 2026",
  },
  {
    href: "/terms",
    icon: "file" as const,
    title: "Terms of Service",
    description:
      "The rules of the island. Your rights and responsibilities as a member, our content policies, and the terms that govern your use of this platform.",
    updated: "June 2026",
  },
];

export default function LegalPage() {
  return (
    <>
      <NavBar activePage="legal" largeAvatar />

      <div className="legal-page">
        <div className="legal-header">
          <p className="legal-eyebrow">Legal</p>
          <h1>Legal &amp; Policies</h1>
          <p className="legal-subtext">
            We believe in being transparent about how this platform works and
            what you agree to when you join. These documents are written to be
            readable — not buried in legalese.
          </p>
        </div>

        <div className="legal-cards">
          {LEGAL_SECTIONS.map((section) => (
            <LegalCard
              key={section.href}
              href={section.href}
              icon={section.icon}
              title={section.title}
              description={section.description}
              updated={section.updated}
            />
          ))}
        </div>

        <div className="legal-contact-note">
          <p>
            Questions about our policies?{" "}
            <Link href="/contact" className="legal-contact-link">
              Contact us
            </Link>{" "}
            and we&apos;ll respond within 2 business days.
          </p>
        </div>
      </div>
    </>
  );
}
