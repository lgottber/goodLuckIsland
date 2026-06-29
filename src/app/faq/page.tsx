"use client";

import { useState } from "react";
import NavBar from "../../components/NavBarDynamic";
import Icon from "../../components/Icon";
import "./faq.css";

const FAQS = [
  {
    id: 1,
    question: "What is Good Luck Island Collective?",
    answer:
      "Good Luck Island Collective is a self-help education platform built for Gen X professionals preparing for retirement. We focus on the whole-life questions most retirement content ignores — purpose, identity, relationships, and what you actually want your days to look like.",
  },
  {
    id: 2,
    question: "Is this a financial planning service?",
    answer:
      "No. We are not a financial planning company and we don't give financial advice. We believe most people should do this kind of deep personal reflection before they call a financial advisor — so that when they do, they show up with real goals, not generic ones.",
  },
  {
    id: 3,
    question: "Who is this platform for?",
    answer:
      "We built this for Gen X professionals — roughly ages 44–60 — who are within 5–15 years of retirement and starting to ask bigger questions about what comes next. If you're tired of anxiety-driven financial content and want a calmer, more intentional conversation about retirement, you're in the right place.",
  },
  {
    id: 4,
    question: "What is the 7SHieLD process?",
    answer:
      "7SHieLD is our 7-step holistic lifestyle discovery process. It guides you through a structured journey of self-reflection — from understanding your past identity, to mapping your current lifestyle, to defining your values, purpose, and the skills you'll need for your next chapter. Each step builds on the previous one.",
  },
  {
    id: 5,
    question: "What is the Wayfinder Assessment (Pinwirl Tool)?",
    answer:
      "The Pinwirl Tool is a guided self-assessment that measures where you stand across 8 key lifestyle dimensions: Physical, Emotional, Intellectual, Spiritual, Social, Environmental, Purpose/Vision, and Financial. It produces a personalized score and report that helps you identify your strengths and the areas where you'd benefit most from growth before retirement.",
  },
  {
    id: 6,
    question: "What is the One Question Retirement Challenge?",
    answer:
      "The 1QRC is a short reflective exercise — a series of focused questions designed to help you surface what you actually want from retirement, beyond the obvious answers. Most people discover that their initial \"hangman answers\" (travel, never running out of money) don't tell the full story.",
  },
  {
    id: 7,
    question: "Is my data private?",
    answer:
      "Yes. We take data privacy seriously. We do not sell your personal information to third parties. Your profile data, assessment answers, and journal entries are stored securely and used only to personalize your experience on the platform. You can export or delete your data at any time from your profile settings.",
  },
  {
    id: 8,
    question: "How do I cancel my membership or delete my account?",
    answer:
      "You can delete your account at any time from your profile page under Account Settings. If you have any trouble, reach out to us directly at hello@goodluckislandcollective.com and we'll take care of it within 24 hours.",
  },
  {
    id: 9,
    question: "Where can I find the podcast?",
    answer:
      "Our podcast episodes are available directly on the platform in the Articles & Podcasts section. You can also find us on YouTube, and we're expanding to additional podcast platforms soon.",
  },
  {
    id: 10,
    question: "I have a question that isn't answered here. How do I reach you?",
    answer:
      "We'd love to hear from you. Head to our Contact page and send us a message — no bots, no auto-replies. Just real people who care about helping you get this right.",
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <NavBar activePage="faq" largeAvatar />

      <div className="faq-page">
        <div className="faq-header">
          <p className="faq-eyebrow">Help & Information</p>
          <h1>Frequently Asked Questions</h1>
          <p className="faq-subtext">
            Answers to the most common questions about Good Luck Island
            Collective, our tools, and how we can help you prepare for
            retirement on your own terms.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item${isOpen ? " faq-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon">
                    <Icon name={isOpen ? "minus" : "plus"} size={16} />
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-cta-band">
          <p>Still have questions?</p>
          <a href="/contact" className="faq-cta-link">
            Get in touch →
          </a>
        </div>
      </div>
    </>
  );
}
