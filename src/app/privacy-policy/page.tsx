"use client";

import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import "./privacy-policy.css";

const LAST_UPDATED = "June 1, 2025";

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavBar activePage="legal" largeAvatar />

      <div className="privacy-page">
        <div className="privacy-header">
          <p className="privacy-eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="privacy-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="privacy-body">
          <section className="privacy-section">
            <h2>1. Who We Are</h2>
            <p>
              Good Luck Island Collective (&ldquo;GLIC,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) is operated by Sovran Wealth Academy, LLC and operates
              the platform at goodluckislandcollective.com. We are a self-help
              education platform focused on helping Gen X professionals
              prepare for retirement through reflection, assessment, and
              community.
            </p>
            <p>
              If you have questions about this policy, contact us at{" "}
              <a href="mailto:hello@goodluckislandcollective.com">
                hello@goodluckislandcollective.com
              </a>
              .
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. What Information We Collect</h2>
            <h3>Information you provide directly</h3>
            <ul>
              <li>Account registration details (name, email address, password — stored via Auth0)</li>
              <li>Profile information (bio, location, occupation, interests, and other optional fields you choose to fill in)</li>
              <li>Assessment answers from the Wayfinder Assessment and One Question Retirement Challenge</li>
              <li>Journal entries you write within the 7SHieLD process</li>
              <li>Messages you send us via the contact form</li>
            </ul>
            <h3>Information collected automatically</h3>
            <ul>
              <li>Page views and content engagement (which articles and episodes you read or watch)</li>
              <li>Login timestamps and last activity date</li>
              <li>Device and browser type (for analytics purposes)</li>
            </ul>
            <h3>Information from third parties</h3>
            <ul>
              <li>If you purchase a book via our Shopify store, Shopify processes that transaction and shares order information with us</li>
              <li>Authentication is handled by Auth0; they process your login credentials on our behalf</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To provide and personalize your experience on the platform</li>
              <li>To save your progress through the 7SHieLD process and assessments</li>
              <li>To send you emails you&apos;ve opted into (newsletters, content updates, assessment reports)</li>
              <li>To improve the platform based on how members use it</li>
              <li>To respond to your messages and support requests</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We do not
              use your data for targeted advertising. We do not share your
              assessment answers or journal entries with anyone outside of GLIC.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. Data Storage and Security</h2>
            <p>
              Your data is stored in Supabase (a PostgreSQL-based cloud database)
              hosted on infrastructure in the United States. Data is encrypted at
              rest and in transit. Authentication credentials are managed by
              Auth0, which maintains SOC 2 Type II compliance.
            </p>
            <p>
              We apply row-level security policies to ensure that you can only
              access your own data. Administrative access to the database is
              restricted to authorized GLIC personnel only.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                <strong>Access your data</strong> — use the &ldquo;Export My Data&rdquo; button
                on your profile page to download a CSV of your profile information
              </li>
              <li>
                <strong>Correct your data</strong> — edit your profile at any time
                from the profile page
              </li>
              <li>
                <strong>Delete your account</strong> — use the Delete Account option
                in your profile Account Settings, or email us at{" "}
                <a href="mailto:hello@goodluckislandcollective.com">
                  hello@goodluckislandcollective.com
                </a>
              </li>
              <li>
                <strong>Opt out of emails</strong> — use the unsubscribe link in any
                email we send, or toggle off email notifications in your account
                settings
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>6. Cookies</h2>
            <p>
              We use cookies and browser local storage to maintain your login
              session and to remember your preferences (such as content view
              settings). We do not use third-party advertising cookies. Analytics
              may use first-party cookies to track page views.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Third-Party Services</h2>
            <p>We use the following third-party services, each of which has its own privacy policy:</p>
            <ul>
              <li><strong>Auth0</strong> — authentication and session management</li>
              <li><strong>Supabase</strong> — database and file storage</li>
              <li><strong>Shopify</strong> — book sales and payment processing</li>
              <li><strong>YouTube</strong> — podcast and video hosting</li>
              <li><strong>Cloudflare</strong> — hosting and content delivery</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              This platform is intended for adults aged 18 and over. We do not
              knowingly collect personal information from children under 13. If
              you believe a child has provided us with personal information,
              please contact us immediately.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we
              will update the &ldquo;Last updated&rdquo; date at the top of this page. For
              significant changes, we will notify members by email.
            </p>
          </section>

          <div className="privacy-footer-links">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/legal">Back to Legal</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
