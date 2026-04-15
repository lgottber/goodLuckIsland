"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase.ts";
import NavBar from "../../components/NavBarDynamic";
import AdminNavButton from "./AdminNavButton";
import EmptyForm from "./EmptyForm";
import EditPanel from "./EditPanel";
import Field from "./Field";
import Toggle from "./Toggle";
import "./admin.css";

// ─── Blanks ───────────────────────────────────────────────────────────────────
const EPISODE_BLANK = {
  num: "",
  title: "",
  description: "",
  date: "",
  duration: "",
  "youtube_id": "",
  thumbnail: "",
  "sort_order": 0,
};
const ARTICLE_BLANK = {
  category: "",
  title: "",
  excerpt: "",
  date: "",
  "read_time": "",
  image: "",
  featured: false,
  "sort_order": 0,
};
const SECTION_BLANK = {
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

const NAV_ITEMS = [
  { id: "episodes", icon: "🎬", label: "Podcast Episodes" },
  { id: "articles", icon: "📖", label: "Articles" },
  { id: "sections", icon: "🎒", label: "Backpack Sections" },
  { id: "users", icon: "👥", label: "Users" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { user, isLoading } = useAuth0();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(null);
  const [activeSection, setActiveSection] = useState("episodes");

  // Episodes
  const [episodes, setEpisodes] = useState([]);
  const [selectedEp, setSelectedEp] = useState(null);
  const [epForm, setEpForm] = useState(EPISODE_BLANK);
  const [epSaving, setEpSaving] = useState(false);
  const [epStatus, setEpStatus] = useState("idle");

  // Articles
  const [articles, setArticles] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [artForm, setArtForm] = useState(ARTICLE_BLANK);
  const [artSaving, setArtSaving] = useState(false);
  const [artStatus, setArtStatus] = useState("idle");

  // Backpack sections
  const [bpSections, setBpSections] = useState([]);
  const [selectedBp, setSelectedBp] = useState(null);
  const [bpForm, setBpForm] = useState(SECTION_BLANK);
  const [bpSaving, setBpSaving] = useState(false);
  const [bpStatus, setBpStatus] = useState("idle");

  // Users
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // ── Auth ──
  useEffect(() => {
    if (isLoading || !user) return;
    supabase.rpc("is_admin", { user_id: user.sub }).then(({ data }) => {
      if (!data) router.replace("/");
      else setIsAdmin(true);
    });
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!isAdmin) return;
    loadEpisodes();
    loadArticles();
    loadBpSections();
    loadUsers();
  }, [isAdmin]);

  // ── Episodes CRUD ──
  const loadEpisodes = async () => {
    const { data } = await supabase.from("episodes").select("*").order(
      "sort_order",
    );
    if (data) setEpisodes(data);
  };
  const saveEp = async () => {
    setEpSaving(true);
    setEpStatus("idle");
    const payload = { ...epForm };
    let error;
    if (selectedEp === "new") {
      delete payload.id;
      ({ error } = await supabase.from("episodes").insert(payload));
    } else {({ error } = await supabase.from("episodes").update(payload).eq(
        "id",
        selectedEp,
      ));}
    if (error) {
      console.error(error);
      setEpStatus("error");
    } else {
      setEpStatus("saved");
      await loadEpisodes();
      if (selectedEp === "new") {
        const { data } = await supabase.from("episodes").select("*").order(
          "sort_order",
        );
        if (data?.length) {
          setSelectedEp(data[data.length - 1].id);
          setEpForm(data[data.length - 1]);
        }
      }
    }
    setEpSaving(false);
  };
  const deleteEp = async () => {
    if (
      !selectedEp || selectedEp === "new" || !confirm("Delete this episode?")
    ) return;
    await supabase.from("episodes").delete().eq("id", selectedEp);
    setEpisodes((p) => p.filter((e) => e.id !== selectedEp));
    setSelectedEp(null);
    setEpForm(EPISODE_BLANK);
  };

  // ── Articles CRUD ──
  const loadArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order(
      "sort_order",
    );
    if (data) setArticles(data);
  };
  const saveArt = async () => {
    setArtSaving(true);
    setArtStatus("idle");
    const payload = { ...artForm };
    let error;
    if (selectedArt === "new") {
      delete payload.id;
      ({ error } = await supabase.from("articles").insert(payload));
    } else {({ error } = await supabase.from("articles").update(payload).eq(
        "id",
        selectedArt,
      ));}
    if (error) {
      console.error(error);
      setArtStatus("error");
    } else {
      setArtStatus("saved");
      await loadArticles();
      if (selectedArt === "new") {
        const { data } = await supabase.from("articles").select("*").order(
          "sort_order",
        );
        if (data?.length) {
          setSelectedArt(data[data.length - 1].id);
          setArtForm(data[data.length - 1]);
        }
      }
    }
    setArtSaving(false);
  };
  const deleteArt = async () => {
    if (
      !selectedArt || selectedArt === "new" || !confirm("Delete this article?")
    ) return;
    await supabase.from("articles").delete().eq("id", selectedArt);
    setArticles((p) => p.filter((a) => a.id !== selectedArt));
    setSelectedArt(null);
    setArtForm(ARTICLE_BLANK);
  };

  // ── Backpack sections CRUD ──
  const loadBpSections = async () => {
    const { data } = await supabase.from("backpack_sections").select("*").order(
      "sort_order",
    );
    if (data) setBpSections(data);
  };
  const saveBp = async () => {
    setBpSaving(true);
    setBpStatus("idle");
    const payload = { ...bpForm };
    let error;
    if (selectedBp === "new") {
      delete payload.id;
      ({ error } = await supabase.from("backpack_sections").insert(payload));
    } else {({ error } = await supabase.from("backpack_sections").update(
        payload,
      ).eq("id", selectedBp));}
    if (error) {
      console.error(error);
      setBpStatus("error");
    } else {
      setBpStatus("saved");
      await loadBpSections();
      if (selectedBp === "new") {
        const { data } = await supabase.from("backpack_sections").select("*")
          .order("sort_order");
        if (data?.length) {
          setSelectedBp(data[data.length - 1].id);
          setBpForm(data[data.length - 1]);
        }
      }
    }
    setBpSaving(false);
  };
  const deleteBp = async () => {
    if (
      !selectedBp || selectedBp === "new" || !confirm("Delete this section?")
    ) return;
    await supabase.from("backpack_sections").delete().eq("id", selectedBp);
    setBpSections((p) => p.filter((s) => s.id !== selectedBp));
    setSelectedBp(null);
    setBpForm(SECTION_BLANK);
  };

  // ── Users ──
  const loadUsers = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("first_name");
    if (data) setUsers(data);
  };

  // ── Nav switch ──
  const switchSection = (s) => {
    setActiveSection(s);
    setSelectedEp(null);
    setEpForm(EPISODE_BLANK);
    setEpStatus("idle");
    setSelectedArt(null);
    setArtForm(ARTICLE_BLANK);
    setArtStatus("idle");
    setSelectedBp(null);
    setBpForm(SECTION_BLANK);
    setBpStatus("idle");
    setSelectedUser(null);
  };

  if (isLoading || isAdmin === null) {
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
            {activeSection !== "users" && (
              <button
                type="button"
                className="admin-new-btn"
                onClick={() => {
                  if (activeSection === "episodes") {
                    setSelectedEp("new");
                    setEpForm(EPISODE_BLANK);
                    setEpStatus("idle");
                  }
                  if (activeSection === "articles") {
                    setSelectedArt("new");
                    setArtForm(ARTICLE_BLANK);
                    setArtStatus("idle");
                  }
                  if (activeSection === "sections") {
                    setSelectedBp("new");
                    setBpForm(SECTION_BLANK);
                    setBpStatus("idle");
                  }
                }}
              >
                + New
              </button>
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
                    onClick={() => {
                      setSelectedEp(ep.id);
                      setEpForm({ ...ep });
                      setEpStatus("idle");
                    }}
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
                    onClick={() => {
                      setSelectedArt(art.id);
                      setArtForm({ ...art });
                      setArtStatus("idle");
                    }}
                  >
                    <div className="admin-list-eyebrow">{art.category}</div>
                    <div className="admin-list-name">{art.title}</div>
                  </button>
                ))
            )}
            {activeSection === "users" && (
              users.length === 0
                ? <p className="admin-empty-list">No users yet.</p>
                : users.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    className={`admin-list-item${
                      selectedUser?.id === u.id ? " active" : ""
                    }`}
                    onClick={() => setSelectedUser(u)}
                  >
                    <div className="admin-list-eyebrow">{u.email}</div>
                    <div className="admin-list-name">
                      {[u.first_name, u.last_name].filter(Boolean).join(" ") ||
                        u.username || u.id}
                    </div>
                  </button>
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
                    onClick={() => {
                      setSelectedBp(s.id);
                      setBpForm({ ...s });
                      setBpStatus("idle");
                    }}
                  >
                    <div className="admin-list-eyebrow">{s.emoji} {s.type}</div>
                    <div className="admin-list-name">{s.label}</div>
                  </button>
                ))
            )}
          </div>
        </div>

        {/* ── FORM PANEL ── */}
        <div className="admin-form-panel">
          {/* Episodes */}
          {activeSection === "episodes" && (selectedEp === null
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
