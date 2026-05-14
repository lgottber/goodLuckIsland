"use client";

import { useEffect, useState } from "react";
import { useAuth0 as useAuth0User } from "@auth0/auth0-react";
import NavBar from "../../components/NavBarDynamic";
import AvatarDisplay from "./AvatarDisplay";
import AvatarPickerModal from "./AvatarPickerModal";
import EditModal from "./EditModal";
import Icon from "./Icon";
import FlashMessage from "./FlashMessage";
import BioDisplay from "./BioDisplay";
import BioEmpty from "./BioEmpty";
import InterestsList from "./InterestsList";
import InterestsEmpty from "./InterestsEmpty";
import { createUser, fetchProfile, upsertProfile } from "../../lib/profileApi";
import ProfileMetaItem from "./ProfileMetaItem";
import InfoRow from "./InfoRow";
import ProfileInfoEmpty from "./ProfileInfoEmpty";
import "./profile.css";

const INITIAL_USER = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  location: "",
  address: "",
  avatarUrl: "",
  avatarId: "",
  bio: "",
  mantra: "enter your mantra here",
  memberSince: "",
  interests: new Array<string>(),
  stats: {
    articlesRead: 0,
    podcastsListened: 0,
    savedItems: 0,
    daysActive: 0,
  },
  age: "",
  occupation: "",
  yearsInOccupation: "",
  education: "",
  retired: "",
  retirementDate: "",
  maritalStatus: "",
  divorced: "",
  kids: "",
  homePaidOff: "",
  workingIncome: "",
  netWorth: "",
};

const DB_TO_STATE: Record<string, keyof typeof INITIAL_USER> = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  username: "username",
  location: "location",
  bio: "bio",
  mantra: "mantra",
  interests: "interests",
  occupation: "occupation",
  education: "education",
  retired: "retired",
  retirement_date: "retirementDate",
  marital_status: "maritalStatus",
  divorced: "divorced",
  kids: "kids",
  home_paid_off: "homePaidOff",
  working_income: "workingIncome",
  net_worth: "netWorth",
  avatar_id: "avatarId",
};

// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user: auth0User } = useAuth0User();
  const [user, setUser] = useState(INITIAL_USER);

  // Seed from Auth0 then overlay saved profile from Supabase
  useEffect(() => {
    if (!auth0User) return;
    const a0 = auth0User;

    function applyAuth0Fields(prev: typeof INITIAL_USER) {
      const nameParts = a0.name?.split(" ") ?? [];
      const firstName = a0.given_name ?? nameParts[0] ?? prev.firstName;
      const lastName =
        a0.family_name ?? nameParts.slice(1).join(" ") ?? prev.lastName;
      return {
        ...prev,
        firstName,
        lastName,
        email: a0.email ?? prev.email,
        avatarUrl: a0.picture ?? prev.avatarUrl,
        username: a0.nickname ? `@${a0.nickname}` : prev.username,
      };
    }

    function applySupabaseFields(prev: typeof INITIAL_USER, data: Record<string, unknown>) {
      const merged: typeof INITIAL_USER = { ...prev };
      for (const [dbKey, stateKey] of Object.entries(DB_TO_STATE)) {
        Object.assign(merged, { [stateKey]: data[dbKey] ?? prev[stateKey] });
      }
      return {
        ...merged,
        age: data.age != null ? String(data.age) : prev.age,
        yearsInOccupation:
          data.years_in_occupation != null
            ? String(data.years_in_occupation)
            : prev.yearsInOccupation,
        avatarUrl: data.avatar_id ? "" : (a0.picture ?? prev.avatarUrl),
      };
    }

    setUser(applyAuth0Fields);
    fetchProfile(a0.sub ?? "").then(async (data) => {
      if (!data) {
        await createUser(a0.sub ?? "", a0.email ?? "");
        return;
      }
      if (data) setUser((prev) => applySupabaseFields(prev, data));
    });
  }, [auth0User]);
  const [editing, setEditing] = useState(false);
  const [pickingAvatar, setPickingAvatar] = useState(false);
  const [saved, setSaved] = useState(true);
  const [resetStatus, setResetStatus] = useState("idle"); // idle | sending | sent | error

  async function handlePasswordReset() {
    if (!auth0User?.email) {
      throw new Error(
        "handlePasswordReset called without an authenticated user",
      );
    }
    setResetStatus("sending");
    try {
      const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/dbconnections/change_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            email: auth0User.email,
            connection: "Username-Password-Authentication",
          }),
        },
      );
      setResetStatus(res.ok ? "sent" : "error");
    } catch {
      setResetStatus("error");
    }
  }

  const initials =
    `${user.firstName?.[0] ?? "?"}${user.lastName?.[0] ?? "?"}`.toUpperCase();

  function persistProfile(updated: typeof INITIAL_USER) {
    if (!auth0User) {
      throw new Error("persistProfile called without an authenticated user");
    }
    upsertProfile(auth0User.sub ?? "", updated);
  }

  async function handleSave(updated: typeof INITIAL_USER) {
    setUser(updated);
    setEditing(false);
    setSaved(false);
    persistProfile(updated);
    setTimeout(() => setSaved(true), 2000);
  }

  function handleAvatarSelect(id: string) {
    const updated = { ...user, avatarId: id, avatarUrl: "" };
    setUser(updated);
    persistProfile(updated);
  }

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
          onSelect={handleAvatarSelect}
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
            <div className="profile-header-left">
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
                <h1>
                  {user.firstName} {user.lastName}
                </h1>
                <p className="profile-handle">{user.username}</p>
                <div className="profile-meta-row">
                  <span className="profile-badge"><Icon name="palm" size={12} /> Islander</span>
                  {user.occupation && (
                    <ProfileMetaItem
                      className="profile-occupation"
                      iconName="briefcase"
                      value={user.occupation}
                    />
                  )}
                  {user.location && (
                    <ProfileMetaItem
                      className="profile-location"
                      iconName="location"
                      value={user.location}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="profile-header-actions">
              {!saved && <FlashMessage message={<><Icon name="check" size={13} /> Saved!</>} />}
              {resetStatus === "sent" && (
                <FlashMessage message={<><Icon name="check" size={13} /> Reset email sent!</>} />
              )}
              {resetStatus === "error" && (
                <FlashMessage message="Something went wrong" error />
              )}
              <button
                type="button"
                className="btn-ghost-sm"
                onClick={handlePasswordReset}
                disabled={resetStatus === "sending" || resetStatus === "sent"}
              >
                {resetStatus === "sending" ? "Sending…" : "Reset Password"}
              </button>
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
            {user.bio ? (
              <BioDisplay bio={user.bio} />
            ) : (
              <BioEmpty onEditClick={() => setEditing(true)} />
            )}
          </div>

          {/* About & Interests row */}
          <div className="overview-two-col">
            {/* About */}
            <div className="profile-card">
              <h3>About</h3>
              {user.occupation && (
                <InfoRow
                  iconName="briefcase"
                  label="Occupation"
                  value={user.occupation}
                />
              )}
              {user.location && (
                <InfoRow
                  iconName="location"
                  label="Location"
                  value={user.location}
                />
              )}
              {user.email && (
                <InfoRow iconName="mail" label="Email" value={user.email} />
              )}
              <InfoRow
                iconName="calendar"
                label="Member Since"
                value={user.memberSince}
              />
              {!user.occupation && !user.location && (
                <ProfileInfoEmpty onEdit={() => setEditing(true)} />
              )}
            </div>

            {/* Interests */}
            <div className="profile-card">
              <h3>Interests</h3>
              {user.interests.length > 0 ? (
                <InterestsList interests={user.interests} />
              ) : (
                <InterestsEmpty onEditClick={() => setEditing(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
