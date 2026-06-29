export default function PinwirlIntro({
  username,
  onStart,
}: {
  username: string | undefined;
  onStart: () => void;
}) {
  return (
    <div className="pinwirl-intro">
      <h1>Congratulations {username}!!!</h1>
      <p>You&apos;re on your way...</p>
      <p>
        The Pinwirl Tool is the second part of our Mission Lifestyle&apos;s
        7-Step Holistic Lifestyle Discovery Process.
      </p>
      <p>
        I built this assessment to help address the concerning reality that
        many retirees cannot accurately describe their true lifestyle goals
        when asked to share them in a professional environment. Our study
        &ldquo;The One Question Retirement Challenge&rdquo; provided
        evidence that many people have a high correlation to the same
        obvious goals, such as never running out of money and travel
        ambitions. These common goals that I call &ldquo;The Hangman
        Answers&rdquo; continue to rob people of the opportunity to create
        a financial plan that goes deeper and reflects the entire lifestyle
        required to be complete as unique human beings VS. math problems.
        This tool can serve as a starting point and help you identify your
        own lifestyle strengths and weaknesses to build perspective and
        craft more intentional lifestyle goals, priorities and actions for
        personal growth. We want to help you bring all these goals to the
        surface so that you can then include them in your financial plan.
        We have learned that even the slightest change to your lifestyle
        goals can have a big effect on your final financial plan.
      </p>
      <blockquote className="pinwirl-blockquote">
        <p>
          &ldquo;Look, it&apos;s great to know where you want to be in
          life, but its impossible to navigate there if you don&apos;t know
          where your starting from, no matter how good the map is.&rdquo;
        </p>
        <footer>Nick LiVecchi CFP, CRPC, CPRC — Founder of Mission Lifestyle</footer>
      </blockquote>
      <p>
        This step (II Perspective) begins by finding out where you
        currently are. With the Pinwirl Tool we asked you a few
        questions that look into each aspect of your current
        lifestyle&apos;s foundational pillars. This report is designed to
        help give you an overview (measured by a score) of your overall
        strengths and weaknesses in each of the 8 healthy lifestyle
        categories with comments and encouragement on how to possibly look
        at this. With each section we hope you can use this perspective to
        establish new goals, prioritize activity and make a plan for each
        so you gain a deeper level of balance in your lifestyle and be
        better prepared when asked this question by your financial
        Advisors. We suggest you jot down your goals and plans for
        improving in each category and what that will do for your life
        once you achieve it. You can share these goals with your future
        Right Fit Financial Advisors (where appropriate) so they can help
        you to track progress and apply financial planning processes to
        help you achieve these qualitative goals.
      </p>
      <p>
        Its important to realize that your retirement is a balance of each
        of these lifestyle pillars all working together to support you on
        your journey. Like the old saying goes &ldquo;money isn&apos;t
        everything&rdquo; — no one pillar&apos;s strength alone is enough
        to make your lifestyle complete. Also its important to share that
        having a vast weakness in any one of these pillars can have a
        significant effect on your life. To visualize, we format the
        pillars as a wheel of your life rolling over the highway of your
        lifetime. When compared to a perfect wheel, versus a bent one, its
        easy to see how being weaker in one or several areas of your
        lifestyle can make your journey a bumpy one. It may even cut your
        journey short without attention and action. Also knowing that your
        timeline is uncertain can help motivate your change activity.
      </p>
      <p>
        I suggest you keep this assessment and its contents for reflection
        on your journey to track improvements to your personal growth and
        lifestyle balance.
      </p>
      <div className="pinwirl-start-wrap">
        <button
          type="button"
          className="pinwirl-start-btn"
          onClick={onStart}
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
}
