export type QuestionType = "scale" | "narrative" | "radio" | "select" | "number" | "text";

export interface SurveyQuestion {
  id: string;
  section: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  scaleMin?: string;
  scaleMax?: string;
  hint?: string;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  // ── Demographics ──────────────────────────────────────────────────────────────
  {
    id: "d1", section: "Demographics", required: false, type: "radio",
    text: "Marital Status",
    options: ["Married", "Not Married with Significant Other", "Single"],
  },
  {
    id: "d2", section: "Demographics", required: false, type: "select",
    text: "Select your State",
    options: US_STATES,
  },
  {
    id: "d3", section: "Demographics", required: true, type: "number",
    text: "Enter your Age",
  },
  {
    id: "d4", section: "Demographics", required: true, type: "radio",
    text: "Are you...",
    options: ["Retired already", "Pre-Retired"],
  },
  {
    id: "d5", section: "Demographics", required: true, type: "number",
    text: "At what age did you retire or plan on retiring?",
  },
  {
    id: "d6", section: "Demographics", required: true, type: "number",
    text: 'What would you consider "NORMAL" retirement age? Or age when we are supposed to retire?',
  },
  {
    id: "d7", section: "Demographics", required: true, type: "radio",
    text: "Which of the following answers would most accurately describe how you came to the decision of your retirement date?",
    options: [
      "I just didn't want to work any longer",
      "I was let go from my employer and chose to retire",
      "Set a date arbitrarily (didn't want to work past 55)",
      "Set this date because it aligned with Social Security/Medicare",
      "Age my career/occupation allowed the guaranteed Pension/Benefits",
      "Health reasons lead to the decision or Immediate Health reasons required it",
      "Co-Decided with our Financial Advisor",
    ],
  },
  {
    id: "d8", section: "Demographics", required: false, type: "text",
    text: "Enter your mailing address if you'd like your Report mailed to you",
  },

  // ── Physical ─────────────────────────────────────────────────────────────────
  {
    id: "p1", section: "Physical", required: true, type: "scale",
    text: "How would you rate yourself getting regular exercise?",
    scaleMin: "Not so often", scaleMax: "I love it",
  },
  {
    id: "p2", section: "Physical", required: true, type: "scale",
    text: "How would you rate yourself to eating right and having a healthy diet?",
    scaleMin: "I struggle sometimes", scaleMax: "I'm all about it",
  },
  {
    id: "p3", section: "Physical", required: true, type: "scale",
    text: "How would you rate your intake drinking enough water daily?",
    scaleMin: "I could drink more", scaleMax: "I'm good",
  },
  {
    id: "p4", section: "Physical", required: true, type: "scale",
    text: "How would you rate your ability to get enough sleep nightly?",
    scaleMin: "I could do better", scaleMax: "I'm well rested",
  },
  {
    id: "p5", section: "Physical", required: true, type: "scale",
    text: "How good are you about getting regular check-ups or proactively addressing medical conditions with professionals (Drs./Health and Wellness)?",
    scaleMin: "I haven't done this as much as I should", scaleMax: "Very good",
  },
  {
    id: "p6", section: "Physical", required: true, type: "scale",
    text: "In general how would you rate your overall health?",
    scaleMin: "Not Great", scaleMax: "Best Health",
  },
  {
    id: "p7", section: "Physical", required: true, type: "narrative",
    text: "Why did you choose to rate your overall health with that number?",
  },
  {
    id: "p8", section: "Physical", required: true, type: "narrative",
    text: "What is your main concern or concerns when it comes to your physical health?",
  },
  {
    id: "p9", section: "Physical", required: true, type: "narrative",
    text: "What are your physical goals?",
  },

  // ── Emotional ────────────────────────────────────────────────────────────────
  {
    id: "e1", section: "Emotional", required: true, type: "scale",
    text: "How would you rate your ability to control your emotions when you are under stress or pressure?",
    scaleMin: "I could do better", scaleMax: "I stay strong",
  },
  {
    id: "e2", section: "Emotional", required: true, type: "scale",
    text: "How would you rate your ability to tap into and understand the emotions of others?",
    scaleMin: "I could do better", scaleMax: "I'm very aware of others' feelings",
  },
  {
    id: "e3", section: "Emotional", required: true, type: "scale",
    text: "How would you rate your ability to handle criticism from others?",
    scaleMin: "I'd like to do better", scaleMax: "I'm strong",
  },
  {
    id: "e4", section: "Emotional", required: true, type: "scale",
    text: "How open are you to listening and accepting views that differ from yours?",
    scaleMin: "I could do better", scaleMax: "I'm very open",
  },
  {
    id: "e5", section: "Emotional", required: true, type: "scale",
    text: "How would you rate yourself as an active listener?",
    scaleMin: "I have difficulty", scaleMax: "I'm a good listener",
  },
  {
    id: "e6", section: "Emotional", required: true, type: "scale",
    text: "How quickly do you apologize when you are wrong?",
    scaleMin: "I'm never wrong, apologizing is a sign of weakness", scaleMax: "Immediately",
  },
  {
    id: "e7", section: "Emotional", required: true, type: "narrative",
    text: "If there was a concern about your current emotional state or health, what would that be?",
  },
  {
    id: "e8", section: "Emotional", required: true, type: "narrative",
    text: "What would your emotional goals be?",
  },

  // ── Intellectual ─────────────────────────────────────────────────────────────
  {
    id: "i1", section: "Intellectual", required: true, type: "scale",
    text: "Do you believe that people, including yourself, can change?",
    scaleMin: "No, not really", scaleMax: "Yes indeed",
  },
  {
    id: "i2", section: "Intellectual", required: true, type: "scale",
    text: "Do you read non-fiction books that improve yourself professionally or personally?",
    scaleMin: "No I do not", scaleMax: "Yes I do",
  },
  {
    id: "i3", section: "Intellectual", required: true, type: "scale",
    text: "Are you someone who seeks out challenging tasks in life and will take a risk even if you may fail?",
    scaleMin: "No I do not", scaleMax: "Yes I do",
  },
  {
    id: "i4", section: "Intellectual", required: true, type: "scale",
    text: '"Achievements are accomplished by effort not talent." How much do you agree?',
    scaleMin: "Not much", scaleMax: "Yes, a lot",
  },
  {
    id: "i5", section: "Intellectual", required: true, type: "scale",
    text: "How would you rate yourself when it comes to learning from your mistakes?",
    scaleMin: "Low on the scale", scaleMax: "High on the scale",
  },
  {
    id: "i6", section: "Intellectual", required: true, type: "scale",
    text: "How strongly do you believe that intelligence and abilities can be developed in others?",
    scaleMin: "Not very strongly", scaleMax: "Very strongly",
  },
  {
    id: "i7", section: "Intellectual", required: true, type: "narrative",
    text: "Are you insatiably curious?",
  },
  {
    id: "i8", section: "Intellectual", required: true, type: "narrative",
    text: "Do you like to try new things?",
  },
  {
    id: "i9", section: "Intellectual", required: true, type: "narrative",
    text: "Do you feel like your family and friends are on the same level as you intellectually?",
  },
  {
    id: "i10", section: "Intellectual", required: true, type: "narrative",
    text: "Will it be a challenge for you to retire intellectually?",
  },
  {
    id: "i11", section: "Intellectual", required: true, type: "narrative",
    text: "What would you like to improve about your intellectual life?",
  },

  // ── Spiritual ────────────────────────────────────────────────────────────────
  {
    id: "sp1", section: "Spiritual", required: true, type: "scale",
    text: 'How strong is your belief in a "higher power"?',
    scaleMin: "Not very strong", scaleMax: "Very strong",
  },
  {
    id: "sp2", section: "Spiritual", required: true, type: "scale",
    text: "How much do you believe that prayer or meditation makes a difference in your life?",
    scaleMin: "Not very much", scaleMax: "A lot",
  },
  {
    id: "sp3", section: "Spiritual", required: true, type: "scale",
    text: "How important is having morals that one abides by?",
    scaleMin: "Not very important", scaleMax: "Very important",
  },
  {
    id: "sp4", section: "Spiritual", required: true, type: "scale",
    text: "How important is having faith and hope when it comes to the outcomes of life?",
    scaleMin: "Not so important", scaleMax: "Very important",
  },
  {
    id: "sp5", section: "Spiritual", required: true, type: "scale",
    text: "How important is it to you to belong to a spiritual or religious community?",
    scaleMin: "Not very important", scaleMax: "Very important",
  },
  {
    id: "sp6", section: "Spiritual", required: true, type: "scale",
    text: 'How regularly do you set aside time to engage in a "quiet time", "Devotional", Meditation, etc.?',
    scaleMin: "Not often enough", scaleMax: "Very often",
  },
  {
    id: "sp7", section: "Spiritual", required: true, type: "narrative",
    text: "From what or whom do you draw the strength to endure difficult situations or tough times?",
  },
  {
    id: "sp8", section: "Spiritual", required: true, type: "narrative",
    text: "What causes your greatest concern or stress?",
  },
  {
    id: "sp9", section: "Spiritual", required: true, type: "narrative",
    text: "How do you deal with regrets from your past?",
  },
  {
    id: "sp10", section: "Spiritual", required: true, type: "narrative",
    text: "What would you like to improve most about your spiritual life?",
  },

  // ── Social ───────────────────────────────────────────────────────────────────
  {
    id: "so1", section: "Social", required: true, type: "scale",
    text: "How would you evaluate the quality of your relationships with family (Spouse, Kids, Parents, Siblings)?",
    scaleMin: "Poor", scaleMax: "Very good",
  },
  {
    id: "so2", section: "Social", required: true, type: "scale",
    text: "Would you consider yourself a person who has more acquaintances or deep friendships?",
    scaleMin: "Mostly Acquaintances", scaleMax: "More Friends",
  },
  {
    id: "so3", section: "Social", required: true, type: "scale",
    text: "How would you say you do when it comes to the balance of your social life with other aspects of your life, such as work or personal time?",
    scaleMin: "Out of Balance", scaleMax: "Balanced",
  },
  {
    id: "so4", section: "Social", required: true, type: "scale",
    text: "How would you rate the depth of your friendships?",
    scaleMin: "No depth", scaleMax: "Very deep",
  },
  {
    id: "so5", section: "Social", required: true, type: "scale",
    text: "How satisfied are you with your social life?",
    scaleMin: "Not very much", scaleMax: "Very much so",
  },
  {
    id: "so6", section: "Social", required: true, type: "scale",
    text: "Would you rate your relationship with your family challenging or positive?",
    scaleMin: "Challenging", scaleMax: "Positive",
  },
  {
    id: "so7", section: "Social", required: true, type: "narrative",
    text: "What would you change about your social life to improve it?",
  },

  // ── Environmental ────────────────────────────────────────────────────────────
  {
    id: "en1", section: "Environmental", required: true, type: "scale",
    text: "How well does your environment reflect your personality and preferences?",
    scaleMin: "Not at all", scaleMax: "Truly reflects my personality and preferences",
  },
  {
    id: "en2", section: "Environmental", required: true, type: "scale",
    text: "How aligned is your environment to your lifestyle needs and goals?",
    scaleMin: "Not Aligned", scaleMax: "Aligned",
  },
  {
    id: "en3", section: "Environmental", required: true, type: "scale",
    text: "How connected do you feel to your community or neighborhood?",
    scaleMin: "Disconnected", scaleMax: "Very Connected",
  },
  {
    id: "en4", section: "Environmental", required: true, type: "scale",
    text: "How optimistic are you about the future of your living situation?",
    scaleMin: "Not optimistic", scaleMax: "Very optimistic",
  },
  {
    id: "en5", section: "Environmental", required: true, type: "scale",
    text: "How much do you enjoy the current place where you are living?",
    scaleMin: "I don't enjoy it", scaleMax: "I love where I live",
  },
  {
    id: "en6", section: "Environmental", required: true, type: "scale",
    text: "Do you feel that where you live is in ideal proximity to your family and closest friends?",
    scaleMin: "Not satisfied at all", scaleMax: "Very Satisfied",
  },
  {
    id: "en7", section: "Environmental", required: true, type: "narrative",
    text: "How would you describe your current living arrangements and how would you like to improve on them?",
    hint: "Example: bring friends closer, make home more accessible for the long haul, Kids/Parents/Move out",
  },
  {
    id: "en8", section: "Environmental", required: true, type: "narrative",
    text: "How satisfied are you with the cultural and recreational opportunities available in your community or area? What would you like to see or change about your community?",
  },

  // ── Purpose / Vision / Mission ───────────────────────────────────────────────
  {
    id: "pv1", section: "Purpose / Vision / Mission", required: true, type: "scale",
    text: "How authentically and clearly can you state your personal core values?",
    scaleMin: "I'm not real clear", scaleMax: "I can clearly state my values",
  },
  {
    id: "pv2", section: "Purpose / Vision / Mission", required: true, type: "scale",
    text: "How much do you feel that the work or activities that you do makes a positive impact on others?",
    scaleMin: "Not much", scaleMax: "A lot",
  },
  {
    id: "pv3", section: "Purpose / Vision / Mission", required: true, type: "scale",
    text: "How meaningful to you personally is the work and activities that you do?",
    scaleMin: "Not very much", scaleMax: "A lot",
  },
  {
    id: "pv4", section: "Purpose / Vision / Mission", required: true, type: "scale",
    text: "How excited are you to do what it is you do every day in your work or activities?",
    scaleMin: "Not very much", scaleMax: "A lot",
  },
  {
    id: "pv5", section: "Purpose / Vision / Mission", required: true, type: "scale",
    text: "In your current work and activities, how much of your Gifts, Talents, and Abilities are being used?",
    scaleMin: "I don't use much", scaleMax: "I fully use my gifting",
  },
  {
    id: "pv6", section: "Purpose / Vision / Mission", required: true, type: "scale",
    text: "How much do you feel like your work is contributing to a positive future?",
    scaleMin: "Not much", scaleMax: "A lot",
  },
  {
    id: "pv7", section: "Purpose / Vision / Mission", required: true, type: "narrative",
    text: "Do you believe you know what your purpose is? Yes or No. If so, how would you describe it?",
  },
  {
    id: "pv8", section: "Purpose / Vision / Mission", required: true, type: "narrative",
    text: "How do you think the work or activities that you do contributes to your purpose?",
  },
  {
    id: "pv9", section: "Purpose / Vision / Mission", required: true, type: "narrative",
    text: "If today you were standing in front of your family and community at the final awards ceremony of your life, what would you be most proud of that you accomplished or lived? What ambitions, goals or objectives left undone would you regret the most?",
  },

  // ── Financial ────────────────────────────────────────────────────────────────
  {
    id: "f1", section: "Financial", required: true, type: "scale",
    text: "How competent do you believe you are at making the right financial decisions for yourself and your family?",
    scaleMin: "Not good at all", scaleMax: "I'm excellent at making financial decisions",
  },
  {
    id: "f2", section: "Financial", required: true, type: "scale",
    text: "Right now, how close are you to living the financial lifestyle you desire?",
    scaleMin: "Not even close", scaleMax: "I'm on target",
  },
  {
    id: "f3", section: "Financial", required: true, type: "scale",
    text: "How confident are you that your savings is on track to retire?",
    scaleMin: "Not on track", scaleMax: "I'm on track",
  },
  {
    id: "f4", section: "Financial", required: true, type: "scale",
    text: "How budget conscious are you, i.e. living inside a budget?",
    scaleMin: "Not very good with a budget", scaleMax: "I stick to a budget",
  },
  {
    id: "f5", section: "Financial", required: true, type: "scale",
    text: "How well do you know and have access to your own financial information?",
    scaleMin: "It's a mess", scaleMax: "I can produce everything in a moment",
  },
  {
    id: "f6", section: "Financial", required: true, type: "scale",
    text: "How confident are you that you have all the financial pieces in place (e.g. will completed, estate plan, tax efficiency expert, trusts, Medicare insurance, legal, health care insurance)?",
    scaleMin: "Have none of this", scaleMax: "I have everything in place",
  },
  {
    id: "f7", section: "Financial", required: true, type: "narrative",
    text: "What mistakes do you think you made, or are still making, with your personal finances?",
  },
  {
    id: "f8", section: "Financial", required: true, type: "narrative",
    text: "What regrets do you have with your lifestyle choices?",
    hint: "Example: Not focused on health, purchased stuff that I thought I'd like but don't enjoy anymore",
  },
  {
    id: "f9", section: "Financial", required: true, type: "narrative",
    text: "Would you rather retire early with a reduced lifestyle spend or work longer to afford all the things you plan on owning/doing?",
  },
  {
    id: "f10", section: "Financial", required: true, type: "narrative",
    text: 'Are you an "own it" kind of person or a "borrow it" kind of person?',
  },
];
