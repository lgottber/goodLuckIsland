"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client";
import "./profile.css";

// ─── Mock user data — replace with your real auth/db calls ───────────────────
const INITIAL_USER = {
  // Basic
  firstName: "Alex",
  lastName: "Morgan",
  handle: "@alexmorgan",
  email: "alex.morgan@example.com",
  location: "San Francisco, CA",
  address: "",
  avatarUrl: "",
  avatarId: "",
  bio:
    "Gen X professional navigating the next chapter with intention. Passionate about financial independence, whole-life wellness, and making the most of what comes next.",
  memberSince: "January 2026",
  interests: [
    "Retirement Planning",
    "Whole-Life Wellness",
    "Clear Thinking",
    "Financial Independence",
    "Travel",
  ],
  stats: {
    articlesRead: 24,
    podcastsListened: 12,
    savedItems: 8,
    daysActive: 47,
  },
  // Life & Career
  age: "",
  occupation: "Senior Product Manager",
  yearsInOccupation: "",
  education: "",
  // Retirement
  isRetired: "",
  retirementDate: "",
  // Life Snapshot
  maritalStatus: "",
  divorced: "",
  kids: "",
  homePaidOff: "",
  // Financial
  workingIncome: "",
  netWorth: "",
};

const SAVED_ARTICLES = [
  {
    id: 1,
    tag: "Retirement",
    title: "Popular Advice Isn't Always Helpful Advice",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    id: 2,
    tag: "Wellness",
    title: "A Calm Place to Think About What Comes Next",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80",
  },
  {
    id: 3,
    tag: "Clear Thinking",
    title: "Rethinking Retirement, One Choice at a Time",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
  },
  {
    id: 4,
    tag: "Wellness",
    title: "Whole-Life Wellness: What It Really Means After 50",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  },
];

// ─── My Backpack Sections ─────────────────────────────────────────────────────
const BACKPACK_SECTIONS = [
  {
    id: "challenge",
    label: "The 1 Question Retirement Challenge",
    emoji: "❓",
    color: "#e8673a",
    tagline: "One question. One week. A lifetime of clarity.",
    description:
      "Each week a single powerful question helps you think more clearly about what retirement really means to you. No right answers — just honest reflection.",
    type: "challenge",
  },
  {
    id: "pinwhirl",
    label: "The Pinwhirl Tool",
    emoji: "🌀",
    color: "#2e8b7a",
    tagline: "Spin your priorities into focus.",
    description:
      "A guided self-assessment that helps you visualize the different dimensions of your retirement life — financial, social, physical, purposeful — and where you stand today.",
    type: "coming-soon",
  },
  {
    id: "values",
    label: "Values & Beliefs",
    emoji: "🧭",
    color: "#1e2d5a",
    tagline: "Know what you stand for before you stand down.",
    description:
      "Retirement is a chance to live more aligned with what you truly value. This section helps you identify, articulate, and commit to the values that will guide your next chapter.",
    type: "coming-soon",
  },
  {
    id: "purpose",
    label: "Finding Your Purpose",
    emoji: "🔦",
    color: "#7a5a9a",
    tagline: "What gets you out of bed when work doesn't?",
    description:
      "Purpose doesn't retire when you do. This section guides you through exercises to discover what gives your life meaning beyond your career identity.",
    type: "coming-soon",
  },
  {
    id: "skills",
    label: "New Skills",
    emoji: "🛠️",
    color: "#5a8a6a",
    tagline: "Life skills for the chapter ahead.",
    description:
      "From cooking to budgeting to technology to health management — retirement comes with a new set of everyday skills worth developing. Explore what's worth learning next.",
    type: "coming-soon",
  },
  {
    id: "refinement",
    label: "Refinement",
    emoji: "✨",
    color: "#c87840",
    tagline: "Bringing it all together.",
    description:
      "You've reflected, you've explored, you've grown. This section helps you synthesize everything into a clear, personal retirement vision you can actually live.",
    type: "coming-soon",
  },
  {
    id: "giveback",
    label: "Giveback & Share",
    emoji: "🤲",
    color: "#3a6a9a",
    tagline: "Share your story. Give back. Pay it forward.",
    description:
      "Your journey matters. This section invites you to share your experiences with the collective, mentor others just starting out, and find ways to contribute beyond yourself.",
    type: "coming-soon",
  },
];

// ─── Weekly Retirement Questions ──────────────────────────────────────────────
const WEEKLY_QUESTIONS = [
  {
    question:
      "If money were no object, how would you spend your first week of retirement?",
    prompt:
      "Close your eyes and really picture it. Where are you? Who's with you? What does a Tuesday feel like?",
  },
  {
    question: "What does 'enough' mean to you financially?",
    prompt:
      "Not a number — a feeling. What would it feel like to know you have enough? What would change?",
  },
  {
    question: "What are you most afraid of about retirement?",
    prompt:
      "Name it honestly. Loss of identity? Running out of money? Boredom? Fear named is fear tamed.",
  },
  {
    question:
      "What would you do differently in your career if you could start over?",
    prompt:
      "This isn't about regret — it's about understanding what truly matters to you as you look ahead.",
  },
  {
    question:
      "Who do you want to be in retirement — not what you want to do, but who?",
    prompt:
      "Think about your values, your relationships, and the kind of person you're still becoming.",
  },
  {
    question:
      "What is one thing you keep putting off that retirement would finally give you time for?",
    prompt:
      "That creative project. That place you've always wanted to visit. That relationship you want to rebuild.",
  },
  {
    question: "How do you define a life well-lived?",
    prompt:
      "If you looked back at 85, what would make you feel proud? What would feel like a waste?",
  },
  {
    question:
      "What does your ideal Tuesday in retirement look like — in detail?",
    prompt:
      "Not vacation. Not a special day. Just a regular, ordinary, beautiful Tuesday.",
  },
  {
    question:
      "What role will work — or purpose-driven activity — play in your retirement?",
    prompt:
      "Some people can't imagine stopping. Others can't wait. Most are somewhere in between. Where are you?",
  },
  {
    question:
      "What conversation about money or retirement are you avoiding with someone you love?",
    prompt:
      "With a spouse? A parent? An adult child? What would it take to have it this week?",
  },
  {
    question:
      "If you retired tomorrow, what would you miss most about working?",
    prompt:
      "The people? The structure? The feeling of contributing? Knowing this helps you plan to replace it.",
  },
  {
    question: "What does your health need from you in the next five years?",
    prompt:
      "Retirement dreams are built on a foundation of health. What's one thing your future self is asking you to start now?",
  },
];

function getWeeklyQuestion() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
  return WEEKLY_QUESTIONS[weekNum % WEEKLY_QUESTIONS.length];
}

// ─── Avatar Characters ────────────────────────────────────────────────────────
const AVATAR_ERAS = [
  {
    era: "70s",
    label: "The Seventies",
    characters: [
      {
        id: "fonzie",
        name: "The Fonz",
        emoji: "🕶️",
        bg: "#c8a45a",
        fg: "#1a1a1a",
        desc: "Happy Days",
      },
      {
        id: "farrah",
        name: "Farrah",
        emoji: "💇",
        bg: "#d4a843",
        fg: "#fff",
        desc: "Charlie's Angels",
      },
      {
        id: "kojak",
        name: "Kojak",
        emoji: "🍭",
        bg: "#5a7a9a",
        fg: "#fff",
        desc: "Kojak",
      },
      {
        id: "marcia",
        name: "Marcia Brady",
        emoji: "🌸",
        bg: "#e8a0b0",
        fg: "#fff",
        desc: "The Brady Bunch",
      },
      {
        id: "archie",
        name: "Archie Bunker",
        emoji: "📺",
        bg: "#8b6355",
        fg: "#fff",
        desc: "All in the Family",
      },
      {
        id: "laverne",
        name: "Laverne",
        emoji: "🎳",
        bg: "#7a5c9a",
        fg: "#fff",
        desc: "Laverne & Shirley",
      },
      {
        id: "hawkeye",
        name: "Hawkeye Pierce",
        emoji: "🏥",
        bg: "#4a7a5a",
        fg: "#fff",
        desc: "M*A*S*H",
      },
      {
        id: "starsky",
        name: "Starsky",
        emoji: "🚗",
        bg: "#c84a3a",
        fg: "#fff",
        desc: "Starsky & Hutch",
      },
    ],
  },
  {
    era: "80s",
    label: "The Eighties",
    characters: [
      {
        id: "ferris",
        name: "Ferris Bueller",
        emoji: "😎",
        bg: "#e8673a",
        fg: "#fff",
        desc: "Ferris Bueller's Day Off",
      },
      {
        id: "macgyver",
        name: "MacGyver",
        emoji: "🔧",
        bg: "#5a8a6a",
        fg: "#fff",
        desc: "MacGyver",
      },
      {
        id: "mallory",
        name: "Mallory Keaton",
        emoji: "💅",
        bg: "#d4789a",
        fg: "#fff",
        desc: "Family Ties",
      },
      {
        id: "magnum",
        name: "Magnum P.I.",
        emoji: "🥸",
        bg: "#c87840",
        fg: "#fff",
        desc: "Magnum P.I.",
      },
      {
        id: "claire",
        name: "Claire Huxtable",
        emoji: "⚖️",
        bg: "#5a6a9a",
        fg: "#fff",
        desc: "The Cosby Show",
      },
      {
        id: "marty",
        name: "Marty McFly",
        emoji: "⏰",
        bg: "#e8b030",
        fg: "#1a1a1a",
        desc: "Back to the Future",
      },
      {
        id: "sam",
        name: "Sam Malone",
        emoji: "🍺",
        bg: "#7a5a3a",
        fg: "#fff",
        desc: "Cheers",
      },
      {
        id: "indiana",
        name: "Indiana Jones",
        emoji: "🪖",
        bg: "#8a6a3a",
        fg: "#fff",
        desc: "Raiders of the Lost Ark",
      },
    ],
  },
  {
    era: "90s",
    label: "The Nineties",
    characters: [
      {
        id: "elaine",
        name: "Elaine Benes",
        emoji: "💃",
        bg: "#9a7aba",
        fg: "#fff",
        desc: "Seinfeld",
      },
      {
        id: "carlton",
        name: "Carlton Banks",
        emoji: "🕺",
        bg: "#3a6a9a",
        fg: "#fff",
        desc: "Fresh Prince",
      },
      {
        id: "rachel",
        name: "Rachel Green",
        emoji: "✂️",
        bg: "#e8a860",
        fg: "#fff",
        desc: "Friends",
      },
      {
        id: "mulder",
        name: "Fox Mulder",
        emoji: "🛸",
        bg: "#4a5a7a",
        fg: "#fff",
        desc: "The X-Files",
      },
      {
        id: "homer",
        name: "Homer Simpson",
        emoji: "🍩",
        bg: "#e8c830",
        fg: "#1a1a1a",
        desc: "The Simpsons",
      },
      {
        id: "buffy",
        name: "Buffy Summers",
        emoji: "🪓",
        bg: "#c84870",
        fg: "#fff",
        desc: "Buffy the Vampire Slayer",
      },
      {
        id: "kramer",
        name: "Kramer",
        emoji: "🚪",
        bg: "#c8783a",
        fg: "#fff",
        desc: "Seinfeld",
      },
      {
        id: "ross",
        name: "Ross Geller",
        emoji: "🦕",
        bg: "#8a7a6a",
        fg: "#fff",
        desc: "Friends",
      },
    ],
  },
  {
    era: "2000s",
    label: "Early 2000s",
    characters: [
      {
        id: "tony",
        name: "Tony Soprano",
        emoji: "🦢",
        bg: "#5a5a6a",
        fg: "#fff",
        desc: "The Sopranos",
      },
      {
        id: "carrie",
        name: "Carrie Bradshaw",
        emoji: "👠",
        bg: "#d47898",
        fg: "#fff",
        desc: "Sex and the City",
      },
      {
        id: "mcdreamy",
        name: "Dr. McDreamy",
        emoji: "🩺",
        bg: "#5a8aaa",
        fg: "#fff",
        desc: "Grey's Anatomy",
      },
      {
        id: "michael",
        name: "Michael Scott",
        emoji: "📋",
        bg: "#7a9aba",
        fg: "#fff",
        desc: "The Office",
      },
      {
        id: "jack",
        name: "Jack Shephard",
        emoji: "✈️",
        bg: "#4a7a5a",
        fg: "#fff",
        desc: "Lost",
      },
      {
        id: "don",
        name: "Don Draper",
        emoji: "🥃",
        bg: "#6a5a4a",
        fg: "#fff",
        desc: "Mad Men",
      },
      {
        id: "miranda",
        name: "Miranda Priestly",
        emoji: "👒",
        bg: "#3a3a4a",
        fg: "#fff",
        desc: "The Devil Wears Prada",
      },
      {
        id: "walter",
        name: "Walter White",
        emoji: "🧪",
        bg: "#7a8a6a",
        fg: "#fff",
        desc: "Breaking Bad",
      },
    ],
  },
];

// ─── Avatar Picker Modal ──────────────────────────────────────────────────────
function AvatarPickerModal({ currentAvatar, onSelect, onClose }) {
  const [selectedEra, setSelectedEra] = useState("80s");
  const era = AVATAR_ERAS.find((e) => e.era === selectedEra);

  return (
    <div
      className="edit-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="edit-modal avatar-picker-modal">
        <div className="edit-modal-header">
          <div>
            <h2>Choose Your Islander Avatar</h2>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginTop: "0.25rem",
              }}
            >
              Pick an iconic character from your era
            </p>
          </div>
          <button type="button" className="edit-modal-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="avatar-era-tabs">
          {AVATAR_ERAS.map((e) => (
            <button
              type="button"
              key={e.era}
              className={`avatar-era-tab ${
                selectedEra === e.era ? "active" : ""
              }`}
              onClick={() => setSelectedEra(e.era)}
            >
              <span className="era-decade">{e.era}</span>
              <span className="era-label">{e.label}</span>
            </button>
          ))}
        </div>

        <div className="avatar-grid-wrap">
          <div className="avatar-grid">
            {era.characters.map((char) => {
              const isSelected = currentAvatar === char.id;
              return (
                <button
                  type="button"
                  key={char.id}
                  className={`avatar-character-btn ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => {
                    onSelect(char.id);
                    onClose();
                  }}
                >
                  <div
                    className="avatar-character-face"
                    style={{ background: char.bg }}
                  >
                    <span className="avatar-emoji">{char.emoji}</span>
                    {isSelected && (
                      <div className="avatar-selected-check">✓</div>
                    )}
                  </div>
                  <span className="avatar-character-name">{char.name}</span>
                  <span className="avatar-character-show">{char.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="edit-modal-footer"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            Click a character to select them as your avatar
          </p>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Avatar Display Helper ────────────────────────────────────────────────────
function AvatarDisplay(
  { avatarId, avatarUrl, initials, size = 104, borderColor = "var(--cream)" },
) {
  const allChars = AVATAR_ERAS.flatMap((e) => e.characters);
  const char = allChars.find((c) => c.id === avatarId);

  const baseStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `4px solid ${borderColor}`,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  };

  if (avatarUrl) {
    return (
      <div style={baseStyle}>
        <img
          src={avatarUrl}
          alt="avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }
  if (char) {
    return (
      <div
        style={{ ...baseStyle, background: char.bg, flexDirection: "column" }}
      >
        <span style={{ fontSize: size * 0.42, lineHeight: 1 }}>
          {char.emoji}
        </span>
      </div>
    );
  }
  return (
    <div style={{ ...baseStyle, background: "var(--navy)" }}>
      <span
        style={{
          color: "#fff",
          fontFamily: "var(--serif)",
          fontSize: size * 0.3,
          fontWeight: 600,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16 }) => {
  const icons = {
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    location: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
    briefcase: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
    headphones: (
      <>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </>
    ),
    bookmark: (
      <>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// ─── Reusable form primitives ─────────────────────────────────────────────────
const Field = ({ label, hint, children }) => (
  <div className="field">
    <label>{label}</label>
    {children}
    {hint && <span className="field-hint">{hint}</span>}
  </div>
);

const Select = ({ value, onChange, children, placeholder }) => (
  <select value={value} onChange={onChange}>
    {placeholder && <option value="">{placeholder}</option>}
    {children}
  </select>
);

const YesNo = ({ value, onChange }) => (
  <div className="yes-no-group">
    {["Yes", "No", "Prefer not to say"].map((opt) => (
      <button
        key={opt}
        type="button"
        className={`yes-no-btn ${value === opt ? "active" : ""}`}
        onClick={() => onChange(opt)}
      >
        {opt}
      </button>
    ))}
  </div>
);

// ─── Edit Profile Modal ───────────────────────────────────────────────────────
const MODAL_TABS = ["Basic Info", "Life & Career", "Retirement", "Finances"];

function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ ...user });
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [interestInput, setInterestInput] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addInterest = (e) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      if (!form.interests.includes(interestInput.trim())) {
        set("interests", [...form.interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  };
  const removeInterest = (tag) =>
    set("interests", form.interests.filter((t) => t !== tag));

  return (
    <div
      className="edit-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="edit-modal">
        {/* Header */}
        <div className="edit-modal-header">
          <h2>Edit Islander Profile</h2>
          <button type="button" className="edit-modal-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="modal-tab-bar">
          {MODAL_TABS.map((t) => (
            <button
              type="button"
              key={t}
              className={`modal-tab-btn ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── BASIC INFO ── */}
        {activeTab === "Basic Info" && (
          <div className="edit-modal-body">
            <div className="modal-section-label">Identity</div>
            <div className="field-row">
              <Field label="First Name">
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  placeholder="First name"
                />
              </Field>
              <Field label="Last Name">
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  placeholder="Last name"
                />
              </Field>
            </div>
            <div className="field-row">
              <Field label="Username">
                <input
                  type="text"
                  value={form.handle}
                  onChange={(e) => set("handle", e.target.value)}
                  placeholder="@username"
                />
              </Field>
              <Field label="Age">
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  placeholder="e.g. 52"
                  min="1"
                  max="120"
                />
              </Field>
            </div>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
              />
            </Field>

            <div
              className="modal-section-label"
              style={{ marginTop: "0.5rem" }}
            >
              Location
            </div>
            <Field label="City / State">
              <input
                type="text"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="City, State"
              />
            </Field>
            <Field label="Mailing Address" hint="So we can send you gifts 🎁">
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="Street, City, State, ZIP"
              />
            </Field>

            <div
              className="modal-section-label"
              style={{ marginTop: "0.5rem" }}
            >
              About You
            </div>
            <Field
              label="Bio"
              hint={`${(form.bio || "").length} / 300 characters`}
            >
              <textarea
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="Tell the collective about yourself..."
                maxLength={300}
              />
            </Field>
            <Field label="Interests" hint="Press Enter to add each interest">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={addInterest}
                placeholder="e.g. Travel, Golf, Cooking..."
              />
              {form.interests.length > 0 && (
                <div className="tag-list" style={{ marginTop: "0.6rem" }}>
                  {form.interests.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeInterest(tag)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          lineHeight: 1,
                          color: "var(--muted)",
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Field>
          </div>
        )}

        {/* ── LIFE & CAREER ── */}
        {activeTab === "Life & Career" && (
          <div className="edit-modal-body">
            <div className="modal-section-label">Career</div>
            <Field label="Occupation">
              <input
                type="text"
                value={form.occupation}
                onChange={(e) => set("occupation", e.target.value)}
                placeholder="Your current or most recent role"
              />
            </Field>
            <div className="field-row">
              <Field label="Years in Occupation">
                <input
                  type="number"
                  value={form.yearsInOccupation}
                  onChange={(e) => set("yearsInOccupation", e.target.value)}
                  placeholder="e.g. 15"
                  min="0"
                  max="60"
                />
              </Field>
              <Field label="Education Level">
                <Select
                  value={form.education}
                  onChange={(e) => set("education", e.target.value)}
                  placeholder="Select your highest level"
                >
                  <option value="High School / GED">High School / GED</option>
                  <option value="Trade / Vocational">Trade / Vocational</option>
                  <option value="Some College">Some College</option>
                  <option value="Associate's Degree">Associate's Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Doctorate / PhD">Doctorate / PhD</option>
                  <option value="Professional Degree (JD/MD)">
                    Professional Degree (JD/MD)
                  </option>
                </Select>
              </Field>
            </div>

            <div
              className="modal-section-label"
              style={{ marginTop: "0.5rem" }}
            >
              Life Snapshot
            </div>
            <Field label="Marital Status">
              <Select
                value={form.maritalStatus}
                onChange={(e) => set("maritalStatus", e.target.value)}
                placeholder="Select status"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Partnered">Partnered</option>
                <option value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Select>
            </Field>

            <div className="field-row">
              <Field label="Previously Divorced?">
                <YesNo
                  value={form.divorced}
                  onChange={(v) => set("divorced", v)}
                />
              </Field>
              <Field label="Do you have kids?">
                <YesNo value={form.kids} onChange={(v) => set("kids", v)} />
              </Field>
            </div>

            <Field label="Home paid off?">
              <YesNo
                value={form.homePaidOff}
                onChange={(v) => set("homePaidOff", v)}
              />
            </Field>
          </div>
        )}

        {/* ── RETIREMENT ── */}
        {activeTab === "Retirement" && (
          <div className="edit-modal-body">
            <div className="modal-section-label">Retirement Status</div>
            <Field label="Are you retired yet?">
              <div className="yes-no-group">
                {["Yes, I'm retired", "Not yet", "Semi-retired"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`yes-no-btn ${
                      form.isRetired === opt ? "active" : ""
                    }`}
                    onClick={() => set("isRetired", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </Field>

            {form.isRetired && (
              <Field
                label={form.isRetired === "Yes, I'm retired"
                  ? "When did you retire?"
                  : "When do you plan to retire?"}
                hint={form.isRetired === "Yes, I'm retired"
                  ? "Month and year you retired"
                  : "Your target retirement date"}
              >
                <input
                  type="month"
                  value={form.retirementDate}
                  onChange={(e) => set("retirementDate", e.target.value)}
                />
              </Field>
            )}

            {form.isRetired && form.isRetired !== "Yes, I'm retired" && (
              <div className="retirement-tip">
                <span className="retirement-tip-icon">🌴</span>
                <p>
                  Planning ahead is exactly what the Good Luck Island Collective
                  is here for. You're in the right place.
                </p>
              </div>
            )}
            {form.isRetired === "Yes, I'm retired" && (
              <div className="retirement-tip congrats">
                <span className="retirement-tip-icon">🎉</span>
                <p>
                  Congratulations! Welcome to the next chapter. We're glad
                  you're here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── FINANCES ── */}
        {activeTab === "Finances" && (
          <div className="edit-modal-body">
            <div className="modal-section-label">Financial Overview</div>
            <p className="modal-privacy-note">
              🔒 This information is private and never shared publicly. It helps
              us tailor content to where you are in your journey.
            </p>

            <Field label="Working Income (Annual)">
              <Select
                value={form.workingIncome}
                onChange={(e) => set("workingIncome", e.target.value)}
                placeholder="Select a range"
              >
                <option value="Under $50k">Under $50,000</option>
                <option value="$50k–$75k">$50,000 – $75,000</option>
                <option value="$75k–$100k">$75,000 – $100,000</option>
                <option value="$100k–$150k">$100,000 – $150,000</option>
                <option value="$150k–$200k">$150,000 – $200,000</option>
                <option value="$200k–$300k">$200,000 – $300,000</option>
                <option value="$300k–$500k">$300,000 – $500,000</option>
                <option value="$500k+">$500,000+</option>
                <option value="Not currently working">
                  Not currently working
                </option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Select>
            </Field>

            <Field label="Estimated Net Worth">
              <Select
                value={form.netWorth}
                onChange={(e) => set("netWorth", e.target.value)}
                placeholder="Select a range"
              >
                <option value="Under $100k">Under $100,000</option>
                <option value="$100k–$250k">$100,000 – $250,000</option>
                <option value="$250k–$500k">$250,000 – $500,000</option>
                <option value="$500k–$1M">$500,000 – $1,000,000</option>
                <option value="$1M–$2M">$1,000,000 – $2,000,000</option>
                <option value="$2M–$5M">$2,000,000 – $5,000,000</option>
                <option value="$5M+">$5,000,000+</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Select>
            </Field>
          </div>
        )}

        {/* Footer */}
        <div className="edit-modal-footer">
          <div className="modal-tab-nav">
            {MODAL_TABS.indexOf(activeTab) > 0 && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() =>
                  setActiveTab(MODAL_TABS[MODAL_TABS.indexOf(activeTab) - 1])}
              >
                ← Back
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            {MODAL_TABS.indexOf(activeTab) < MODAL_TABS.length - 1
              ? (
                <button
                  type="button"
                  className="btn-save"
                  onClick={() =>
                    setActiveTab(MODAL_TABS[MODAL_TABS.indexOf(activeTab) + 1])}
                >
                  Next →
                </button>
              )
              : (
                <button
                  type="button"
                  className="btn-save"
                  onClick={() => onSave(form)}
                >
                  Save Changes
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user: auth0User } = useAuth0User();
  const [user, setUser] = useState(INITIAL_USER);

  useEffect(() => {
    if (auth0User) {
      setUser((prev) => ({
        ...prev,
        firstName: auth0User.given_name ?? auth0User.name?.split(" ")[0] ??
          prev.firstName,
        lastName: auth0User.family_name ??
          auth0User.name?.split(" ").slice(1).join(" ") ?? prev.lastName,
        email: auth0User.email ?? prev.email,
        avatarUrl: auth0User.picture ?? prev.avatarUrl,
        handle: auth0User.nickname ? `@${auth0User.nickname}` : prev.handle,
      }));
    }
  }, [auth0User]);
  const [editing, setEditing] = useState(false);
  const [pickingAvatar, setPickingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [saved, setSaved] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBackpackSection, setActiveBackpackSection] = useState(null);
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const weeklyQ = getWeeklyQuestion();

  const saveReflection = () => {
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2500);
  };

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  const handleSave = (updated) => {
    setUser(updated);
    setEditing(false);
    setSaved(false);
    setTimeout(() => setSaved(true), 2000);
  };

  return (
    <>
      {editing && (
        <EditModal
          user={user}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
      {pickingAvatar && (
        <AvatarPickerModal
          currentAvatar={user.avatarId}
          onSelect={(id) =>
            setUser((u) => ({ ...u, avatarId: id, avatarUrl: "" }))}
          onClose={() => setPickingAvatar(false)}
        />
      )}

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{ height: 75, width: "auto", objectFit: "contain" }}
            />
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/shop">Book & Support</Link>
          </div>
          <div className="nav-auth">
            <div
              className="nav-avatar-placeholder"
              title={`${user.firstName} ${user.lastName}`}
              onClick={() => setPickingAvatar(true)}
              style={{ cursor: "pointer" }}
            >
              <AvatarDisplay
                avatarId={user.avatarId}
                avatarUrl={user.avatarUrl}
                initials={initials}
                size={36}
                borderColor="var(--teal)"
              />
            </div>
            <a href="/auth/logout" className="nav-btn-ghost">Sign Out</a>
          </div>
          <button
            type="button"
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          type="button"
          className="nav-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/shop" onClick={() => setMobileOpen(false)}>Book & Support</Link>
      </div>

      <div className="profile-page">
        {/* ── BANNER ── */}
        <div className="profile-banner">
          <div className="profile-banner-bg" />
          <button type="button" className="profile-banner-edit">
            Change Cover
          </button>
        </div>

        {/* ── PROFILE HEADER ── */}
        <div className="profile-header-wrap">
          <div className="profile-header">
            <div className="profile-avatar-wrap">
              <AvatarDisplay
                avatarId={user.avatarId}
                avatarUrl={user.avatarUrl}
                initials={initials}
                size={104}
              />
              <button
                type="button"
                className="avatar-edit-btn"
                onClick={() => setPickingAvatar(true)}
                title="Change avatar"
              >
                <Icon name="camera" size={12} />
              </button>
            </div>

            <div className="profile-header-info">
              <h1>{user.firstName} {user.lastName}</h1>
              <p className="profile-handle">{user.handle}</p>
              <span className="profile-badge">🌴 Islander</span>
            </div>

            <div className="profile-header-actions">
              {!saved && (
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--teal)",
                    fontWeight: 600,
                    alignSelf: "center",
                  }}
                >
                  ✓ Saved!
                </span>
              )}
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="profile-content">
          {/* ── SIDEBAR ── */}
          <aside className="profile-sidebar">
            {/* Info */}
            <div className="profile-card">
              <h3>About</h3>
              {user.occupation && (
                <div className="info-row">
                  <Icon name="briefcase" size={16} />
                  <div className="info-row-text">
                    <div className="info-row-label">Occupation</div>
                    <div className="info-row-value">{user.occupation}</div>
                  </div>
                </div>
              )}
              {user.location && (
                <div className="info-row">
                  <Icon name="location" size={16} />
                  <div className="info-row-text">
                    <div className="info-row-label">Location</div>
                    <div className="info-row-value">{user.location}</div>
                  </div>
                </div>
              )}
              {user.email && (
                <div className="info-row">
                  <Icon name="mail" size={16} />
                  <div className="info-row-text">
                    <div className="info-row-label">Email</div>
                    <div className="info-row-value">{user.email}</div>
                  </div>
                </div>
              )}
              <div className="info-row">
                <Icon name="calendar" size={16} />
                <div className="info-row-text">
                  <div className="info-row-label">Member Since</div>
                  <div className="info-row-value">{user.memberSince}</div>
                </div>
              </div>
              {!user.occupation && !user.location && (
                <p
                  className="info-row-value empty"
                  style={{ padding: "0.5rem 0" }}
                >
                  No details added yet.{" "}
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--coral)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Add info →
                  </button>
                </p>
              )}
            </div>

            {/* Interests */}
            <div className="profile-card">
              <h3>Interests</h3>
              {user.interests.length > 0
                ? (
                  <div className="tag-list">
                    {user.interests.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )
                : (
                  <p className="info-row-value empty">
                    No interests added.{" "}
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--coral)",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Add some →
                    </button>
                  </p>
                )}
            </div>
          </aside>

          {/* ── MAIN PANEL ── */}
          <div className="profile-main">
            <div className="tab-bar">
              {[
                { id: "overview", label: "Overview" },
                { id: "saved", label: "Saved" },
                { id: "backpack", label: "🎒 My Backpack" },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveBackpackSection(null);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="profile-card">
                <p className="section-label-sm">About Me</p>
                {user.bio
                  ? <p className="bio-text">{user.bio}</p>
                  : (
                    <p className="bio-text empty">
                      No bio yet.{" "}
                      <button
                        type="button"
                        onClick={() => setEditing(true)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--coral)",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Add a bio →
                      </button>
                    </p>
                  )}
              </div>
            )}

            {/* Saved Tab */}
            {activeTab === "saved" && (
              <div className="profile-card">
                <p
                  className="section-label-sm"
                  style={{ marginBottom: "1rem" }}
                >
                  Saved Articles &amp; Episodes
                </p>
                <div className="saved-grid">
                  {SAVED_ARTICLES.map((item) => (
                    <div key={item.id} className="saved-card">
                      <div className="saved-card-img">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="saved-card-body">
                        <div className="saved-card-tag">{item.tag}</div>
                        <h4>{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Backpack Tab */}
            {activeTab === "backpack" && !activeBackpackSection && (
              <div className="profile-card">
                <p className="section-label-sm">My Backpack</p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--muted)",
                    marginTop: "0.4rem",
                    marginBottom: "1.75rem",
                    lineHeight: 1.7,
                  }}
                >
                  Your personal retirement toolkit. Work through each section at
                  your own pace — every step brings your next chapter into
                  clearer focus.
                </p>
                <div className="backpack-section-grid">
                  {BACKPACK_SECTIONS.map((section, i) => (
                    <button
                      type="button"
                      key={section.id}
                      className={`backpack-section-card ${
                        section.type === "coming-soon" ? "coming-soon" : ""
                      }`}
                      onClick={() =>
                        section.type !== "coming-soon" &&
                        setActiveBackpackSection(section.id)}
                      style={{ "--section-color": section.color }}
                    >
                      <div className="backpack-section-num">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="backpack-section-emoji">
                        {section.emoji}
                      </div>
                      <div className="backpack-section-info">
                        <h4 className="backpack-section-title">
                          {section.label}
                        </h4>
                        <p className="backpack-section-tagline">
                          {section.tagline}
                        </p>
                      </div>
                      {section.type === "coming-soon"
                        ? (
                          <span className="backpack-coming-soon">
                            Coming Soon
                          </span>
                        )
                        : <span className="backpack-section-arrow">→</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Backpack: 1 Question Challenge */}
            {activeTab === "backpack" &&
              activeBackpackSection === "challenge" && (
              <div className="profile-card">
                <div className="backpack-section-nav">
                  <button
                    type="button"
                    className="backpack-back-btn"
                    onClick={() => setActiveBackpackSection(null)}
                  >
                    ← Back to Backpack
                  </button>
                  <span className="backpack-section-breadcrumb">
                    ❓ The 1 Question Retirement Challenge
                  </span>
                </div>

                <div className="challenge-card">
                  <div className="challenge-week-badge">
                    Week of {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h2 className="challenge-question">{weeklyQ.question}</h2>
                  <p className="challenge-prompt">{weeklyQ.prompt}</p>
                </div>

                <div className="challenge-reflection">
                  <label className="challenge-reflection-label">
                    Your Reflection
                  </label>
                  <textarea
                    className="challenge-textarea"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Take your time. There are no wrong answers here. Just write honestly..."
                    rows={8}
                  />
                  <div className="challenge-reflection-footer">
                    <span className="challenge-reflection-hint">
                      🔒 Your reflection is private — only you can see it.
                    </span>
                    <button
                      type="button"
                      className="btn-save"
                      onClick={saveReflection}
                      disabled={!reflection.trim()}
                      style={{ opacity: !reflection.trim() ? 0.5 : 1 }}
                    >
                      {reflectionSaved ? "✓ Saved!" : "Save Reflection"}
                    </button>
                  </div>
                </div>

                <div className="challenge-archive-note">
                  <span>📅</span>
                  <p>
                    A new question appears every week. Your saved reflections
                    will build into a personal retirement journal over time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
