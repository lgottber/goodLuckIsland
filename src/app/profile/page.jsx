"use client";

import { useEffect, useState } from "react";
import { useAuth0 as useAuth0User } from "@auth0/auth0-react";
import NavBar from "../../components/NavBarDynamic";
import AvatarDisplay from "./AvatarDisplay";
import AvatarPickerModal from "./AvatarPickerModal";
import EditModal from "./EditModal";
import Icon from "./Icon";
import BioDisplay from "./BioDisplay";
import BioEmpty from "./BioEmpty";
import InterestsList from "./InterestsList";
import InterestsEmpty from "./InterestsEmpty";
import { supabase } from "../../lib/supabase.ts";
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
  mantra: "Purpose doesn't retire when you do.",
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

// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user: auth0User } = useAuth0User();
  const [user, setUser] = useState(INITIAL_USER);

  useEffect(() => {
    if (auth0User) {
      supabase.from("users").select("*").then(({ error }) => {
        if (error && process.env.NODE_ENV === "development") {
          console.error("Supabase error:", error);
        }
      });
    }
  }, [auth0User]);

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
  const [saved, setSaved] = useState(true);

  const initials = `${user.firstName?.[0] ?? "?"}${user.lastName?.[0] ?? "?"}`.toUpperCase();

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

      <NavBar activePage="profile" largeAvatar />

      <div className="profile-page">
        {/* ── BANNER ── */}
        <div className="profile-banner">
          <div className="profile-banner-wordart" aria-hidden="true">
            <span className="banner-mantra-ghost">{user.mantra}</span>
            <span className="banner-mantra-ghost banner-mantra-ghost--sm">
              {user.mantra}
            </span>
          </div>
          <div className="profile-banner-mantra">
            <span className="banner-mantra-quote">&ldquo;</span>
            <span className="banner-mantra-text">{user.mantra}</span>
            <span className="banner-mantra-quote">&rdquo;</span>
          </div>
        </div>

        {/* ── PROFILE HEADER ── */}
        <div className="profile-header-wrap">
          <div className="profile-header">
            <div className="profile-avatar-wrap">
              <AvatarDisplay
                avatarId={user.avatarId}
                avatarUrl={user.avatarUrl}
                initials={initials}
                size={120}
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
              <div className="profile-meta-row">
                <span className="profile-badge">🌴 Islander</span>
                {user.occupation && (
                  <span className="profile-occupation">
                    <Icon name="briefcase" size={13} />
                    {user.occupation}
                  </span>
                )}
                {user.location && (
                  <span className="profile-location">
                    <Icon name="location" size={13} />
                    {user.location}
                  </span>
                )}
              </div>
            </div>

            <div className="profile-header-actions">
              {!saved && <span className="saved-flash">✓ Saved!</span>}
              <button
                type="button"
                className="btn-cta-outline"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="profile-stats-wrap">
          <div className="profile-stats-row">
            <div className="profile-stat">
              <div className="profile-stat-num">{user.stats.articlesRead}</div>
              <div className="profile-stat-label">Articles Read</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">
                {user.stats.podcastsListened}
              </div>
              <div className="profile-stat-label">Podcasts</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">{user.stats.savedItems}</div>
              <div className="profile-stat-label">Saved Items</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">{user.stats.daysActive}</div>
              <div className="profile-stat-label">Days Active</div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="profile-content">
          {/* Bio card */}
          <div className="profile-card profile-card--bio">
            <p className="section-label-sm">About Me</p>
            {user.bio
              ? <BioDisplay bio={user.bio} />
              : <BioEmpty onEditClick={() => setEditing(true)} />}
          </div>

          {/* About & Interests row */}
          <div className="overview-two-col">
            {/* About */}
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
                <p className="info-row-value empty">
                  No details added yet.{" "}
                  <button
                    type="button"
                    className="inline-link"
                    onClick={() => setEditing(true)}
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
                ? <InterestsList interests={user.interests} />
                : <InterestsEmpty onEditClick={() => setEditing(true)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
