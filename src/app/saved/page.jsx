"use client";

import NavBar from "../../components/NavBar";
import "./saved.css";

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

export default function SavedPage() {
  return (
    <>
      <NavBar activePage="saved" largeAvatar />

      <div className="saved-page">
        <div className="saved-header">
          <p className="saved-eyebrow">My Library</p>
          <h1>Saved Content</h1>
          <p>Articles and episodes you&apos;ve bookmarked for later.</p>
        </div>

        <div className="saved-content">
          {SAVED_ARTICLES.length > 0
            ? (
              <div className="saved-grid">
                {SAVED_ARTICLES.map((item) => (
                  <div key={item.id} className="saved-card">
                    <div className="saved-card-img">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="saved-card-body">
                      <div className="saved-card-tag">{item.tag}</div>
                      <h4>{item.title}</h4>
                      <button type="button" className="saved-card-read">
                        Read →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
            : (
              <div className="saved-empty">
                <div className="saved-empty-icon">🔖</div>
                <h3>Nothing saved yet</h3>
                <p>
                  Bookmark articles and podcast episodes to find them here.
                </p>
                <a href="/articles" className="saved-empty-cta">
                  Browse Podcasts &amp; Articles →
                </a>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
