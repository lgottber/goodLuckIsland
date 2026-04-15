"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { sendMassEmail } from "../../lib/emailApi.ts";
import {
  type Article,
  type BackpackSection,
  deleteArticle,
  deleteBackpackSection,
  deleteEpisode,
  type Episode,
  fetchAdminArticles,
  fetchAdminBackpackSections,
  fetchAdminEpisodes,
  fetchUsers,
  insertArticle,
  insertBackpackSection,
  insertEpisode,
  isAdmin as checkIsAdmin,
  updateArticle,
  updateBackpackSection,
  updateEpisode,
  type UserRecord,
} from "../../lib/adminApi.ts";
import NavBar from "../../components/NavBarDynamic";
import AdminNavButton from "./AdminNavButton";
import ComposeEmailPanel from "./ComposeEmailPanel";
import EmptyForm from "./EmptyForm";
import EditPanel from "./EditPanel";
import Field from "./Field";
import ListItemButton from "./ListItemButton";
import NewItemButton from "./NewItemButton";
import ReadField from "./ReadField";
import Toggle from "./Toggle";
import UserListItem from "./UserListItem";
import "./admin.css";

// ─── Types ────────────────────────────────────────────────────────────────────
type SaveStatus = "idle" | "saved" | "error";
type EmailStatus = "idle" | "sending" | "sent" | "error";
type ActiveSection = "episodes" | "articles" | "sections" | "users" | "emails";

// ─── Blanks ───────────────────────────────────────────────────────────────────
const EPISODE_BLANK: Omit<Episode, "id"> = {
  num: "",
  title: "",
  description: "",
  date: "",
  duration: "",
  "youtube_id": "",
  thumbnail: "",
  "sort_order": 0,
};
const ARTICLE_BLANK: Omit<Article, "id"> = {
  category: "",
  title: "",
  excerpt: "",
  date: "",
  "read_time": "",
  image: "",
  featured: false,
  "sort_order": 0,
};
const SECTION_BLANK: Omit<BackpackSection, "id"> = {
  slug: "",
  label: "",
  emoji: "",
  color: "#2e8b7a",
  tagline: "",
  description: "",
  type: "coming-soon",
  "sort_order": 0,
};

const ARTICLE_CATEGORIES = [
  "Getting Ready for Retirement",
  "Whole-Life Wellness",
  "Clear Thinking",
  "Financial Independence",
];

const SECTION_TYPES = ["challenge", "coming-soon"];

interface NavItem {
  id: ActiveSection;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "episodes", icon: "🎬", label: "Podcast Episodes" },
  { id: "articles", icon: "📖", label: "Articles" },
  { id: "sections", icon: "🎒", label: "Backpack Sections" },
  { id: "users", icon: "👥", label: "Users" },
  { id: "emails", icon: "✉️", label: "Send Email" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { user, isLoading, getIdTokenClaims } = useAuth0();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("episodes");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEp, setSelectedEp] = useState("");
  const [epForm, setEpForm] = useState<Omit<Episode, "id">>({
    ...EPISODE_BLANK,
  });
  const [epSaving, setEpSaving] = useState(false);
  const [epStatus, setEpStatus] = useState<SaveStatus>("idle");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArt, setSelectedArt] = useState<string | null>(null);
  const [artForm, setArtForm] = useState<Omit<Article, "id">>({
    ...ARTICLE_BLANK,
  });
  const [artSaving, setArtSaving] = useState(false);
  const [artStatus, setArtStatus] = useState<SaveStatus>("idle");
  const [bpSections, setBpSections] = useState<BackpackSection[]>([]);
  const [selectedBp, setSelectedBp] = useState<string | null>(null);
  const [bpForm, setBpForm] = useState<Omit<BackpackSection, "id">>({
    ...SECTION_BLANK,
  });
  const [bpSaving, setBpSaving] = useState(false);
  const [bpStatus, setBpStatus] = useState<SaveStatus>("idle");
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailSentCount, setEmailSentCount] = useState(0);

  // ── Episodes CRUD ──
  async function saveEp() {
    setEpSaving(true);
    setEpStatus("idle");
    try {
      if (selectedEp === "new") {
        await insertEpisode(epForm);
      } else {
        await updateEpisode(selectedEp!, epForm);
      }
      setEpStatus("saved");
      const refreshed = await fetchAdminEpisodes();
      setEpisodes(refreshed);
      if (selectedEp === "new" && refreshed.length) {
        const last = refreshed[refreshed.length - 1];
        setSelectedEp(last.id!);
        setEpForm(last);
      }
    } catch (error) {
      console.error(error);
      setEpStatus("error");
    }
    setEpSaving(false);
  }
  async function deleteEp() {
    if (
      !selectedEp || selectedEp === "new" || !confirm("Delete this episode?")
    ) return;
    await deleteEpisode(selectedEp);
    setEpisodes((p) => p.filter((e) => e.id !== selectedEp));
    setSelectedEp("");
    setEpForm({ ...EPISODE_BLANK });
  }

  // ── Articles CRUD ──
  async function saveArt() {
    setArtSaving(true);
    setArtStatus("idle");
    try {
      if (selectedArt === "new") {
        await insertArticle(artForm);
      } else {
        await updateArticle(selectedArt!, artForm);
      }
      setArtStatus("saved");
      const refreshed = await fetchAdminArticles();
      setArticles(refreshed);
      if (selectedArt === "new" && refreshed.length) {
        const last = refreshed[refreshed.length - 1];
        setSelectedArt(last.id!);
        setArtForm(last);
      }
    } catch (error) {
      console.error(error);
      setArtStatus("error");
    }
    setArtSaving(false);
  }
  async function deleteArt() {
    if (
      !selectedArt || selectedArt === "new" || !confirm("Delete this article?")
    ) return;
    await deleteArticle(selectedArt);
    setArticles((p) => p.filter((a) => a.id !== selectedArt));
    setSelectedArt(null);
    setArtForm({ ...ARTICLE_BLANK });
  }

  // ── Backpack sections CRUD ──
  async function saveBp() {
    setBpSaving(true);
    setBpStatus("idle");
    try {
      if (selectedBp === "new") {
        await insertBackpackSection(bpForm);
      } else {
        await updateBackpackSection(selectedBp!, bpForm);
      }
      setBpStatus("saved");
      const refreshed = await fetchAdminBackpackSections();
      setBpSections(refreshed);
      if (selectedBp === "new" && refreshed.length) {
        const last = refreshed[refreshed.length - 1];
        setSelectedBp(last.id!);
        setBpForm(last);
      }
    } catch (error) {
      console.error(error);
      setBpStatus("error");
    }
    setBpSaving(false);
  }
  async function deleteBp() {
    if (
      !selectedBp || selectedBp === "new" || !confirm("Delete this section?")
    ) return;
    await deleteBackpackSection(selectedBp);
    setBpSections((p) => p.filter((s) => s.id !== selectedBp));
    setSelectedBp(null);
    setBpForm({ ...SECTION_BLANK });
  }

  // ── Email ──
  async function handleSendEmail() {
    if (!emailSubject.trim() || !emailBody.trim()) return;
    if (!confirm(`Send this email to all ${users.length} users?`)) return;
    setEmailStatus("sending");
    try {
      const claims = await getIdTokenClaims();
      const token = claims?.__raw;
      if (!token) throw new Error("No auth token");
      const { sent } = await sendMassEmail(token, emailSubject, emailBody);
      setEmailSentCount(sent);
      setEmailStatus("sent");
      setEmailSubject("");
      setEmailBody("");
    } catch (error) {
      console.error(error);
      setEmailStatus("error");
    }
  }

  // ── Select item ──
  function selectEpisode(ep: Episode) {
    setSelectedEp(ep.id!);
    setEpForm(ep);
    setEpStatus("idle");
  }

  function selectArticle(art: Article) {
    setSelectedArt(art.id!);
    setArtForm(art);
    setArtStatus("idle");
  }

  function selectSection(s: BackpackSection) {
    setSelectedBp(s.id!);
    setBpForm(s);
    setBpStatus("idle");
  }

  // ── New item ──
  function handleNewItem() {
    switch (activeSection) {
      case "episodes":
        setSelectedEp("new");
        setEpForm({ ...EPISODE_BLANK });
        setEpStatus("idle");
        break;
      case "articles":
        setSelectedArt("new");
        setArtForm({ ...ARTICLE_BLANK });
        setArtStatus("idle");
        break;
      case "sections":
        setSelectedBp("new");
        setBpForm({ ...SECTION_BLANK });
        setBpStatus("idle");
        break;
    }
  }

  // ── Nav switch ──
  function switchSection(s: ActiveSection) {
    setActiveSection(s);
    setSelectedEp("");
    setEpForm({ ...EPISODE_BLANK });
    setEpStatus("idle");
    setSelectedArt(null);
    setArtForm({ ...ARTICLE_BLANK });
    setArtStatus("idle");
    setSelectedBp(null);
    setBpForm({ ...SECTION_BLANK });
    setBpStatus("idle");
    setSelectedUser(null);
    setEmailStatus("idle");
  }

  // ── Auth ──
  useEffect(() => {
    if (isLoading || !user) return;
    async function verifyAdmin() {
      try {
        const admin = await checkIsAdmin(user!.sub);
        if (!admin) router.replace("/");
        else setIsAdmin(true);
      } catch (error) {
        console.error(error);
        router.replace("/");
      } finally {
        setAdminChecked(true);
      }
    }
    verifyAdmin();
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!isAdmin) return;
    async function initData() {
      const [eps, arts, bps, usrs] = await Promise.all([
        fetchAdminEpisodes(),
        fetchAdminArticles(),
        fetchAdminBackpackSections(),
        fetchUsers(),
      ]);
      setEpisodes(eps);
      setArticles(arts);
      setBpSections(bps);
      setUsers(usrs);
      if (eps.length) {
        setSelectedEp(eps[0].id!);
        setEpForm(eps[0]);
      }
    }
    initData();
  }, [isAdmin]);

  if (isLoading || !adminChecked) {
    return (
      <div className="admin-root">
        <NavBar />
        <div className="admin-loading-body">
          <span className="admin-loading-text">
            Verifying access…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root">
      <NavBar />
      <div className="admin-body">
        {/* ── SIDEBAR ── */}
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-label">Content Manager</div>
          </div>
          <nav className="admin-sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <AdminNavButton
                key={item.id}
                item={item}
                active={activeSection === item.id}
                onClick={() => switchSection(item.id)}
              />
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <Link href="/" className="admin-back-btn">← Back to Site</Link>
          </div>
        </div>

        {/* ── LIST PANEL ── */}
        <div className="admin-list-panel">
          <div className="admin-list-header">
            <h2 className="admin-list-heading">
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
            </h2>
            {activeSection !== "users" && activeSection !== "emails" && (
              <NewItemButton onClick={handleNewItem} />
            )}
          </div>
          <div className="admin-list-scroll">
            {activeSection === "episodes" && (
              episodes.length === 0
                ? (
                  <p className="admin-empty-list">
                    No episodes yet.<br />Click + New to add one.
                  </p>
                )
                : episodes.map((ep) => (
                  <button
                    key={ep.id}
                    type="button"
                    className={`admin-list-item${
                      selectedEp === ep.id ? " active" : ""
                    }`}
                    onClick={() => selectEpisode(ep)}
                  >
                    <div className="admin-list-eyebrow">{ep.num}</div>
                    <div className="admin-list-name">{ep.title}</div>
                  </button>
                ))
            )}
            {activeSection === "articles" && (
              articles.length === 0
                ? (
                  <p className="admin-empty-list">
                    No articles yet.<br />Click + New to add one.
                  </p>
                )
                : articles.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    className={`admin-list-item${
                      selectedArt === art.id ? " active" : ""
                    }`}
                    onClick={() => selectArticle(art)}
                  >
                    <div className="admin-list-eyebrow">{art.category}</div>
                    <div className="admin-list-name">{art.title}</div>
                  </button>
                ))
            )}
            {activeSection === "emails" && (
              <ListItemButton
                eyebrow="New message"
                name="Compose Email"
                active
              />
            )}
            {activeSection === "users" && (
              users.length === 0
                ? <p className="admin-empty-list">No users yet.</p>
                : users.map((u) => (
                  <UserListItem
                    key={u.id}
                    user={u}
                    active={selectedUser?.id === u.id}
                    onClick={setSelectedUser}
                  />
                ))
            )}
            {activeSection === "sections" && (
              bpSections.length === 0
                ? (
                  <p className="admin-empty-list">
                    No sections yet.<br />Click + New to add one.
                  </p>
                )
                : bpSections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`admin-list-item${
                      selectedBp === s.id ? " active" : ""
                    }`}
                    onClick={() => selectSection(s)}
                  >
                    <div className="admin-list-eyebrow">
                      {s.emoji} {s.type}
                    </div>
                    <div className="admin-list-name">{s.label}</div>
                  </button>
                ))
            )}
          </div>
        </div>

        {/* ── FORM PANEL ── */}
        <div className="admin-form-panel">
          {/* Episodes */}
          {activeSection === "episodes" && (selectedEp === ""
            ? (
              <EmptyForm
                icon="🎬"
                text="Select an episode or create a new one."
              />
            )
            : (
              <EditPanel
                title={selectedEp === "new"
                  ? "New Episode"
                  : epForm.title || "Edit Episode"}
                saving={epSaving}
                status={epStatus}
                saveLabel="Save Episode"
                onSave={saveEp}
                onDelete={selectedEp !== "new" ? deleteEp : null}
              >
                <div className="admin-section">
                  <div className="admin-section-label">Metadata</div>
                  <div className="admin-grid-3">
                    <Field
                      label="Episode #"
                      value={epForm.num}
                      onChange={(v) => setEpForm((f) => ({ ...f, num: v }))}
                      placeholder="EP. 07"
                    />
                    <Field
                      label="Date"
                      value={epForm.date}
                      onChange={(v) => setEpForm((f) => ({ ...f, date: v }))}
                      placeholder="Mar 1, 2026"
                    />
                    <Field
                      label="Duration"
                      value={epForm.duration}
                      onChange={(v) =>
                        setEpForm((f) => ({ ...f, duration: v }))}
                      placeholder="42 min"
                    />
                  </div>
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Content</div>
                  <Field
                    label="Title"
                    value={epForm.title}
                    onChange={(v) => setEpForm((f) => ({ ...f, title: v }))}
                    placeholder="Episode title"
                  />
                  <Field
                    label="Description"
                    value={epForm.description}
                    onChange={(v) =>
                      setEpForm((f) => ({ ...f, description: v }))}
                    placeholder="Episode description…"
                    multiline
                  />
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Media</div>
                  <Field
                    label="YouTube ID"
                    value={epForm.youtube_id}
                    onChange={(v) =>
                      setEpForm((f) => ({ ...f, youtube_id: v }))}
                    placeholder="dQw4w9WgXcQ"
                    hint="The ID from the YouTube URL — e.g. youtube.com/watch?v=dQw4w9WgXcQ"
                  />
                  <div>
                    <Field
                      label="Thumbnail URL"
                      value={epForm.thumbnail}
                      onChange={(v) =>
                        setEpForm((f) => ({ ...f, thumbnail: v }))}
                      placeholder="https://…"
                    />
                    {epForm.thumbnail && (
                      <img
                        src={epForm.thumbnail}
                        alt="Preview"
                        className="admin-image-preview"
                      />
                    )}
                  </div>
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Settings</div>
                  <div className="admin-field-narrow">
                    <Field
                      label="Sort Order"
                      value={String(epForm.sort_order)}
                      onChange={(v) =>
                        setEpForm((f) => ({
                          ...f,
                          sort_order: parseInt(v) || 0,
                        }))}
                      placeholder="1"
                      hint="Lower numbers appear first."
                    />
                  </div>
                </div>
              </EditPanel>
            ))}

          {/* Articles */}
          {activeSection === "articles" && (selectedArt === null
            ? (
              <EmptyForm
                icon="📖"
                text="Select an article or create a new one."
              />
            )
            : (
              <EditPanel
                title={selectedArt === "new"
                  ? "New Article"
                  : artForm.title || "Edit Article"}
                saving={artSaving}
                status={artStatus}
                saveLabel="Save Article"
                onSave={saveArt}
                onDelete={selectedArt !== "new" ? deleteArt : null}
              >
                <div className="admin-section">
                  <div className="admin-section-label">Metadata</div>
                  <div className="admin-field">
                    <label>Category</label>
                    <select
                      value={artForm.category}
                      onChange={(e) =>
                        setArtForm((f) => ({ ...f, category: e.target.value }))}
                    >
                      <option value="">Select a category…</option>
                      {ARTICLE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-grid-2">
                    <Field
                      label="Date"
                      value={artForm.date}
                      onChange={(v) => setArtForm((f) => ({ ...f, date: v }))}
                      placeholder="Mar 1, 2026"
                    />
                    <Field
                      label="Read Time"
                      value={artForm.read_time}
                      onChange={(v) =>
                        setArtForm((f) => ({ ...f, read_time: v }))}
                      placeholder="5 min read"
                    />
                  </div>
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Content</div>
                  <Field
                    label="Title"
                    value={artForm.title}
                    onChange={(v) => setArtForm((f) => ({ ...f, title: v }))}
                    placeholder="Article title"
                  />
                  <Field
                    label="Excerpt"
                    value={artForm.excerpt}
                    onChange={(v) => setArtForm((f) => ({ ...f, excerpt: v }))}
                    placeholder="Short description shown in the article grid…"
                    multiline
                  />
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Media</div>
                  <div>
                    <Field
                      label="Image URL"
                      value={artForm.image}
                      onChange={(v) => setArtForm((f) => ({ ...f, image: v }))}
                      placeholder="https://…"
                    />
                    {artForm.image && (
                      <img
                        src={artForm.image}
                        alt="Preview"
                        className="admin-image-preview"
                      />
                    )}
                  </div>
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Settings</div>
                  <div className="admin-grid-2">
                    <div className="admin-field-narrow">
                      <Field
                        label="Sort Order"
                        value={String(artForm.sort_order)}
                        onChange={(v) =>
                          setArtForm((f) => ({
                            ...f,
                            sort_order: parseInt(v) || 0,
                          }))}
                        placeholder="1"
                        hint="Lower numbers appear first."
                      />
                    </div>
                    <div className="admin-field">
                      <label>Featured</label>
                      <Toggle
                        on={artForm.featured}
                        onToggle={() =>
                          setArtForm((f) => ({ ...f, featured: !f.featured }))}
                        labelOn="Featured article"
                        labelOff="Not featured"
                      />
                      <span className="admin-field-hint">
                        Shown as the hero article on the articles page.
                      </span>
                    </div>
                  </div>
                </div>
              </EditPanel>
            ))}

          {/* Emails */}
          {activeSection === "emails" && (
            <ComposeEmailPanel
              userCount={users.length}
              emailStatus={emailStatus}
              emailSentCount={emailSentCount}
              emailSubject={emailSubject}
              emailBody={emailBody}
              onSubjectChange={setEmailSubject}
              onBodyChange={setEmailBody}
              onSend={handleSendEmail}
            />
          )}

          {/* Users */}
          {activeSection === "users" && (selectedUser === null
            ? (
              <EmptyForm
                icon="👥"
                text="Select a user to view their profile."
              />
            )
            : (
              <>
                <div className="admin-form-header">
                  <h2 className="admin-form-title">
                    {[selectedUser.first_name, selectedUser.last_name]
                      .filter(Boolean)
                      .join(" ") || selectedUser.username || selectedUser.id}
                  </h2>
                  <div className="admin-form-actions">
                    <span className="admin-readonly-label">Read-only</span>
                  </div>
                </div>
                <div className="admin-form-scroll">
                  <div className="admin-section">
                    <div className="admin-section-label">Account</div>
                    <div className="admin-grid-2">
                      <ReadField label="Email" value={selectedUser.email} />
                      <ReadField
                        label="Username"
                        value={selectedUser.username}
                      />
                    </div>
                    <div className="admin-grid-3">
                      <ReadField
                        label="First Name"
                        value={selectedUser.first_name}
                      />
                      <ReadField
                        label="Last Name"
                        value={selectedUser.last_name}
                      />
                      <ReadField
                        label="Location"
                        value={selectedUser.location}
                      />
                    </div>
                    <ReadField label="Auth0 ID" value={selectedUser.id} />
                  </div>
                  <div className="admin-section">
                    <div className="admin-section-label">Profile</div>
                    <ReadField label="Bio" value={selectedUser.bio} multiline />
                    <ReadField label="Mantra" value={selectedUser.mantra} />
                    <ReadField
                      label="Interests"
                      value={Array.isArray(selectedUser.interests)
                        ? selectedUser.interests.join(", ")
                        : selectedUser.interests}
                    />
                  </div>
                  <div className="admin-section">
                    <div className="admin-section-label">Personal Details</div>
                    <div className="admin-grid-3">
                      <ReadField label="Age" value={selectedUser.age} />
                      <ReadField
                        label="Occupation"
                        value={selectedUser.occupation}
                      />
                      <ReadField
                        label="Years in Occupation"
                        value={selectedUser.years_in_occupation}
                      />
                    </div>
                    <div className="admin-grid-2">
                      <ReadField
                        label="Education"
                        value={selectedUser.education}
                      />
                      <ReadField
                        label="Marital Status"
                        value={selectedUser.marital_status}
                      />
                    </div>
                    <div className="admin-grid-3">
                      <ReadField label="Retired" value={selectedUser.retired} />
                      <ReadField
                        label="Retirement Date"
                        value={selectedUser.retirement_date}
                      />
                      <ReadField
                        label="Divorced"
                        value={selectedUser.divorced}
                      />
                    </div>
                    <div className="admin-grid-3">
                      <ReadField label="Kids" value={selectedUser.kids} />
                      <ReadField
                        label="Home Paid Off"
                        value={selectedUser.home_paid_off}
                      />
                      <ReadField
                        label="Working Income"
                        value={selectedUser.working_income}
                      />
                    </div>
                    <ReadField
                      label="Net Worth"
                      value={selectedUser.net_worth}
                    />
                  </div>
                  <div className="admin-section">
                    <div className="admin-section-label">Meta</div>
                    <div className="admin-grid-2">
                      <ReadField
                        label="Avatar ID"
                        value={selectedUser.avatar_id}
                      />
                      <ReadField
                        label="Last Updated"
                        value={selectedUser.updated_at}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}

          {/* Backpack Sections */}
          {activeSection === "sections" && (selectedBp === null
            ? (
              <EmptyForm
                icon="🎒"
                text="Select a section or create a new one."
              />
            )
            : (
              <EditPanel
                title={selectedBp === "new"
                  ? "New Section"
                  : bpForm.label || "Edit Section"}
                saving={bpSaving}
                status={bpStatus}
                saveLabel="Save Section"
                onSave={saveBp}
                onDelete={selectedBp !== "new" ? deleteBp : null}
              >
                <div className="admin-section">
                  <div className="admin-section-label">Identity</div>
                  <div className="admin-grid-2">
                    <Field
                      label="Label"
                      value={bpForm.label}
                      onChange={(v) => setBpForm((f) => ({ ...f, label: v }))}
                      placeholder="The 1 Question Retirement Challenge"
                    />
                    <Field
                      label="Slug"
                      value={bpForm.slug}
                      onChange={(v) => setBpForm((f) => ({ ...f, slug: v }))}
                      placeholder="challenge"
                      hint="Internal ID — changing 'challenge' will break the challenge detail view."
                    />
                  </div>
                  <div className="admin-grid-2">
                    <Field
                      label="Emoji"
                      value={bpForm.emoji}
                      onChange={(v) => setBpForm((f) => ({ ...f, emoji: v }))}
                      placeholder="❓"
                    />
                    <Field
                      label="Color"
                      value={bpForm.color}
                      onChange={(v) => setBpForm((f) => ({ ...f, color: v }))}
                      placeholder="#e8673a"
                      hint="Hex color for the section card accent."
                    />
                  </div>
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Content</div>
                  <Field
                    label="Tagline"
                    value={bpForm.tagline}
                    onChange={(v) => setBpForm((f) => ({ ...f, tagline: v }))}
                    placeholder="One question. One week. A lifetime of clarity."
                  />
                  <Field
                    label="Description"
                    value={bpForm.description}
                    onChange={(v) =>
                      setBpForm((f) => ({ ...f, description: v }))}
                    placeholder="Each week a single powerful question…"
                    multiline
                  />
                </div>
                <div className="admin-section">
                  <div className="admin-section-label">Settings</div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label>Type</label>
                      <select
                        value={bpForm.type}
                        onChange={(e) =>
                          setBpForm((f) => ({ ...f, type: e.target.value }))}
                      >
                        {SECTION_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-field-narrow">
                      <Field
                        label="Sort Order"
                        value={String(bpForm.sort_order)}
                        onChange={(v) =>
                          setBpForm((f) => ({
                            ...f,
                            sort_order: parseInt(v) || 0,
                          }))}
                        placeholder="1"
                        hint="Lower numbers appear first."
                      />
                    </div>
                  </div>
                </div>
              </EditPanel>
            ))}
        </div>
      </div>
    </div>
  );
}
