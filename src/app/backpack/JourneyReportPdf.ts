import type { jsPDF } from "jspdf";
import { apiFetch } from "../../lib/apiClient";
import { DIMENSIONS, scoreBand } from "../../lib/pinwirlScoring";

interface JourneyReport {
  profile: {
    firstName: string | null;
    lastName: string | null;
    age: number | null;
    occupation: string | null;
    yearsInOccupation: number | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    retired: string | null;
    retirementDate: string | null;
    retirementConfidence: number | null;
    lifeSatisfaction: number | null;
    senseOfPurpose: number | null;
    retirementMotivations: string[] | null;
    retirementConcerns: string[] | null;
    idealRetirementDay: string | null;
  } | null;
  interests: string[];
  oneQuestionPairs: { index: number | null; question: string; hint: string | null; answer: string }[];
  pinwirlScores: Record<string, number> | null;
  pinwirlDate: string | null;
  journalEntries: Record<string, string>;
}

const JOURNAL_STEP_LABELS: Record<string, string> = {
  "one-question": "Step 1 — The One Question Challenge",
  pinwirl: "Step 2 — The Pinwirl (Wayfinder)",
  values: "Step 3 — Values and Beliefs",
  purpose: "Step 4 — Finding Your Purpose",
  skills: "Step 5 — New Skills for Retirement Life",
  together: "Step 6 — Bringing It All Together",
  giveback: "Step 7 — The Give Back Step",
};

const NAVY = "#1e2d5a";
const TEAL = "#2e8b7a";
const MARGIN = 18;
const LINE_H = 7;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;

type Doc = jsPDF;

function addPage(doc: Doc): number {
  doc.addPage();
  return MARGIN;
}

function checkY(doc: Doc, y: number, needed = LINE_H * 2): number {
  if (y + needed > PAGE_H - MARGIN) return addPage(doc);
  return y;
}

function drawColorBar(doc: Doc, color: string, height = 3) {
  const [r, g, b] = hexToRgb(color);
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, PAGE_W, height, "F");
}

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function sectionHeader(doc: Doc, y: number, title: string, color: string): number {
  y = checkY(doc, y, LINE_H * 3);
  const [r, g, b] = hexToRgb(color);
  doc.setFillColor(r, g, b);
  doc.rect(MARGIN, y, CONTENT_W, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, MARGIN + 3, y + 5.5);
  doc.setTextColor(30, 45, 90);
  return y + 12;
}

function bodyText(doc: Doc, y: number, text: string, indent = 0): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  const maxW = CONTENT_W - indent;
  const lines = doc.splitTextToSize(text, maxW) as string[];
  for (const line of lines) {
    y = checkY(doc, y);
    doc.text(line, MARGIN + indent, y);
    y += LINE_H;
  }
  return y;
}

function labelValue(doc: Doc, y: number, label: string, value: string): number {
  y = checkY(doc, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 45, 90);
  doc.text(`${label}:`, MARGIN, y);
  const labelW = doc.getTextWidth(`${label}: `);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  const remaining = CONTENT_W - labelW;
  const lines = doc.splitTextToSize(value, remaining) as string[];
  doc.text(lines[0], MARGIN + labelW, y);
  y += LINE_H;
  for (let i = 1; i < lines.length; i++) {
    y = checkY(doc, y);
    doc.text(lines[i], MARGIN + labelW, y);
    y += LINE_H;
  }
  return y;
}

export async function downloadJourneyReport(): Promise<void> {
  const data = await apiFetch<JourneyReport>("/journey-report");

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // ── Cover page ──────────────────────────────────────────────────────────────
  drawColorBar(doc, NAVY, 40);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("7SHieLD Journey Report", PAGE_W / 2, 22, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Good Luck Island Collective  |  Sovran Wealth Academy", PAGE_W / 2, 31, { align: "center" });

  const name = [data.profile?.firstName, data.profile?.lastName].filter(Boolean).join(" ") || "Member";
  doc.setTextColor(30, 45, 90);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(name, PAGE_W / 2, 65, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Prepared ${dateStr}`, PAGE_W / 2, 75, { align: "center" });
  doc.text("Prepared to share with your Retirement Expert", PAGE_W / 2, 82, { align: "center" });

  const [tr, tg, tb] = hexToRgb(TEAL);
  doc.setFillColor(tr, tg, tb);
  doc.rect(0, PAGE_H - 3, PAGE_W, 3, "F");

  // ── Profile ──────────────────────────────────────────────────────────────────
  let y = addPage(doc);
  y = sectionHeader(doc, y, "Your Profile", NAVY);
  y += 2;

  const p = data.profile;
  if (p) {
    if (p.age) y = labelValue(doc, y, "Age", String(p.age));
    if (p.occupation) {
      const occ = p.yearsInOccupation
        ? `${p.occupation} (${p.yearsInOccupation} years)`
        : p.occupation;
      y = labelValue(doc, y, "Occupation", occ);
    }
    const location = [p.city, p.state, p.zipCode].filter(Boolean).join(", ");
    if (location) y = labelValue(doc, y, "Location", location);
    if (p.retired) y = labelValue(doc, y, "Retired", p.retired);
    if (p.retirementDate) y = labelValue(doc, y, "Retirement Date", p.retirementDate);

    y += 3;
    if (
      p.retirementConfidence !== null ||
      p.lifeSatisfaction !== null ||
      p.senseOfPurpose !== null
    ) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      doc.text("Wellbeing Ratings (1–10)", MARGIN, y);
      y += LINE_H;
      if (p.retirementConfidence !== null)
        y = labelValue(doc, y, "  Retirement Confidence", String(p.retirementConfidence));
      if (p.lifeSatisfaction !== null)
        y = labelValue(doc, y, "  Life Satisfaction", String(p.lifeSatisfaction));
      if (p.senseOfPurpose !== null)
        y = labelValue(doc, y, "  Sense of Purpose", String(p.senseOfPurpose));
      y += 3;
    }

    if (p.retirementMotivations?.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      y = checkY(doc, y);
      doc.text("Retirement Motivations", MARGIN, y);
      y += LINE_H;
      for (const m of p.retirementMotivations) {
        y = bodyText(doc, y, `• ${m}`, 4);
      }
      y += 2;
    }

    if (p.retirementConcerns?.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      y = checkY(doc, y);
      doc.text("Retirement Concerns", MARGIN, y);
      y += LINE_H;
      for (const c of p.retirementConcerns) {
        y = bodyText(doc, y, `• ${c}`, 4);
      }
      y += 2;
    }

    if (p.idealRetirementDay) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      y = checkY(doc, y);
      doc.text("Ideal Retirement Day", MARGIN, y);
      y += LINE_H;
      y = bodyText(doc, y, p.idealRetirementDay, 4);
    }
  }

  // ── Interests ────────────────────────────────────────────────────────────────
  if (data.interests.length > 0) {
    y += 4;
    y = sectionHeader(doc, y, "Your Interests", TEAL);
    y += 2;
    y = bodyText(
      doc,
      y,
      "Based on your content engagement across Good Luck Island Collective:",
    );
    y += 2;
    for (const interest of data.interests) {
      y = bodyText(doc, y, `• ${interest}`, 4);
    }
  }

  // ── One Question Challenge ────────────────────────────────────────────────────
  const answeredPairs = data.oneQuestionPairs.filter((pair) => pair.answer.trim());
  if (answeredPairs.length > 0) {
    y += 4;
    y = sectionHeader(doc, y, "Step 1 — The One Question Challenge", "#e8673a");
    y += 2;

    for (const pair of answeredPairs) {
      y = checkY(doc, y, LINE_H * 4);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      const qLines = doc.splitTextToSize(`Q: ${pair.question}`, CONTENT_W - 4) as string[];
      for (const line of qLines) {
        y = checkY(doc, y);
        doc.text(line, MARGIN + 2, y);
        y += LINE_H;
      }
      y = bodyText(doc, y, `A: ${pair.answer}`, 4);
      y += 3;
    }
  }

  // ── Pinwirl (Wayfinder) ────────────────────────────────────────────────────
  if (data.pinwirlScores) {
    y += 2;
    y = sectionHeader(doc, y, "Step 2 — The Pinwirl (Wayfinder) Assessment", "#2e8b7a");
    y += 2;

    if (data.pinwirlDate) {
      y = bodyText(doc, y, `Assessment taken: ${new Date(data.pinwirlDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
      y += 2;
    }

    for (const dim of DIMENSIONS) {
      const score = data.pinwirlScores[dim] ?? 0;
      const band = scoreBand(score);
      y = checkY(doc, y);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      doc.text(dim, MARGIN + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(`${score}/100  —  ${band}`, MARGIN + 2 + 80, y);

      // Mini score bar
      const barX = MARGIN + 2;
      const barY = y + 1.5;
      const barW = 70;
      const barH = 2.5;
      doc.setFillColor(220, 220, 220);
      doc.rect(barX, barY, barW, barH, "F");
      const fill = (score / 100) * barW;
      const fc = score >= 80 ? "#2e8b7a" : score >= 60 ? "#5a8a6a" : score >= 40 ? "#c87840" : "#c05040";
      const [fr, fg, fb] = hexToRgb(fc);
      doc.setFillColor(fr, fg, fb);
      doc.rect(barX, barY, fill, barH, "F");

      y += LINE_H + 2;
    }
  }

  // ── Journal Entries ────────────────────────────────────────────────────────
  const journalSlugs = ["one-question", "pinwirl", "values", "purpose", "skills", "together", "giveback"];
  const hasJournals = journalSlugs.some((s) => data.journalEntries[s]);

  if (hasJournals) {
    y += 4;
    y = sectionHeader(doc, y, "Your Journey Notes", "#7a5a9a");
    y += 2;

    for (const slug of journalSlugs) {
      const entry = data.journalEntries[slug];
      if (!entry) continue;

      y = checkY(doc, y, LINE_H * 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 45, 90);
      doc.text(JOURNAL_STEP_LABELS[slug] ?? slug, MARGIN + 2, y);
      y += LINE_H;
      y = bodyText(doc, y, entry, 4);
      y += 4;
    }
  }

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Good Luck Island Collective  |  Page ${i} of ${pageCount}`,
      PAGE_W / 2,
      PAGE_H - 8,
      { align: "center" },
    );
  }

  const date = new Date().toISOString().slice(0, 10);
  doc.save(`7shield-journey-report-${date}.pdf`);
}
