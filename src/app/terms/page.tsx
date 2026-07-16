"use client";

import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
import "./terms.css";

const LAST_UPDATED = "June 1, 2025";

export default function TermsPage() {
  return (
    <>
      <NavBar activePage="legal" largeAvatar />

      <div className="terms-page">
        <div className="terms-header">
          <p className="terms-eyebrow">Legal</p>
          <h1>Terms of Use</h1>
          <p className="terms-updated">Effective date: {LAST_UPDATED}</p>
        </div>

        <div className="terms-body">
          <section className="terms-section">
            <p>
              Welcome to the Good Luck Island Collective, and Website which is
              owned and operated by Sovran Wealth Academy, LLC (SWA, LLC).
              These Terms of Use, and Conditions (&ldquo;Terms&rdquo;) govern your use of
              our Services and Content for the Good Luck Island Collective,
              Community, and its related website(s).
            </p>
            <p>
              By becoming a member and accessing or using our Services and
              Content, you agree to be bound by these Terms. If you do not
              agree with these Terms, please do not check this box or
              continue the process to become a member or use our services or
              attempt to access our content.
            </p>
            <p>
              All Content is protected by United States and international
              copyright. SWA, LLC DBA Good Luck Island Collective, reserves
              all rights that aren&apos;t explicitly given to you under this
              agreement. That includes all copyright and intellectual
              property rights.
            </p>
          </section>

          <section className="terms-section">
            <h2>1. Grant of Right</h2>
            <p>
              SWA, LLC DBA Good Luck Island Collective, hereby grants to
              Islander Member upon the terms and subject to the conditions
              set forth in this Agreement, a limited, non-transferable,
              non-exclusive, non-sublicensable license to access and use the
              Services and Content solely for personal use. The term of the
              license shall be the Term (as defined below) of this Agreement.
              Islander Members shall not rent, sell, assign, lease,
              sublicense, or otherwise transfer or encumber the Services or
              Content.
            </p>
            <h3>Proprietary Rights</h3>
            <p>
              Islander Members acknowledges that all Services and Content are
              protected by intellectual property rights, as applicable, of
              SWA, LLC, its affiliates, and its vendors/licensors. Islander
              Member has no rights to transfer or prepare any derivative
              works that competes with the SWA, LLC proprietary products,
              processes and intellectual property with respect to the
              retirement coaching industry, or disclose Confidential
              Information pertaining to any of the Services or Content of the
              program.
            </p>
            <p>
              Under no circumstances shall Islander Members be deemed to
              receive title to any portion of any Services or Content, title
              to which at all times shall vest exclusively, as applicable,
              with SWA, LLC.
            </p>
            <p>
              Islander Members shall not permit any alterations or
              modifications to any Content for any purpose outside of their
              personal business use and shall not remove any proprietary
              notices (e.g., copyright and trademark notices) from the
              Content.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Terms and Termination</h2>
            <p>
              The terms of use and conditions agreement remains in effect
              until terminated. The Term for any access to the Services or
              Content starts on the date the Islander member registers for
              the program.
            </p>
            <h3>Termination for Cause</h3>
            <p>
              SWA, LLC may terminate this Agreement and/or remove any access
              to Services and Content if Islander Member/students breaches
              any of its material obligations in the Agreement.
            </p>
            <h3>Effect of Termination</h3>
            <p>
              Upon termination, Islander Members will immediately discontinue
              all access and use of the Services and Content.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Fees and Payment</h2>
            <p>
              In consideration of the access to the Content and Services,
              Student / Coach are required to pay the current tuition fee to
              access full course material. Additionally, Student / Coach
              shall pay an annual renewal fee to continue to access and use
              Services and Content. All amounts payable hereunder by Student
              / Coach shall be payable in United States funds.
            </p>
            <h3>Authorized Users</h3>
            <p>
              &ldquo;Authorized Users&rdquo; are registered Islander Members who have
              agreed to the terms of use at least once to gain access to our
              materials. This agreement over the use of our materials is
              permanent regardless of whether the member has cancelled their
              subscription to the islander membership or whether they have
              paid the past, present, or future membership fees.
            </p>
            <h3>Authorized Uses</h3>
            <p>
              Islander Members / Student Users may access and use the
              Content for the following purposes:
            </p>
            <h3>Copying &amp; Printing</h3>
            <p>
              Islander Members, Student Users may download, digitally copy,
              and print reports of their own assessments and backpack content
              for their personal use.
            </p>
            <h3>No Commercial Uses</h3>
            <p>
              Other than as specifically permitted for the use in their
              personal relationships with professionals, Islander Members or
              students of our educational materials shall not assign any
              commercial uses of the content.
            </p>
            <h3>Unauthorized Use</h3>
            <p>
              The Islander member or Student, shall not knowingly permit
              anyone other than themselves to access and use the Content. The
              Islander Member/Student could be held liable for any
              unauthorized uses or distribution of Content. Should Islander
              Member be hacked or lose access by theft or breach of username
              and password credentials, they must notify SWA, LLC as soon as
              possible at{" "}
              <a href="mailto:Info@goodluckislandcollective.com">
                Info@goodluckislandcollective.com
              </a>
              .
            </p>
            <h3>Withdrawal of Licensed Materials</h3>
            <p>
              RP reserves the right at any time to withdraw from the Content
              any item or part of an item for which it no longer retains the
              right to publish, or which it has reasonable grounds to
              believe infringes copyright or is defamatory, unlawful or
              otherwise objectionable.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Violations and Infringements</h2>
            <p>
              SWA, LLC will keep track of your membership account to make
              sure you&apos;re not breaking this grant, use of content, or any of
              our Terms. This might include monitoring downloads and
              exports, retaining details of password resets and/or abuse of
              your username and password. If we suspect or have evidence of
              an aforementioned issue, we may suspend or terminate your
              account without notice.
            </p>
            <p>
              SWA, LLC can terminate your access to the Services and Content
              without advance notice if you fail to comply with any of its
              terms. If that happens, you must immediately cease using the
              Content for any purpose; destroy or delete all copies and
              archives of the Content or accompanying materials; forfeit all
              fees paid; and if requested, confirm to SWA, LLC in writing
              that you have complied with these requirements.
            </p>
            <p>
              SWA, LLC shall have the right, in its sole discretion, to
              prosecute lawsuits against anyone for infringement of Content
              rights. Islander/Members and Students of educational content
              agree to fully cooperate with SWA, LLC in the prosecution of
              any such suit.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Confidentiality</h2>
            <p>
              &ldquo;Confidential Information&rdquo; shall mean, with respect to a party
              hereto, all information or material that: gives or could give
              that party some competitive business advantage or the
              opportunity of obtaining such advantage or the disclosure of
              which could be detrimental to the interests of that party;
              which from all the relevant circumstances should reasonably be
              assumed to be confidential and proprietary; or which
              constitutes personally identifiable, non-public customer or
              client information.
            </p>
            <p>
              Confidential Information includes, but is not limited to, the
              Services and all Content within the courses and website.
              Neither party shall have any obligation with respect to
              confidential information which: is or becomes generally known
              to the public by any means other than a breach of the
              obligations of the receiving party; was previously known to
              the receiving party as evidenced by written records kept in the
              ordinary course of business of or proof of actual use by the
              receiving party; is rightly received by the receiving party
              from a third party without breach of any duty of
              confidentiality; or is independently developed by the
              receiving party without reference or access to Confidential
              Information.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Representations and Warranties</h2>
            <p>
              The Website and Content is provided strictly on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis. Use of the Content and Service is at
              Islander members&apos; or Students&apos; own risk. To the maximum extent
              permitted by applicable law, SWA, LLC expressly disclaims all
              conditions, representations, and warranties — whether
              expressed, implied, statutory or otherwise, including, but not
              limited to, any implied warranty of merchantability, fitness
              for a particular purpose, or non-infringement of third-party
              rights. No advice or information, whether oral or written,
              obtained by user from owner or through the Service will create
              any warranty not expressly stated herein.
            </p>
            <p>
              Without limiting the foregoing, SWA, LLC, its subsidiaries,
              affiliates, licensors, officers, directors, agents,
              co-branders, partners, suppliers and employees do not warrant
              that the content is accurate, reliable or correct; that the
              Service will meet Users&apos; requirements; that the Service will
              be available at any particular time or location, uninterrupted
              or secure; that any defects or errors will be corrected; or
              that the Service is free of viruses or other harmful
              components. Any content downloaded or otherwise obtained
              through the use of the Educational Content, Service or user
              facing Content is downloaded at users&apos; own risk and users
              shall be solely responsible for any damage to Users&apos; computer
              system or mobile device or loss of data that results from such
              download or Users&apos; use of the Service.
            </p>
            <p>
              SWA, LLC does not warrant, endorse, guarantee, or assume
              responsibility for any product or service advertised or
              offered by a third party through the Service or any
              hyperlinked website or service, and the Owner shall not be a
              party to or in any way monitor any transaction between Users
              and third-party providers of products or services. The Service
              may become inaccessible or it may not function properly with
              Users&apos; web browser, mobile device, and/or operating system.
              SWA, LLC cannot be held liable for any perceived or actual
              damages arising from content, operation, or use of this
              material.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Indemnification</h2>
            <p>
              Islander/Member or Students, shall indemnify and hold harmless
              SWA, LLC and any of its owners, employees, and affiliate
              members for any losses, claims, damages, awards, penalties, or
              injuries they incur (including, without limitation, reasonable
              attorney&apos;s fees) which arise from any third party claim that
              alleges contract breach, copyright infringement, or other
              intellectual property infringement arising from SWA, LLC or an
              Authorized User&apos;s use of or access to the Licensed Materials
              in accordance with the provisions of these Terms and the
              applicable Purchase Order(s) and Schedule(s). Additionally,
              Islander Member agrees that no liability limitation that may
              appear elsewhere in these Terms or any Purchase Order or
              Schedule applies to, overrides, or cancels this
              indemnification. This indemnity shall survive the termination
              of these Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Governing Law and Dispute Resolution</h2>
            <p>
              All disputes hereunder shall be resolved in the applicable
              state or federal courts of North Carolina. The parties consent
              to the jurisdiction of such courts, agree to accept service of
              process by mail, and waive any jurisdictional or venue defenses
              otherwise available. Islander/Members are solely responsible
              for making sure that their use of this Website and/or the
              Service violates no applicable law, regulations or third-party
              rights.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Notices</h2>
            <p>
              All notices given pursuant to these Terms shall be in writing
              and may be hand delivered, sent by recognized ground/air
              courier service, sent via registered or certified mail (return
              receipt requested), or sent by email (with confirmation of
              receipt). A notice delivered by hand delivery or sent by
              recognized ground/air courier service shall be deemed to have
              been received upon receipt as indicated on the date on the
              signed receipt. A notice sent by email shall be deemed to have
              been received on the date such email is sent electronically
              and the sender has received return confirmation either by
              email reply or by email client function, provided that a copy
              of such notice is sent on the same day as the date of the
              email transmission by one of the other methods specified
              above. A notice sent by registered or certified mail shall be
              deemed to have been received five (5) days after mailing if
              sent by registered or certified mail, return receipt
              requested. Either party may from time to time change its
              notice address by written notice to the other party.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Force Majeure</h2>
            <p>
              Neither party shall be liable for any failure or delay in
              performance under this Agreement which is due to any event
              beyond the reasonable control of such party, including without
              limitation, fire, explosion, unavailability of utilities or raw
              materials, Internet delays and failures, telecommunications
              failures, unavailability of components, labor difficulties,
              war, riot, act of God, export control regulation, laws,
              judgments or government instructions.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Amendment</h2>
            <p>
              SWA, LLC may amend this Agreement, including but not limited to
              the exhibits, at any time upon 30 days&apos; written notice to
              Islander (community member/student), except to the extent any
              amendment is required by Applicable Law to become effective at
              an earlier time. Islanders&apos; (community member/student)
              continued use of the Services and Content following any such
              amendment will evidence agreement to the amendment.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Severability</h2>
            <p>
              If any of the provisions of this Agreement are found or deemed
              by a court to be invalid or unenforceable, they shall be
              severable from the remainder of this Agreement and shall not
              cause the invalidity or unenforceability of the remainder of
              this Agreement.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Waiver</h2>
            <p>
              No waiver by either party of any default shall be deemed as a
              waiver of any prior or subsequent default of the same or other
              provisions of this Agreement.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Use of Program Name, Its Content Marks and Parent Company</h2>
            <p>
              Islander member/recognizes the great value, prestige, and
              goodwill associated with the name &ldquo;Good Luck Island Collective,&rdquo;
              &ldquo;7SHieLD, 1QRC, PinWhirl Lifestyle Assessment,&rdquo; and &ldquo;Sovran Wealth
              Academy,&rdquo; and any logo pertaining thereto. Islander
              member/participant also shall not knowingly harm, misuse, or
              bring into disrepute the name or logo of the program name and
              parent company, and agrees further to assist SWA, LLC, as it
              may reasonably request, in preserving all rights, integrity,
              and dignity associated with its name.
            </p>
          </section>

          <section className="terms-section">
            <h2>15. Third-Party Links</h2>
            <p>
              Our Services may contain links to third-party websites. We are
              not responsible for the content or practices of those sites
              and encourage you to read their terms and privacy policies.
            </p>
          </section>

          <section className="terms-section">
            <h2>16. Survival</h2>
            <p>
              The following Sections shall survive termination or expiration
              of this Agreement: Indemnification, Confidentiality, Use of
              Program Name, Violations and Infringements, and Terms and
              Termination.
            </p>
          </section>

          <section className="terms-section">
            <h2>17. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <p>
              Good Luck Island Collective is the DBA (Doing Business As) name
              of Sovran Wealth Academy, AKA SWA, LLC
              <br />
              Headquarters: 12007 McBride Drive, Raleigh, NC 27613
              <br />
              919-812-8200
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
