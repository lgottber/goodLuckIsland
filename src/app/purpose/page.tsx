"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import "./purpose.css";

export default function PurposePage() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || !user) return null;

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />

      <div className="purpose-page">
        <div className="purpose-content">

          <p className="purpose-eyebrow">Chapter 4 — The Why Behind the What</p>
          <h1>Finding Your Purpose</h1>

          {/* Section 1 */}
          <div className="purpose-section">
            <h2>Do You Know Your Purpose?</h2>
            <p>
              Most people spend decades building careers, raising families, and
              chasing goals — yet when retirement arrives and the structure falls
              away, a startling number find themselves asking: <em>What now?</em>{" "}
              Purpose doesn&apos;t retire when you do. In fact, it may matter
              more now than ever before.
            </p>
          </div>

          {/* Section 2 */}
          <div className="purpose-section">
            <h2>Why is Purpose Important?</h2>

            <div className="purpose-stats">
              <div className="purpose-stat-card">
                <div className="purpose-stat-number">91%</div>
                <div className="purpose-stat-label">
                  of people surveyed reported experiencing &ldquo;purpose anxiety&rdquo; at some point in their life
                </div>
                <div className="purpose-stat-source">— Researcher Larissa Rainey</div>
              </div>
              <div className="purpose-stat-card">
                <div className="purpose-stat-number">31%</div>
                <div className="purpose-stat-label">
                  of people retired less than five years said they have struggled to find a sense of purpose
                </div>
                <div className="purpose-stat-source">— Age Wave &amp; Edward Jones (2022)</div>
              </div>
              <div className="purpose-stat-card">
                <div className="purpose-stat-number">25%</div>
                <div className="purpose-stat-label">
                  empty-nest divorce rate today, up from 10% — often driven by lost purpose and unaddressed problems
                </div>
                <div className="purpose-stat-source">— University of Louisville at Kentucky</div>
              </div>
            </div>

            <p>
              Without purpose there is no rudder on the boat — no direction.
              It&apos;s like starting a business without a business plan, or going
              on a mission handed a wad of cash with no objective. You lack goals.
              Life has less meaning. And when meaning fades, we tend to fill the
              void with things that don&apos;t serve us: eating more, drinking
              more, lavish spending — paths that too often lead to a depressive
              state of mind.
            </p>

            <p>
              <strong>When you have purpose, everything changes:</strong>
            </p>

            <div className="purpose-benefits">
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">🧭</div>
                <div>
                  <div className="purpose-benefit-title">You know who you are and how to live</div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">🎯</div>
                <div>
                  <div className="purpose-benefit-title">Your life becomes more goal-directed</div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">⭐</div>
                <div>
                  <div className="purpose-benefit-title">You live up to your values</div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">😊</div>
                <div>
                  <div className="purpose-benefit-title">Your life has greater enjoyment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="purpose-section">
            <h2>What is Purpose?</h2>

            <p>
              Psychology defines purpose roughly as &ldquo;doing something
              meaningful that makes a positive impact on the world.&rdquo; While
              this is a good definition, it misses a greater point: it focuses on{" "}
              <em>doing</em>, not on <em>being</em>. The fact is, we are not human
              doings — we are human beings. It only makes sense that your purpose
              comes from who you are, not necessarily what you do.
            </p>

            <p>
              There are two types of purpose — one with a capital &ldquo;P&rdquo;
              and one with a small &ldquo;p.&rdquo; Understanding the distinction
              is especially important as we transition into retirement.
            </p>

            <div className="purpose-types">
              <div className="purpose-type-card">
                <div className="purpose-type-label">Capital &ldquo;P&rdquo;</div>
                <div className="purpose-type-title">Purpose — Who You Are</div>
                <div className="purpose-type-body">
                  The core of your being. Something that resonates deep within,
                  aligns with your core values, and is the overriding mission of
                  why you&apos;re here. It is relatively stable and can be
                  expressed through many different activities.
                </div>
              </div>
              <div className="purpose-type-card">
                <div className="purpose-type-label">Small &ldquo;p&rdquo;</div>
                <div className="purpose-type-title">purpose — What You Do</div>
                <div className="purpose-type-body">
                  Finding meaning in your work or activities. It can look like a
                  career or hobby that brings contentment. It is often not stable
                  — it can fluctuate as life changes. We can find this kind of
                  purpose in many different things.
                </div>
              </div>
            </div>

            <p>
              This distinction is critical. When we retire from work, which may
              have given us small &ldquo;p&rdquo; purpose, we can mistakenly
              feel we&apos;ve lost all Purpose. Nothing could be further from the
              truth. Your capital &ldquo;P&rdquo; Purpose stays with you for
              life — only your expression of it may change.
            </p>

            <blockquote className="purpose-blockquote">
              <p>
                Ultimately, the question to ask yourself is: <em>What is your impact?</em>
              </p>
            </blockquote>
          </div>

          {/* Section 4 */}
          <div className="purpose-section">
            <h2>Why Purpose Matters in Your Financial Plan</h2>

            <p>
              Retirement is like a new marriage — after the honeymoon, the real
              work starts. It also becomes important at this stage to understand
              the purpose of your spouse. When two people in retirement are rowing
              in different directions, the boat goes in circles. Knowing each
              other&apos;s purpose helps you row together.
            </p>

            <p>
              Research is clear: a strong sense of purpose in retirement benefits
              every dimension of life.
            </p>

            <div className="purpose-benefits">
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">🧠</div>
                <div>
                  <div className="purpose-benefit-title">Mental &amp; Emotional Health</div>
                  <div className="purpose-benefit-body">
                    Retirees with purpose feel more content and less likely to
                    experience depression, anxiety, or a loss of identity after
                    leaving the workforce.
                  </div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">💪</div>
                <div>
                  <div className="purpose-benefit-title">Physical Health</div>
                  <div className="purpose-benefit-body">
                    Purpose is linked to better physical function, reduced
                    mobility decline, lower risk of brain tissue damage, and
                    better sleep quality.
                  </div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">⏳</div>
                <div>
                  <div className="purpose-benefit-title">Longevity</div>
                  <div className="purpose-benefit-body">
                    Having a sense of purpose is associated with increased life
                    expectancy and decreased mortality from all causes.
                  </div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">🤝</div>
                <div>
                  <div className="purpose-benefit-title">Community &amp; Social Engagement</div>
                  <div className="purpose-benefit-body">
                    Purpose encourages staying socially active through
                    volunteering, mentoring, and family connection — enriching
                    both the individual and the wider community.
                  </div>
                </div>
              </div>
              <div className="purpose-benefit-item">
                <div className="purpose-benefit-icon">🌱</div>
                <div>
                  <div className="purpose-benefit-title">Personal Growth &amp; Fulfillment</div>
                  <div className="purpose-benefit-body">
                    Retirement is an opportunity to rediscover passions, learn
                    new skills, and explore interests that may have been neglected
                    during your working years.
                  </div>
                </div>
              </div>
            </div>

            <p>
              In summary, a sense of purpose in retirement is vital for
              maintaining mental, emotional, and physical health; fostering social
              connections; and ensuring a longer, more satisfying life.
            </p>
          </div>

          {/* Section 5 */}
          <div className="purpose-section">
            <h2>How Do We Find Purpose?</h2>

            <p>
              It starts with a fundamental question: <strong>Who are you?</strong>{" "}
              What do you believe? What are your core values?
            </p>

            <p>
              Without clear core values, it&apos;s hard to know what your purpose
              is aligned with. Core values act as a compass — they keep you in
              alignment across every area of your life and help you make sound
              decisions when the road ahead is uncertain.
            </p>

            <p>
              Once you have a handle on your values, try <strong>The 3A Method</strong>{" "}
              to begin mapping your purpose:
            </p>

            <div className="purpose-three-a">
              <div className="purpose-a-card">
                <div className="purpose-a-badge">A1</div>
                <div>
                  <div className="purpose-a-name">Affinity</div>
                  <div className="purpose-a-body">
                    What are your interests and passions? What activities make
                    time disappear? What topics do you read about just for the
                    joy of it?
                  </div>
                </div>
              </div>
              <div className="purpose-a-card">
                <div className="purpose-a-badge">A2</div>
                <div>
                  <div className="purpose-a-name">Aptitude</div>
                  <div className="purpose-a-body">
                    What are your natural gifts, talents, and abilities? What
                    comes easily to you that others find difficult?
                  </div>
                </div>
              </div>
              <div className="purpose-a-card">
                <div className="purpose-a-badge">A3</div>
                <div>
                  <div className="purpose-a-name">Affirmation</div>
                  <div className="purpose-a-body">
                    Looking back at your entire life history, what have other
                    people consistently said you were good at? Look for themes,
                    not specifics. Is there an intersection between all three
                    A&apos;s where a thread runs through them?
                  </div>
                </div>
              </div>
            </div>

            <div className="purpose-note">
              <strong>A note on themes</strong>
              Look for the intersection of all three A&apos;s. A theme that runs
              consistently through your Affinity, Aptitude, and Affirmation is
              often a powerful signal pointing toward your Purpose.
            </div>
          </div>

          {/* Closing */}
          <div className="purpose-closing">
            <div className="purpose-closing-headline">Now Experiment</div>
            <p>
              Chances are you found more than one thing that lights you up.
              You now have the time to try different things and discover which
              one truly feels in alignment. It&apos;s completely okay — even
              wonderful — to have more than one purpose.
            </p>
            <br />
            <p>
              <strong>Above all: Have fun with it.</strong>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
