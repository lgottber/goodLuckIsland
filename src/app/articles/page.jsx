"use client";

import { useEffect, useState } from "react";
import { fetchArticles, fetchEpisodes } from "../../lib/articlesApi";
import NavBar from "../../components/NavBarDynamic";
import FilterTabs from "../../components/FilterTabs";
import ArticlesTab from "./ArticlesTab";
import PodcastTab from "./PodcastTab";
import VideoModal from "./VideoModal";
import "./articles.css";

// ─── Mock Articles — replace with your real CMS / database ───────────────────
const ALL_ARTICLES = [
  {
    id: 1,
    category: "Getting Ready for Retirement",
    title: "A Thoughtful Retirement Mindset for Gen X",
    excerpt:
      "What if the biggest obstacle to a great retirement isn't financial — it's psychological? We explore the mindset shifts that make all the difference.",
    date: "Mar 1, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Clear Thinking",
    title: "Popular Advice Isn't Always Helpful Advice",
    excerpt:
      "Loud guidance pushes urgency. Calm education builds confidence. Here's how to tell the difference — and why it matters more than ever.",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
  },
  {
    id: 3,
    category: "Whole-Life Wellness",
    title: "A Calm Place to Think About What Comes Next",
    excerpt:
      "Good Luck Island Collective exists to help you step out of the noise and into clarity — through learning, reflection, and thoughtful perspective.",
    date: "Feb 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: 4,
    category: "Whole-Life Wellness",
    title: "Whole-Life Wellness: What It Really Means After 50",
    excerpt:
      "Health isn't just physical. This piece reframes wellness as something that encompasses your relationships, your purpose, and your sense of self.",
    date: "Feb 8, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    id: 5,
    category: "Getting Ready for Retirement",
    title: "Planning for the Future Isn't About Predicting Every Outcome",
    excerpt:
      "It's about giving your future self more choices. It's progress, resilience, and peace of mind — not a perfect plan.",
    date: "Feb 1, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
  },
  {
    id: 6,
    category: "Clear Thinking",
    title: "The Identity Problem Nobody Talks About in Retirement",
    excerpt:
      "For decades, work has been who you are. So what happens when it ends? The answer to this question might matter more than your 401(k) balance.",
    date: "Jan 25, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 7,
    category: "Financial Independence",
    title: "What 'Enough' Really Means — And Why the Number Isn't the Point",
    excerpt:
      "Most people chase a retirement number without ever defining what enough actually feels like. This piece helps you start with the feeling instead.",
    date: "Jan 18, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
];

// ─── Mock Episodes — replace with your real data / CMS ───────────────────────
const EPISODES = [
  {
    id: 1,
    num: "EP. 01",
    title: "Rethinking Retirement, One Choice at a Time",
    desc:
      "What if the biggest mistake Gen X makes isn't financial — it's not knowing what they actually want? We kick off the show by questioning everything you've been told about retirement.",
    date: "Mar 1, 2026",
    duration: "42 min",
    youtubeId: "YOUTUBE_ID_1",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    num: "EP. 02",
    title: "The Advisor Who Actually Works for You",
    desc:
      "Not all financial advisors are created equal. We break down how to spot the ones who are selling Cool Aid — and how to find the rare ones who actually have your back.",
    date: "Feb 22, 2026",
    duration: "38 min",
    youtubeId: "YOUTUBE_ID_2",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    id: 3,
    num: "EP. 03",
    title: "What Whole-Life Wellness Really Means After 50",
    desc:
      "Health isn't just about your body. It's about your mind, your relationships, your sense of purpose. This episode reframes what it means to actually be well going into retirement.",
    date: "Feb 15, 2026",
    duration: "45 min",
    youtubeId: "YOUTUBE_ID_3",
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    id: 4,
    num: "EP. 04",
    title: "The Identity Problem Nobody Talks About",
    desc:
      "For decades, work has been who you are. So what happens when it's gone? We talk candidly about the identity crisis that catches so many retirees off guard — and how to get ahead of it.",
    date: "Feb 8, 2026",
    duration: "51 min",
    youtubeId: "YOUTUBE_ID_4",
    thumbnail:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: 5,
    num: "EP. 05",
    title: "A Thoughtful Retirement Mindset for Gen X",
    desc:
      "Gen X got sandwiched — between Boomers who changed the rules and Millennials who got the apps. This episode is about owning your unique position and planning on your own terms.",
    date: "Feb 1, 2026",
    duration: "36 min",
    youtubeId: "YOUTUBE_ID_5",
    thumbnail:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
  },
  {
    id: 6,
    num: "EP. 06",
    title: "Popular Advice Isn't Always Helpful Advice",
    desc:
      "Loud doesn't mean right. In this episode we dig into the most repeated retirement advice that sounds wise but often leads people astray — and what to think instead.",
    date: "Jan 25, 2026",
    duration: "40 min",
    youtubeId: "YOUTUBE_ID_6",
    thumbnail:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
  },
];

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("articles");
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [modalEpisode, setModalEpisode] = useState(null);
  const [episodes, setEpisodes] = useState(EPISODES);
  const [allArticles, setAllArticles] = useState(ALL_ARTICLES);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedEpisodes, articles] = await Promise.all([
          fetchEpisodes(),
          fetchArticles(),
        ]);
        if (fetchedEpisodes.length) setEpisodes(fetchedEpisodes);
        if (articles.length) setAllArticles(articles);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  let featured = null;
  const filtered = [];
  for (const a of allArticles) {
    if (a.featured) {
      featured = a;
      continue;
    }
    if (activeCategory === "All" || a.category === activeCategory) {
      filtered.push(a);
    }
  }

  const podcastFeatured = episodes[0];
  const podcastRest = episodes.slice(1);

  return (
    <>
      <NavBar activePage="articles" largeAvatar />

      <div className="articles-page">
        {/* ── HEADER ── */}
        <div className="articles-header">
          <span className="articles-header-eyebrow">Member Content</span>
          <h1>Podcasts &amp; Articles</h1>
          <p>
            Honest conversations and thoughtful reading for Gen X professionals
            preparing for retirement — focused on whole-life wellness, clear
            thinking, and intentional choices.
          </p>
        </div>

        {/* ── TAB SWITCHER ── */}
        <FilterTabs
          containerClass="content-tabs"
          buttonClass="content-tab"
          items={[
            { label: "📖 Articles", value: "articles" },
            { label: "🎬 Podcast", value: "podcast" },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* ── ARTICLES TAB ── */}
        {activeTab === "articles" && (
          <ArticlesTab
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            featured={featured}
            filtered={filtered}
          />
        )}

        {/* ── PODCAST TAB ── */}
        {activeTab === "podcast" && (
          <PodcastTab
            podcastFeatured={podcastFeatured}
            podcastRest={podcastRest}
            featuredPlaying={featuredPlaying}
            setFeaturedPlaying={setFeaturedPlaying}
            setModalEpisode={setModalEpisode}
          />
        )}
      </div>

      {/* ── VIDEO MODAL ── */}
      {modalEpisode && (
        <VideoModal
          episode={modalEpisode}
          onClose={() => setModalEpisode(null)}
        />
      )}
    </>
  );
}
