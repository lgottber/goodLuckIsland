"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSubmitFeedback } from "../../hooks/useSubmitFeedback";
import { useAuth0 as useAuth0User } from "@auth0/auth0-react";
import NavBar from "../../components/NavBarDynamic";
import AvatarDisplay from "./AvatarDisplay";
import AvatarPickerModal from "./AvatarPickerModal";
import EditModal from "./EditModal";
import Icon from "./Icon";
import FlashMessage from "./FlashMessage";
import BioDisplay from "./BioDisplay";
import BioEmpty from "./BioEmpty";
import InterestsSection from "./InterestsSection";
import RecommendationsTable from "./RecommendationsTable";
import { createUser, upsertProfile, updateNotificationPrefs, updateInAppNotificationPrefs, deleteAccount } from "../../lib/profileApi";
import BackpackDashboardSection from "./BackpackDashboardSection";
import { useUserDataStore } from "../../lib/stores/userDataStore";
import { setPendingAccountDeletion } from "../../lib/pendingAccountDeletion";
import NotificationPrefsModal from "./NotificationPrefsModal";
import DeleteAccountModal from "./DeleteAccountModal";
import QuizNudgeCard from "../quiz/QuizNudgeCard";
import type { Tables } from "../../types/supabase";
import { downloadProfileDataCsv } from "../../lib/exportUtils";
import { trackEvent } from "../../lib/analyticsApi";
import type { ResetStatus } from "./types";
import ProfileMetaItem from "./ProfileMetaItem";
import InfoRow from "./InfoRow";
import ProfileInfoEmpty from "./ProfileInfoEmpty";
import ProfileActionsMenu from "./ProfileActionsMenu";
import ContactForm, { ContactFormData } from "../about/ContactForm";
import ContactFormSuccess from "../about/ContactFormSuccess";
import { ApiError } from "../../lib/apiClient";
import { submitTestimonial } from "../../lib/testimonialsApi";
import { formatMemberSince } from "./memberSince";
import { fetchProfileStats } from "../../lib/profileStatsApi";
import "./profile.css";

function unresolvedStat(): number | null {
  return null;
}

const INITIAL_USER = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  location: "",
  zipCode: "",
  city: "",
  state: "",
  address: "",
  avatarUrl: "",
  avatarId: "",
  bio: "",
  mantra: "Peace of mind, planned for.",
  memberSince: "",
  stats: {
    articlesRead: unresolvedStat(),
    podcastsListened: unresolvedStat(),
    savedItems: unresolvedStat(),
    daysActive: unresolvedStat(),
  },
  age: "",
  occupation: "",
  yearsInOccupation: "",
  education: "",
  retired: "",
  retirementDate: "",
  retirementDateReason: "",
  maritalStatus: "",
  divorced: "",
  kids: "",
  homePaidOff: "",
  workingIncome: "",
  netWorth: "",
  gender: "",
  householdComposition: "",
  geoClassifier: "",
  employmentStatus: "",
  industry: "",
  yearsUntilRetirement: "",
  retirementConfidence: "",
  lifeSatisfaction: "",
  senseOfPurpose: "",
  stressLevel: "",
  optimism: "",
  lonelinessConnection: "",
  retirementIdentity: "",
  retirementVisionClarity: "",
  retirementMotivations: new Array<string>(),
  retirementConcerns: new Array<string>(),
  idealRetirementDay: "",
};


// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user: auth0User, logout } = useAuth0User();
  const [user, setUser] = useState(INITIAL_USER);
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsInApp, setNotificationsInApp] = useState(true);
  const progress = useUserDataStore((state) => state.progress);
  const storedProfile = useUserDataStore((state) => state.profile);
  const profileStatus = useUserDataStore((state) => state.profileStatus);
  const ensureProfile = useUserDataStore((state) => state.ensureProfile);
  const ensureProgress = useUserDataStore((state) => state.ensureProgress);
  const invalidateProfile = useUserDataStore((state) => state.invalidateProfile);
  const setStoredProfile = useUserDataStore((state) => state.setProfile);
  const savedItems = useUserDataStore((state) => state.saved);
  const savedStatus = useUserDataStore((state) => state.savedStatus);
  const ensureSaved = useUserDataStore((state) => state.ensureSaved);
  const [initError, setInitError] = useState(false);

  function applySupabaseFields(
    prev: typeof INITIAL_USER,
    data: Tables<"users">,
    picture: string | undefined,
  ) {
    return {
      ...prev,
      firstName: data.first_name ?? prev.firstName,
      lastName: data.last_name ?? prev.lastName,
      email: data.email ?? prev.email,
      username: data.username ?? prev.username,
      location: data.location ?? prev.location,
      zipCode: data.zip_code ?? prev.zipCode,
      city: data.city ?? prev.city,
      state: data.state ?? prev.state,
      bio: data.bio ?? prev.bio,
      mantra: data.mantra ?? prev.mantra,
      occupation: data.occupation ?? prev.occupation,
      education: data.education ?? prev.education,
      retired: data.retired ?? prev.retired,
      retirementDate: data.retirement_date ?? prev.retirementDate,
      retirementDateReason: data.retirement_date_reason ?? prev.retirementDateReason,
      maritalStatus: data.marital_status ?? prev.maritalStatus,
      divorced: data.divorced ?? prev.divorced,
      kids: data.kids ?? prev.kids,
      homePaidOff: data.home_paid_off ?? prev.homePaidOff,
      workingIncome: data.working_income ?? prev.workingIncome,
      netWorth: data.net_worth ?? prev.netWorth,
      avatarId: data.avatar_id ?? prev.avatarId,
      age: data.age != null ? String(data.age) : prev.age,
      yearsInOccupation:
        data.years_in_occupation != null
          ? String(data.years_in_occupation)
          : prev.yearsInOccupation,
      avatarUrl: data.avatar_id ? "" : (picture ?? prev.avatarUrl),
      gender: data.gender ?? prev.gender,
      householdComposition: data.household_composition ?? prev.householdComposition,
      geoClassifier: data.geo_classifier ?? prev.geoClassifier,
      employmentStatus: data.employment_status ?? prev.employmentStatus,
      industry: data.industry ?? prev.industry,
      yearsUntilRetirement: data.years_until_retirement ?? prev.yearsUntilRetirement,
      retirementConfidence:
        data.retirement_confidence != null ? String(data.retirement_confidence) : prev.retirementConfidence,
      lifeSatisfaction:
        data.life_satisfaction != null ? String(data.life_satisfaction) : prev.lifeSatisfaction,
      senseOfPurpose:
        data.sense_of_purpose != null ? String(data.sense_of_purpose) : prev.senseOfPurpose,
      stressLevel: data.stress_level != null ? String(data.stress_level) : prev.stressLevel,
      optimism: data.optimism != null ? String(data.optimism) : prev.optimism,
      lonelinessConnection:
        data.loneliness_connection != null ? String(data.loneliness_connection) : prev.lonelinessConnection,
      retirementIdentity: data.retirement_identity ?? prev.retirementIdentity,
      retirementVisionClarity:
        data.retirement_vision_clarity != null
          ? String(data.retirement_vision_clarity)
          : prev.retirementVisionClarity,
      retirementMotivations: data.retirement_motivations ?? prev.retirementMotivations,
      retirementConcerns: data.retirement_concerns ?? prev.retirementConcerns,
      idealRetirementDay: data.ideal_retirement_day ?? prev.idealRetirementDay,
      memberSince: formatMemberSince(data.created_at) || prev.memberSince,
    };
  }

  // Seed from Auth0 immediately, then trigger the shared profile/progress
  // fetch (skipped if another consumer -- e.g. NavBar -- already loaded it
  // this session) and overlay it once it lands.
  useEffect(() => {
    if (!auth0User) return;
    const a0 = auth0User;

    setUser((prev) => {
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
    });

    ensureProfile(a0.sub ?? "");
    ensureProgress(a0.sub ?? "");
    ensureSaved(a0.sub ?? "");
  }, [auth0User, ensureProfile, ensureProgress, ensureSaved]);

  // Saved-items count comes from the shared store (same source as the
  // Backpack "Saved" tab); the other three stats come from Analytics Engine.
  useEffect(() => {
    if (savedStatus !== "loaded") return;
    setUser((prev) => ({
      ...prev,
      stats: { ...prev.stats, savedItems: savedItems.length },
    }));
  }, [savedItems, savedStatus]);

  useEffect(() => {
    if (!auth0User?.sub) return;
    fetchProfileStats()
      .then((stats) =>
        setUser((prev) => ({ ...prev, stats: { ...prev.stats, ...stats } })),
      )
      .catch(() => {});
  }, [auth0User?.sub]);

  useEffect(() => {
    if (!auth0User || profileStatus !== "loaded") return;
    if (!storedProfile) {
      createUser(auth0User.sub ?? "", auth0User.email ?? "")
        .then(() => {
          invalidateProfile();
          ensureProfile(auth0User.sub ?? "");
        })
        .catch(() => setInitError(true));
      return;
    }
    setUser((prev) => applySupabaseFields(prev, storedProfile, auth0User.picture));
    setNotificationsEmail(storedProfile.notifications_email);
    setNotificationsInApp(storedProfile.notifications_in_app);
  }, [auth0User, storedProfile, profileStatus, invalidateProfile, ensureProfile]);

  useEffect(() => {
    if (profileStatus === "error") setInitError(true);
  }, [profileStatus]);

  const [editing, setEditing] = useState(false);
  const [pickingAvatar, setPickingAvatar] = useState(false);
  const [saved, triggerSaved] = useSubmitFeedback(2000);
  const [resetStatus, setResetStatus] = useState<ResetStatus>("idle");
  const [exportStatus, setExportStatus] = useState("idle"); // idle | exporting | done | error
  const [showNotifPrefs, setShowNotifPrefs] = useState(false);
  const [notifSaving, setNotifSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletionScheduled, setDeletionScheduled] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");

  async function handleContactSubmit() {
    if (!contactForm.email || !contactForm.message || contactSubmitting) return;
    setContactSubmitting(true);
    setContactError("");
    try {
      await submitTestimonial(contactForm);
      setContactSubmitted(true);
      setContactForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      setContactError(
        err instanceof ApiError && err.status === 429
          ? "You've submitted a few of these already — please try again later."
          : "Something went wrong sending your message. Please try again.",
      );
    } finally {
      setContactSubmitting(false);
    }
  }

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
      if (res.ok) trackEvent("password_reset_requested");
    } catch {
      setResetStatus("error");
    }
  }

  function exportLabel() {
    if (exportStatus === "exporting") return "Exporting…";
    if (exportStatus === "done") return "Exported!";
    if (exportStatus === "error") return "Export failed";
    return "Export My Data";
  }

  async function handleExportData() {
    if (!auth0User?.sub) return;
    setExportStatus("exporting");
    try {
      await downloadProfileDataCsv(auth0User.sub);
      setExportStatus("done");
      trackEvent("profile_data_exported");
      setTimeout(() => setExportStatus("idle"), 3000);
    } catch {
      setExportStatus("error");
    }
  }

  const flash = saved
    ? { message: "Saved!", error: false }
    : resetStatus === "sent"
    ? { message: "Reset email sent!", error: false }
    : initError
    ? { message: "Couldn't load your profile. Please refresh.", error: true }
    : resetStatus === "error"
    ? { message: "Something went wrong", error: true }
    : null;

  const initials =
    `${user.firstName?.[0] ?? "?"}${user.lastName?.[0] ?? "?"}`.toUpperCase();

  async function persistProfile(updated: typeof INITIAL_USER) {
    if (!auth0User) {
      throw new Error("persistProfile called without an authenticated user");
    }
    await upsertProfile(auth0User.sub ?? "", updated);
  }

  async function handleToggleEmail(enabled: boolean) {
    if (!auth0User?.sub) return;
    setNotifSaving(true);
    try {
      await updateNotificationPrefs(auth0User.sub, enabled);
      setNotificationsEmail(enabled);
      trackEvent("notification_prefs_changed", { emailEnabled: enabled });
    } finally {
      setNotifSaving(false);
    }
  }

  async function handleToggleInApp(enabled: boolean) {
    if (!auth0User?.sub) return;
    setNotifSaving(true);
    try {
      await updateInAppNotificationPrefs(auth0User.sub, enabled);
      setNotificationsInApp(enabled);
      trackEvent("notification_prefs_changed", { inAppEnabled: enabled });
    } finally {
      setNotifSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!auth0User?.sub) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      setPendingAccountDeletion();
      setDeletionScheduled(true);
      trackEvent("account_deletion_requested");
      logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setDeleting(false);
    }
  }

  async function handleSave(updated: typeof INITIAL_USER) {
    setEditing(false);
    // Keep `location` ("City, State") in sync with the structured
    // city/state fields so the existing profile display, admin panel, and
    // CSV export -- which all still read `location` -- don't need to change.
    const withLocation = {
      ...updated,
      location: [updated.city, updated.state].filter(Boolean).join(", "),
    };
    await persistProfile(withLocation);
    setUser(withLocation);
    // upsertProfile doesn't hand back the canonical row -- invalidate so the
    // next ensureProfile call (this refetch, plus NavBar/backpack on their
    // next mount) picks up what was just saved instead of a stale cache.
    invalidateProfile();
    if (auth0User?.sub) ensureProfile(auth0User.sub);
    triggerSaved();
    trackEvent("profile_saved");
  }

  function handleAvatarSelect(id: string) {
    const updated = { ...user, avatarId: id, avatarUrl: "" };
    setUser(updated);
    if (storedProfile) setStoredProfile({ ...storedProfile, avatar_id: id });
    persistProfile(updated);
    trackEvent("avatar_changed", { avatarId: id });
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
      {showNotifPrefs && (
        <NotificationPrefsModal
          emailEnabled={notificationsEmail}
          inAppEnabled={notificationsInApp}
          saving={notifSaving}
          onToggleEmail={handleToggleEmail}
          onToggleInApp={handleToggleInApp}
          onClose={() => setShowNotifPrefs(false)}
        />
      )}
      {showDeleteConfirm && (
        <DeleteAccountModal
          deleting={deleting}
          error={deleteError}
          scheduled={deletionScheduled}
          onConfirm={handleDeleteAccount}
          onClose={() => { setShowDeleteConfirm(false); setDeleteError(null); }}
        />
      )}

      <NavBar activePage="profile" largeAvatar avatarId={user.avatarId} />

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
                size={180}
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
                  <span className="profile-badge">
                    <Icon name="palm" size={12} /> Islander
                  </span>
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

            <div className="profile-header-actions">
              {flash && (
                <FlashMessage message={flash.message} error={flash.error} />
              )}
              <ProfileActionsMenu
                exportStatus={exportStatus}
                exportLabel={exportLabel}
                onExport={handleExportData}
                resetStatus={resetStatus}
                onResetPassword={handlePasswordReset}
                onNotifications={() => setShowNotifPrefs(true)}
                onDeleteAccount={() => setShowDeleteConfirm(true)}
              />
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
            <Link href="/articles?tab=articles" className="profile-stat profile-stat--link">
              <div className="profile-stat-num">{user.stats.articlesRead ?? "—"}</div>
              <div className="profile-stat-label">Articles Read</div>
            </Link>
            <Link href="/articles?tab=podcast" className="profile-stat profile-stat--link">
              <div className="profile-stat-num">
                {user.stats.podcastsListened ?? "—"}
              </div>
              <div className="profile-stat-label">Podcasts</div>
            </Link>
            <Link href="/backpack?tab=saved" className="profile-stat profile-stat--link">
              <div className="profile-stat-num">{user.stats.savedItems ?? "—"}</div>
              <div className="profile-stat-label">Saved Items</div>
            </Link>
            <div className="profile-stat">
              <div className="profile-stat-num">{user.stats.daysActive ?? "—"}</div>
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

          <QuizNudgeCard />

          <BackpackDashboardSection progress={progress} />

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
              <InterestsSection />
            </div>
          </div>

          <RecommendationsTable />

          {/* Contact Nick card */}
          <div className="profile-card profile-card--contact">
            <h3>Send Nick a Message</h3>
            <p>
              Have a question, an idea, or just want to say hello? Drop Nick a
              message below.
            </p>
            {contactSubmitted ? (
              <ContactFormSuccess />
            ) : (
              <ContactForm
                formData={contactForm}
                onChange={setContactForm}
                submitting={contactSubmitting}
                error={contactError}
                onSubmit={handleContactSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
