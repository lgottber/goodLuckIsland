"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import "./refining-your-retirement.css";
import RefiningIllustration from "./RefiningIllustrations";

export default function RefiningYourRetirementPage() {
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

      <div className="refining-page">
        <div className="refining-content">

          <p className="refining-eyebrow">Step 6 Part 1</p>
          <h1>Refining Your Lifestyle Vision</h1>
          <p className="refining-subhead">
            <em>So that you can actually use it.</em>
          </p>

          <div className="refining-section">
            <h2>Bringing It Down From the Pie in the Sky</h2>
            <p>
              Now that we have done our homework of becoming aware,
              deepening our perspective, and re-evaluating our values and
              beliefs — and have an untested hypothesis on our purpose in
              the world — it&apos;s best we organize a bit and put it all
              together. We&apos;re going to use everything we&apos;ve been
              working on to fix this.
            </p>
          </div>

          <div className="refining-section">
            <h2>First — Revisit Your One Question Challenge Answer</h2>
            <RefiningIllustration id="one-question-worksheet" />
            <p>
              Let&apos;s go back and take a look at your One Question
              Challenge answer for a minute. Can you see the vagueness in the
              response you shared with a financial professional? It&apos;s
              good that you brought up these typical planning goals, but
              it&apos;s not everything — as you&apos;ve already learned.
              Before we move ahead, let&apos;s translate these financial
              goals into something an advisor can actually use to help you.
            </p>
            <p>
              Use the Financial Priorities and Goals Sheet below to clarify
              your retirement&apos;s financial priorities before we move on.
              Notice how many of these common financial goals can be
              translated from your original hangman answers.
            </p>
            <div className="refining-resource-card">
              <RefiningIllustration id="financial-priorities" showCaption={false} />
              <div>
                <div className="refining-resource-label">Worksheet</div>
                <div className="refining-resource-title">
                  Financial Priorities and Goals Sheet
                </div>
              </div>
            </div>
          </div>

          <div className="refining-section">
            <h2>Second — Update Your Wayfinder Report</h2>
            <p>
              Bust out your Wayfinder Tool assessment and fill in the report
              below. Enter your newly created goals based on your strengths
              and weaknesses scores — there should be some obvious new goals
              to improve your overall lifestyle to work on.
            </p>
            <div className="refining-resource-card">
              <RefiningIllustration id="wayfinder-report" showCaption={false} />
              <div>
                <div className="refining-resource-label">Report</div>
                <div className="refining-resource-title">
                  Wayfinder Report Page
                </div>
              </div>
            </div>
            <p>
              As for the mission and purpose listed last, let&apos;s erase it
              for this part and create a new sheet: hypothesize your
              affinity, aptitude, and affirmation, then hypothesize on your
              purpose. What is my purpose hypothesis?
            </p>
            <RefiningIllustration id="affinity-aptitude-affirmation" />
            <p>Let&apos;s create a new sheet to be used:</p>
            <ol className="refining-checklist">
              <li>Jot down your <strong>Affinity</strong> — what you like to do.</li>
              <li>Jot down your <strong>Aptitude</strong> — what you&apos;re good at.</li>
              <li>Jot down your <strong>Affirmation</strong> — what others say you&apos;re good at.</li>
              <li>
                Think about what types of things in your world need help but
                have no one to assist — or a problem that needs to be solved
                with a solution.
              </li>
              <li>What are some potential purpose activity hypotheses?</li>
            </ol>
          </div>

          <div className="refining-section refining-section--divider">
            <p className="refining-eyebrow">Step 6 Part 2</p>
            <h2>The Trial and Learn Phase</h2>
            <RefiningIllustration id="rollercoaster" />
            <p>
              Part 2 is part of the journey that takes time and a commitment
              to your own success. I call it the Trial and Learn Phase. Why
              do I use a rollercoaster as part of our theme for this part?
              Because it&apos;s a heck of a ride to manage the efforts,
              activity, and trials for purpose activity. Many mistakes can
              be made where what you thought was the right activity for your
              fulfillment wasn&apos;t. Generally, when our theories are
              proven wrong, this can derail your momentum and sidetrack your
              enthusiasm. Knowing your purpose and having a hypothesis on
              your purpose-aligning activity to live and be this person is
              not as straightforward as people think. It&apos;s important to
              see your purpose as a constant, but with many activity-based
              ways to live it.
            </p>
            <p>
              Living your purpose over and above all circumstances takes
              work, creativity, and a realization that you&apos;re on a
              journey that will have highs, lows, stops, pitfalls, trials,
              and tribulations along the way. You have to practice awareness
              that all things change and must build a skill to constantly
              adapt to succeed over time.
            </p>
            <p>
              What will your trials be? This time will be filled with
              effort. Just make sure you are learning along the way.
              Thinking about them openly with others can help — but
              don&apos;t rely on it.
            </p>
          </div>

          <div className="refining-closing">
            <RefiningIllustration id="trophy" />
            <div className="refining-closing-headline">Congratulations</div>
            <p>
              You have completed the Sovran Wealth Academy&apos;s Seven Step
              Holistic Lifestyle Discovery process.
            </p>
            <p>
              <strong>But hey — what the heck… that was only 6 steps???</strong>
            </p>
            <p>
              You have taken the time to learn and discover exactly what you
              need to know to transition into your next life with
              everything I have to give. The seventh step is optional but
              offers anyone a real chance to fortify what they&apos;ve
              learned on this journey — that everyone is diverse and unique
              and faced with a set of circumstances and predicaments, and all
              will have to go it alone and do different things to reach
              their own versions of purpose and success in life.
            </p>
          </div>

          <div className="refining-section">
            <RefiningIllustration id="message-in-bottle" />
            <p>
              If you give it your all and would like to share your story or
              your journey, I believe that leaving a message in a bottle for
              all those others who are out there, all alone, stuck on{" "}
              <em>The Island of Retirement Thought</em>, is exactly what you
              would have been happy to hear when you started this journey.
            </p>
            <p>
              Giving back and sharing stories of your experiences is a true
              way to prove that where you are is where you are supposed to
              be.
            </p>
          </div>

          <div className="refining-closing refining-closing--journey">
            <p className="refining-eyebrow">Step 7</p>
            <div className="refining-closing-headline">The Journey…</div>
            <p>
              This is where the big stories come from — the trials and
              tribulations of how you live your purpose, from hypothesis to
              challenges, to adaptation, and ultimately fulfillment. The ups
              and downs of your experience are knowledge, and sharing what
              you have learned is the final part of this process.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
