export type ArchetypeId =
  | "navigator"
  | "explorer"
  | "lighthouse"
  | "wave-rider"
  | "captain"
  | "beachcomber";

export type QuizAnswer = {
  text: string;
  scores: Partial<Record<ArchetypeId, number>>;
};

export type QuizQuestion = {
  id: number;
  scene: string;
  image: string;
  question: string;
  answers: QuizAnswer[];
};

export type Archetype = {
  id: ArchetypeId;
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  color: string;
  bg: string;
};

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  navigator: {
    id: "navigator",
    name: "The Navigator",
    tagline: "You chart your course. Others follow your map.",
    description:
      "You approach life with clarity and intention. You're the one with a plan, a backup plan, and the research to back both up. In financial matters you're disciplined, in relationships you're reliable, and in every chapter of life you're already thinking three moves ahead. You don't leave things to chance — you build the conditions for the outcome you want.",
    traits: [
      "Strategic & methodical",
      "Research-driven",
      "Financially disciplined",
      "Self-reliant",
      "Detail-oriented",
    ],
    color: "#1e4d6b",
    bg: "#e8f4f8",
  },
  explorer: {
    id: "explorer",
    name: "The Explorer",
    tagline: "You don't find the path. You make it.",
    description:
      "You live for discovery — new places, new ideas, new experiences. You believe the best chapter is always the next one, and you approach life with a curiosity that's genuinely contagious. Retirement isn't a finish line for you; it's a runway. You're drawn to what's possible, not what's comfortable, and that restlessness is one of your greatest strengths.",
    traits: [
      "Curious & adventurous",
      "Growth-oriented",
      "Open to change",
      "Inspired by possibility",
      "Bold decision-maker",
    ],
    color: "#2d6a4f",
    bg: "#eaf4ee",
  },
  lighthouse: {
    id: "lighthouse",
    name: "The Lighthouse",
    tagline: "You guide others through every storm.",
    description:
      "You lead with wisdom and warmth. People gravitate toward you — for advice, for perspective, for a sense of steady. Your greatest satisfaction doesn't come from what you've achieved but from who you've helped along the way. You're a natural mentor, a genuine connector, and the kind of person every community needs at its center.",
    traits: [
      "Community-builder",
      "Empathetic & generous",
      "Natural mentor",
      "Deeply connected",
      "Story-driven",
    ],
    color: "#7b5c1a",
    bg: "#fdf6e3",
  },
  "wave-rider": {
    id: "wave-rider",
    name: "The Wave Rider",
    tagline: "You don't resist the current. You ride it.",
    description:
      "You have a rare and underrated gift: the ability to adapt without losing yourself. Life's detours don't derail you — they define you. You move through the world with a quiet ease and openness, trusting that the right wave will come if you stay in the water. Change isn't your enemy; it's your element.",
    traits: [
      "Adaptable & resilient",
      "Present-focused",
      "Emotionally grounded",
      "Flexible",
      "Quietly optimistic",
    ],
    color: "#1a6b7b",
    bg: "#e3f4f6",
  },
  captain: {
    id: "captain",
    name: "The Captain",
    tagline: "You don't wait for the wind. You set the sails.",
    description:
      "You're built to lead. You make decisions under pressure, rally people around a goal, and turn vision into results. You approach the next chapter of life the same way you've always operated — with confidence, conviction, and a clear destination. You don't need permission to move. You just move.",
    traits: [
      "Natural leader",
      "Decisive & confident",
      "Goal-oriented",
      "Accountable",
      "Action-first",
    ],
    color: "#3d1a7b",
    bg: "#ece8f6",
  },
  beachcomber: {
    id: "beachcomber",
    name: "The Beachcomber",
    tagline: "You find treasure where others see ordinary.",
    description:
      "You've learned what most people are still chasing: the richest life isn't the loudest one. You appreciate what you have, find beauty in simplicity, and measure wealth in moments rather than milestones. You are genuinely, deeply content — and that's rarer than any ambition. People leave conversations with you feeling lighter.",
    traits: [
      "Present & mindful",
      "Grateful",
      "Values simplicity",
      "Emotionally grounded",
      "Deeply content",
    ],
    color: "#4a6741",
    bg: "#edf4eb",
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scene: "You've just landed on the island...",
    image: "/quiz/q1.png",
    question: "What's your very first move?",
    answers: [
      {
        text: "Find a vantage point and map out the whole island",
        scores: { navigator: 3 },
      },
      {
        text: "Introduce yourself to the first person I see",
        scores: { lighthouse: 2, captain: 1 },
      },
      {
        text: "Pick a direction and start exploring",
        scores: { explorer: 3 },
      },
      {
        text: "Find a perfect spot, sit down, and take it all in",
        scores: { beachcomber: 3 },
      },
    ],
  },
  {
    id: 2,
    scene: "The afternoon is wide open...",
    image: "/quiz/q2.png",
    question: "How do you spend your ideal free afternoon?",
    answers: [
      {
        text: "Working on something that's been on my mind",
        scores: { navigator: 2, captain: 1 },
      },
      {
        text: "Exploring somewhere I've never been",
        scores: { explorer: 3 },
      },
      {
        text: "Deep conversation with someone interesting",
        scores: { lighthouse: 3 },
      },
      {
        text: "Completely unplugged — no agenda, just being present",
        scores: { beachcomber: 2, "wave-rider": 1 },
      },
      {
        text: "Starting something new — a project, an idea, a challenge",
        scores: { captain: 3 },
      },
    ],
  },
  {
    id: 3,
    scene: "An unexpected windfall arrives...",
    image: "/quiz/q3.png",
    question: "What do you do with it?",
    answers: [
      {
        text: "Add it to my existing investment strategy",
        scores: { navigator: 3 },
      },
      {
        text: "Fund the adventure I've been putting off",
        scores: { explorer: 3 },
      },
      {
        text: "Invest it in something that genuinely helps others",
        scores: { lighthouse: 3 },
      },
      {
        text: "Use it to buy back time and freedom",
        scores: { "wave-rider": 2, beachcomber: 1 },
      },
      {
        text: "Leverage it into something even bigger",
        scores: { captain: 3 },
      },
    ],
  },
  {
    id: 4,
    scene: "You're part of a new group...",
    image: "/quiz/q4.png",
    question: "What role do you naturally take on?",
    answers: [
      {
        text: "The one quietly figuring out what needs to happen",
        scores: { navigator: 3 },
      },
      {
        text: "The one making sure everyone feels included",
        scores: { lighthouse: 3 },
      },
      {
        text: "The one who steps up and gets things organized",
        scores: { captain: 3 },
      },
      {
        text: "The one who suggests something no one expected",
        scores: { explorer: 3 },
      },
      {
        text: "The one who adapts to wherever the energy goes",
        scores: { "wave-rider": 3 },
      },
    ],
  },
  {
    id: 5,
    scene: "You're picturing retirement...",
    image: "/quiz/q5.png",
    question: "What does it look like for you?",
    answers: [
      {
        text: "Financial independence — a plan I built and trust",
        scores: { navigator: 3 },
      },
      {
        text: "Travel, discovery, checking everything off the list",
        scores: { explorer: 3 },
      },
      {
        text: "Mentoring and giving back — sharing everything I've learned",
        scores: { lighthouse: 3 },
      },
      {
        text: "Slowing way down and savoring what I've built",
        scores: { beachcomber: 2, "wave-rider": 1 },
      },
      {
        text: "Launching something new — I'm nowhere near done",
        scores: { captain: 3 },
      },
    ],
  },
  {
    id: 6,
    scene: "A big decision is in front of you...",
    image: "/quiz/q6.png",
    question: "How do you typically make it?",
    answers: [
      {
        text: "Research everything thoroughly before I commit",
        scores: { navigator: 3 },
      },
      {
        text: "Talk it through with people I trust",
        scores: { lighthouse: 3 },
      },
      {
        text: "Trust my gut — I've earned that instinct",
        scores: { captain: 2, "wave-rider": 1 },
      },
      {
        text: "Decide quickly and adjust as I go",
        scores: { explorer: 2, captain: 1 },
      },
      {
        text: "Wait until it feels right — there's no rush",
        scores: { beachcomber: 2, "wave-rider": 1 },
      },
    ],
  },
  {
    id: 7,
    scene: "Be honest...",
    image: "/quiz/q7.png",
    question: "How would your closest friends describe you?",
    answers: [
      {
        text: '"Always has a plan for everything"',
        scores: { navigator: 3 },
      },
      {
        text: '"The person everyone calls when they need real advice"',
        scores: { lighthouse: 3 },
      },
      {
        text: '"Somehow always planning the next adventure"',
        scores: { explorer: 3 },
      },
      {
        text: '"Radiates calm — nothing seems to rattle them"',
        scores: { beachcomber: 2, "wave-rider": 1 },
      },
      {
        text: '"The one who makes things actually happen"',
        scores: { captain: 3 },
      },
    ],
  },
  {
    id: 8,
    scene: "You're booking a trip...",
    image: "/quiz/q8.png",
    question: "What does your ideal vacation look like?",
    answers: [
      {
        text: "A well-researched itinerary — I want to see everything",
        scores: { navigator: 3 },
      },
      {
        text: "Total cultural immersion somewhere completely unfamiliar",
        scores: { explorer: 3 },
      },
      {
        text: "A group trip with people I love",
        scores: { lighthouse: 2, captain: 1 },
      },
      {
        text: "A quiet beach with no plans and no phone",
        scores: { beachcomber: 3 },
      },
      {
        text: "Booked last-minute — I'll figure it out when I land",
        scores: { "wave-rider": 3 },
      },
    ],
  },
  {
    id: 9,
    scene: "Things go sideways...",
    image: "/quiz/q9.png",
    question: "The plan just fell apart. What do you do?",
    answers: [
      {
        text: "Pull up my notes and adapt the plan",
        scores: { navigator: 3 },
      },
      {
        text: "Check on others — how is everyone holding up?",
        scores: { lighthouse: 3 },
      },
      {
        text: "Get a little excited — the detour is usually the story",
        scores: { explorer: 2, "wave-rider": 1 },
      },
      {
        text: "Stay grounded — things unfold the way they're meant to",
        scores: { beachcomber: 2, "wave-rider": 1 },
      },
      {
        text: "Pivot fast and find a better path",
        scores: { captain: 3 },
      },
    ],
  },
  {
    id: 10,
    scene: "Looking further ahead...",
    image: "/quiz/q10.png",
    question: "What legacy matters most to you?",
    answers: [
      {
        text: "Financial security for the people I love",
        scores: { navigator: 3 },
      },
      {
        text: "People whose lives I meaningfully changed",
        scores: { lighthouse: 3 },
      },
      {
        text: "A life of bold choices that inspires others to live fully",
        scores: { explorer: 2, captain: 1 },
      },
      {
        text: "A quiet sense of peace I passed on to others",
        scores: { beachcomber: 3 },
      },
      {
        text: "Something I built that outlasts me",
        scores: { captain: 3 },
      },
    ],
  },
  {
    id: 11,
    scene: "Let's talk about risk...",
    image: "/quiz/q11.png",
    question: "How do you relate to it?",
    answers: [
      {
        text: "Calculated and rare — I protect what I've built",
        scores: { navigator: 3 },
      },
      {
        text: "I always weigh how it affects the people around me",
        scores: { lighthouse: 3 },
      },
      {
        text: "Bring it on — that's where real growth lives",
        scores: { explorer: 3 },
      },
      {
        text: "Instinctive — some things are worth the leap",
        scores: { captain: 2, "wave-rider": 1 },
      },
      {
        text: "Low-key — genuine contentment is underrated",
        scores: { beachcomber: 3 },
      },
    ],
  },
  {
    id: 12,
    scene: "Someone new joins the community...",
    image: "/quiz/q12.png",
    question: "What do you naturally do?",
    answers: [
      {
        text: "Give them the lay of the land — practical info first",
        scores: { navigator: 3 },
      },
      {
        text: "Make sure they feel genuinely welcomed and seen",
        scores: { lighthouse: 3 },
      },
      {
        text: "Invite them along to whatever's happening next",
        scores: { explorer: 2, captain: 1 },
      },
      {
        text: "Let them find their own rhythm before jumping in",
        scores: { beachcomber: 2, "wave-rider": 1 },
      },
      {
        text: "Connect them immediately to the right people",
        scores: { captain: 2, lighthouse: 1 },
      },
    ],
  },
  {
    id: 13,
    scene: "You sit down to read something...",
    image: "/quiz/q13.png",
    question: "What do you actually gravitate toward?",
    answers: [
      {
        text: "Research-backed guides, frameworks, real data",
        scores: { navigator: 3 },
      },
      {
        text: "Stories of people who made a meaningful difference",
        scores: { lighthouse: 3 },
      },
      {
        text: "Inspiring stories of bold adventures and new beginnings",
        scores: { explorer: 3 },
      },
      {
        text: "Mindfulness, simplicity, and slowing down",
        scores: { beachcomber: 3 },
      },
      {
        text: "Leadership, strategy, and building something real",
        scores: { captain: 3 },
      },
      {
        text: "Embracing uncertainty and riding out change",
        scores: { "wave-rider": 3 },
      },
    ],
  },
  {
    id: 14,
    scene: "Sunset on the island...",
    image: "/quiz/q14.png",
    question: "Where do you find yourself?",
    answers: [
      {
        text: "Journaling — processing the day on my own",
        scores: { navigator: 2, beachcomber: 1 },
      },
      {
        text: "In deep conversation with someone I just met",
        scores: { lighthouse: 3 },
      },
      {
        text: "Already sketching out tomorrow's plan",
        scores: { explorer: 2, captain: 1 },
      },
      {
        text: "Completely still, watching the colors change",
        scores: { beachcomber: 3 },
      },
      {
        text: "Organizing the group for a bonfire",
        scores: { captain: 2, lighthouse: 1 },
      },
      {
        text: "Floating in the water without a single thought",
        scores: { "wave-rider": 3 },
      },
    ],
  },
  {
    id: 15,
    scene: "One last question...",
    image: "/quiz/q15.png",
    question: "How does the chapter ahead feel?",
    answers: [
      {
        text: "Clear — I know exactly where I'm headed",
        scores: { navigator: 3 },
      },
      {
        text: "Purposeful — I have so much still to give",
        scores: { lighthouse: 3 },
      },
      {
        text: "Wide open — there's so much left to discover",
        scores: { explorer: 3 },
      },
      {
        text: "Grounding — time to slow down and savor what's here",
        scores: { beachcomber: 3 },
      },
      {
        text: "Energizing — my best move is still ahead of me",
        scores: { captain: 3 },
      },
      {
        text: "Flowing — I'll follow wherever the current takes me",
        scores: { "wave-rider": 3 },
      },
    ],
  },
];

const ARCHETYPE_ID_LIST: ArchetypeId[] = [
  "navigator",
  "explorer",
  "lighthouse",
  "wave-rider",
  "captain",
  "beachcomber",
];

export function isArchetypeId(id: string): id is ArchetypeId {
  return ARCHETYPE_ID_LIST.some((x) => x === id);
}

export function calculateArchetype(answers: QuizAnswer[]): ArchetypeId {
  const scores: Record<ArchetypeId, number> = {
    navigator: 0,
    explorer: 0,
    lighthouse: 0,
    "wave-rider": 0,
    captain: 0,
    beachcomber: 0,
  };

  for (const answer of answers) {
    for (const id of ARCHETYPE_ID_LIST) {
      scores[id] += answer.scores[id] ?? 0;
    }
  }

  return ARCHETYPE_ID_LIST.reduce((best, id) =>
    scores[id] >= scores[best] ? id : best,
  );
}
