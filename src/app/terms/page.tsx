"use client";

import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import "./terms.css";

const LAST_UPDATED = "June 29, 2026";

export default function TermsPage() {
  return (
    <>
      <NavBar activePage="legal" largeAvatar />

      <div className="terms-page">
        <div className="terms-header">
          <p className="terms-eyebrow">Legal</p>
          <h1>Terms of Service</h1>
          <p className="terms-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="terms-body">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By creating an account and using Good Luck Island Collective
              (&ldquo;GLIC,&rdquo; &ldquo;the platform,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), you agree to be bound by
              these Terms of Service. If you do not agree, please do not use the
              platform.
            </p>
            <p>
              These terms apply to all users of the platform, including guests
              browsing public content and registered members.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              Good Luck Island Collective is a self-help education platform that
              provides content, assessments, tools, and community resources to
              help Gen X professionals prepare for retirement. We are not a
              licensed financial advisor, therapist, or healthcare provider.
              Nothing on this platform constitutes financial, legal, medical, or
              psychological advice.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Accounts and Membership</h2>
            <ul>
              <li>You must be 18 years or older to create an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You may not share your account with others or create accounts on behalf of others</li>
              <li>You agree to provide accurate information when creating your profile</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Community Standards</h2>
            <p>
              Good Luck Island Collective is a respectful space. By using the
              platform, you agree not to:
            </p>
            <ul>
              <li>Use ethnic slurs, hate speech, or language that demeans other members</li>
              <li>Engage in political or religious attacks targeting other members</li>
              <li>Harass, bully, or intimidate other members</li>
              <li>Post spam, unsolicited promotions, or misleading content</li>
              <li>Attempt to access other members&apos; private data</li>
              <li>Use the platform for any illegal purpose</li>
            </ul>
            <p>
              Violations of these standards may result in immediate account
              suspension or permanent removal from the platform. No refunds will
              be issued for terminated accounts.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Content and Intellectual Property</h2>
            <p>
              All content on the platform — including articles, podcast episodes,
              assessment tools, course materials, and the 7SHieLD process — is
              owned by Good Luck Island Collective and protected by copyright. You
              may not reproduce, distribute, or create derivative works from our
              content without written permission.
            </p>
            <p>
              Content you create on the platform (journal entries, assessment
              responses, profile information) remains yours. By submitting it,
              you grant GLIC a limited license to store and display it to you
              within the platform.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Purchases and Payments</h2>
            <p>
              Book purchases are processed through Shopify and are subject to
              Shopify&apos;s terms of service in addition to ours. All sales are final
              unless the product is defective. For questions about your order,
              contact us at{" "}
              <a href="mailto:hello@goodluckislandcollective.com">
                hello@goodluckislandcollective.com
              </a>
              .
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Disclaimers and Limitation of Liability</h2>
            <p>
              The platform is provided &ldquo;as is&rdquo; without warranties of any kind. We
              do not guarantee that the platform will be error-free or
              uninterrupted. We are not liable for any direct, indirect, or
              consequential damages arising from your use of the platform.
            </p>
            <p>
              The assessments and tools provided (including the Wayfinder
              Assessment and 7SHieLD process) are for educational and reflective
              purposes only. They do not constitute professional advice of any
              kind.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued
              use of the platform after changes are posted constitutes acceptance
              of the revised terms. We will notify members of significant changes
              by email.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a href="mailto:hello@goodluckislandcollective.com">
                hello@goodluckislandcollective.com
              </a>{" "}
              or through our{" "}
              <Link href="/contact">Contact page</Link>.
            </p>
          </section>

          <div className="terms-footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/legal">Back to Legal</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
