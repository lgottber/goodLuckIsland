"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import SkillCategorySection, { type SkillCategory } from "./SkillCategorySection";
import "./skills-for-retirement.css";

const CATEGORIES: SkillCategory[] = [
  {
    title: "Physical Skills",
    items: [
      {
        text: "“Choose Your Pain”",
        children: [
          {
            text: "A body in Motion Stays in Motion",
            children: [
              {
                text: "Physical activity is the elixir to reducing pain, extending a better quality of life, and enjoying life more.",
              },
            ],
          },
          {
            text: "Before you start any new physical skill challenge, consult with a Medical Professional.",
            children: [
              {
                text: "Before you start any physical fitness plan or even a nutrition plan please consult your appropriate medical professional so that you can be guided as to what your limitations are. There is no sense in starting a program if you don't know if your heart and health is ready for that program. Let the physicians help you select the right program for you.",
              },
            ],
          },
          {
            text: "Remember, getting healthier is not a competition",
            children: [
              {
                text: "You're not competing against other people here physically. This is really about you just getting better physically. So, maybe in a sense, you are competing with yourself on how to make yourself better. I know for some of the competitive types this doesn't always sit well, but none of us are getting out of life alive. It's not to be morbid it's just a reality. So we might as well do everything we can to get as healthy as we can physically so that we can enjoy our life even as we age.",
              },
            ],
          },
        ],
      },
      {
        text: "It comes down to Diet and Exercise",
        children: [{ text: "You can't out work a bad diet" }],
      },
      {
        text: "Finding Motivation",
        children: [
          { text: "That's always the big question" },
          {
            text: "How important is it to you?",
            children: [
              { text: "If you are not doing it…it really is not that important." },
            ],
          },
          {
            text: "Picture your future",
            children: [
              { text: "When we can see it in our mind we are more likely to achieve it." },
            ],
          },
          {
            text: "Baby Steps",
            children: [
              {
                text: "You are not going to go from where you are Arnold Schwarzenegger in one work out.",
              },
            ],
          },
          {
            text: "Focus on your physical goals",
            children: [
              { text: "What do you want to look like, more importantly what do you want to feel like?" },
              {
                text: "Write them down",
                children: [
                  { text: "Research shows when we write them down we are more likely to do them." },
                ],
              },
              {
                text: "Share them with others",
                children: [
                  {
                    text: "Research also shows when we tell others we are more likely to hold ourselves accountable",
                  },
                ],
              },
            ],
          },
          {
            text: "The dreaded D word",
            children: [
              { text: "No one wants to hear the word Discipline, but it is unavoidable." },
            ],
          },
          {
            text: "Start/Restart/Restart/Restart",
            children: [
              {
                text: "No one is perfect, we often start and have to restart, and restart again, and again, and again.",
              },
              { text: "Basic resilience" },
            ],
          },
          {
            text: "Consider using some technology",
            children: [
              { text: "Use a continuous glucose monitor to see how food affects your diet." },
              { text: "Use calendars to schedule your workouts" },
            ],
          },
          {
            text: "Understand the power of “yes” and “no”.",
            children: [
              { text: "Be clear what you will say yes to and do it." },
              { text: "When you say “no” don't do it, don't eat it." },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Mental/Intellectual Skills",
    items: [
      {
        text: "“Mindset Matters”",
        children: [
          {
            text: "Keep developing a positive mindset regardless of circumstances. It pays dividends over a negative or even a neutral mindset",
            children: [
              { text: "Mindset is a choice, you choose the way you think or want to think" },
            ],
          },
          {
            text: "Keep developing your “Growth vs. Fixed” mindset",
            children: [
              { text: "Most people think they have a growth mindset, but are not sure what that really is." },
              {
                text: "Think of a growth mindset as that you can change, but you also believe others can change too.",
                children: [
                  {
                    text: "Have you ever said about your spouse or significant other, “they will never change”…that's fixed mindset.",
                  },
                ],
              },
              { text: "A growth mindset believes that every area of life you can improve and get better." },
            ],
          },
          {
            text: "Keep developing your “Open vs. Closed” mindset",
            children: [
              { text: "The best way to think of this is “soft front, stiff back”." },
              {
                text: "It's being willing to listen to others that we may not agree with and try to understand their point of view without judgement",
              },
              { text: "It does not mean compromising your values." },
              { text: "You are giving up your judgement and having to prove you are right" },
              { text: "Requires “active listening”" },
            ],
          },
          {
            text: "Keep developing your “Promotional vs. Prevention” mindset.",
            children: [
              {
                text: "Most of us live in a prevention mindset, a mindset where we are more afraid of what we may lose versus what we could gain.",
              },
              { text: "Fear is the biggest killer for living an amazing life, and becoming more successful" },
              { text: "Prevention mindsets keep us from taking “risk” or attempting to do new things." },
              {
                text: "Curiosity, Imagination, Creativity, Innovation keep the mind fresh, and prevent a number of mental issues as we age.",
              },
            ],
          },
          {
            text: "Finally, practice forgiveness. Especially to those that have hurt you in the past. That is because unforgiveness is only hurting you, not them. As a wise person once told me, “Holding on to unforgiveness is like drinking the poison and hoping the other person will die”…you're only shortening your life.",
          },
          { text: "Recommended Book: “Being Happy” Andrew Matthews" },
        ],
      },
    ],
  },
  {
    title: "Emotional Skills",
    items: [
      {
        text: "“Your Emotions are Like the Weather…Wait and They will Change”",
        children: [
          {
            text: "Reminder: Every decision you make is an emotional one. As logical as you would like to think you may be, research demonstrates that it takes emotion to make a decision.",
          },
          {
            text: "Become more aware of your emotional state at all times.",
            children: [
              { text: "It has been suggested that you should often ask the question: “why do I feel this way?”" },
            ],
          },
          {
            text: "Beware of fundamental attribution error.",
            children: [
              {
                text: "You're probably asking what is that? It is when we attribute a personality deficit, through our emotions, based on the behavior that we see. So for example, a person cuts you off in traffic. What is the first thing you think? Do you think he's a bad person because he cut you off? Did you just call him an idiot because you believe he's not competent? Has he angered you because he's taken away some sort of sense of control that you thought you had? But let me propose a different way of thinking about it. What if you knew that this was a single parent, and he is at work quite a ways from the school that he takes his daughter. The school calls him at work, and says, “your daughter is very ill we're going to have to take her to the hospital”. If you knew that up front would you be so angry? Of course not, every one of us would try to get an advantage to get there as quickly as possible. But fundamental attribution error says that we'll blame the person by calling them stupid, ignorant, or something worse. We have to be very cautious because we are apt to make mistakes that will cost us emotionally down the road.",
              },
            ],
          },
          {
            text: "Being better prepared emotionally.",
            children: [
              {
                text: "Frequently we roll in life without thinking about our emotions very often. If we were more emotionally prepared for what may come at us we would be less likely to say things we don't mean, or do things that are outside of our character. Getting yourself emotionally prepared for your day is critical as we move into retirement.",
              },
            ],
          },
          {
            text: "Do something about your feelings",
            children: [
              {
                text: "This could come in many forms. It could be self-help books. It could be a mentor or coach. It could be a counselor. But you ultimately need to do something about the fact that your emotions are going to be in a heightened state during this transitional period. Don't push your feelings aside, face them and then move on from them. Always asking the question we said at the beginning, “why do I feel this way?”",
              },
            ],
          },
          { text: "Book Recommendation: “Are You Emotionally Ready to Retire” – Beverley Lassard" },
        ],
      },
    ],
  },
  {
    title: "Spiritual Skills",
    items: [
      {
        text: "“Nourish Your Soul”",
        children: [
          {
            text: "Spiritual Things?",
            children: [
              {
                text: "You may be one who doesn't believe in spiritual things or believe that they're all that important. But the fact of the matter is we all have a spiritual side, we're just not very comfortable talking about it.",
              },
            ],
          },
          {
            text: "The Human Spirit",
            children: [
              {
                text: "The fact of the matter is you and I have a human spirit, it is made up of our mind, will, and emotions. And that spirit of who we are is affected by many things outside of ourselves.",
              },
            ],
          },
          {
            text: "A Higher Power",
            children: [
              {
                text: "Some people question the idea of a “higher power”. Some people balk at the idea of God, or even a God. But we all have to recognize our place in the universe, and as most of us who age come to understand, we begin to realize this just can't be it. Surely there's something more?",
              },
            ],
          },
          {
            text: "We Live in the Spiritual Realms Every Day",
            children: [
              {
                text: "The truth is all of us live on a sense of hope and faith. Both of those terms are spiritual. If you don't have hope you can't have faith. And if you don't have faith you can't have hope. They are intertwined and yet our lives are guided by them.",
              },
            ],
          },
          {
            text: "What is Healthy for Your Soul?",
            children: [
              {
                text: "Using drugs and alcohol are not good for your soul. They both are depressants. What do you feed your soul first thing in the morning? Do you watch news that brings you down? What if instead you shut off the news and started your day with gratitude? You may want to start with the question, “why do I believe what I believe?”",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Social/Relational Skills",
    items: [
      {
        text: "“We Are Made for Connection”",
        children: [
          {
            text: "Who are You Connected With?",
            children: [
              { text: "Are you connected with people that can help you grow?" },
              { text: "Are you connected with people that are in alignment with your core values?" },
            ],
          },
          {
            text: "Are you Making New Friends?",
            children: [
              { text: "Even as we age it is important to make new friends." },
              {
                text: "Expand your Relationship age.",
                children: [
                  {
                    text: "So often we connect with people our own age in our circumstances. Be open to connecting with people outside our age group, especially younger, as it can bring new life to our social/relational skills.",
                  },
                ],
              },
            ],
          },
          {
            text: "Be Choosy, But Not Selective",
            children: [
              {
                text: "Sounds like the same. But in reality, we can choose our friends, but let's be open to all people from diverse groups.",
              },
            ],
          },
          {
            text: "Be a Relationship Developer",
            children: [
              { text: "It's easy to get lazy. Developing relationships takes time and commitment. But they are worth it." },
            ],
          },
          {
            text: "Connect to what you love.",
            children: [
              { text: "Do you have a favorite hobby? Connect with others who share the same interests." },
            ],
          },
          {
            text: "Try a New Hobby",
            children: [
              {
                text: "To improve our social relationships, often times experimenting with a new hobby can build bonds with those that we would not have ordinarily approached.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Environmental Skills",
    items: [
      { text: "“Are you planting in the Right Soil”" },
      {
        text: "Is the current environment where you live helping you grow or is it pulling the nutrients from you?",
        children: [
          { text: "Often times we do not understand how powerful, or what role the environment plays in our lives." },
          { text: "Living in the wrong environment can be a detriment to our ability to grow and flourish." },
        ],
      },
      {
        text: "The environment includes where you physically live, but also the culture you surround yourself with.",
        children: [
          {
            text: "There is a saying that is absolutely true, “If you are not growing you are dying”. We never stay static, and the environments we live in either move us forward, or put us further behind.",
          },
        ],
      },
    ],
  },
  {
    title: "Financial Skills",
    items: [
      { text: "“No one Puts Their Net Worth on Their Tombstone”" },
      {
        text: "Dollars are not the scoreboard for life.",
        children: [
          {
            text: "Yes, money does have relevance, but when we make it a scorecard, we short-sight ourselves of what life is really about.",
          },
          { text: "Worrying about money never helped anyone live longer, or got you more money." },
        ],
      },
      {
        text: "Don't Keep Up with the Joneses…In Fact, Stop Looking at Them!",
        children: [
          {
            text: "There is a saying in the self-help literature…“Compare and Despair”. So often we look at others, and when we don't think we measure up, we look down at ourselves. Be your own person. Enjoy your own life. Live your own life.",
          },
        ],
      },
      {
        text: "Live Within Your Means",
        children: [
          { text: "You simply need to live within your own means. Enjoy the life you have." },
          { text: "If it is not in the budget, either save for it, or simply don't spend it." },
        ],
      },
      {
        text: "Stay Invested",
        children: [
          { text: "If you want to keep your money longer, keep your money in sound investment strategies." },
        ],
      },
    ],
  },
  {
    title: "Additional Skills",
    items: [
      {
        text: "Try Out New Decisions",
        children: [
          { text: "If you are doing the same thing you have always done, then you will always get the same results." },
        ],
      },
      { text: "Cut the Crap" },
      { text: "Learn how to Spend Your Money on You" },
      { text: "What will you want to Relax From? What do you want to grow into?" },
      {
        text: "Grow Into Harmony with Your Significant Other",
        children: [
          {
            text: "This is a time of change. The two of you need to learn a new rhythm, and a new harmony. Don't neglect the newness of the relationship during this time.",
          },
        ],
      },
      {
        text: "Don't let your Children make Your Decisions. Make Your Own Decisions and Make them Stand Out!",
        children: [
          {
            text: "The easiest thing is to defer your decisions to the children. Not a good idea. Stay in control of your decision-making process and focus on what you need. This is the time to put on your mask first, before you put on anyone else's mask.",
          },
        ],
      },
      {
        text: "Make Good Choices Now",
        children: [{ text: "What you do right now affects your future." }],
      },
      {
        text: "Stay Away from the Second Opinion of Others.",
        children: [
          { text: "Everyone has an opinion. Your opinion is the only one that matters, because it is your life not theirs." },
        ],
      },
      {
        text: "Start Planning to Remove Things That No Longer Serve You",
        children: [
          { text: "Take an inventory of what things no longer serve you. And remove them." },
          {
            text: "Know the difference between “need” and “want”. At this point in your journey the things that don't serve you, you may want…but you certainly don't “need” them.",
          },
        ],
      },
    ],
  },
];

export default function SkillsForRetirementPage() {
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

      <div className="skills-page">
        <div className="skills-content">
          <p className="skills-eyebrow">Chapter 5 — Learning Never Retires</p>
          <h1>Skills</h1>

          {CATEGORIES.map((category) => (
            <SkillCategorySection category={category} key={category.title} />
          ))}
        </div>
      </div>
    </>
  );
}
