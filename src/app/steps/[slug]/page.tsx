import type { Metadata } from "next";
import { getDb } from "../../../lib/db.server";
import StepClientPage from "./StepClientPage";

export const runtime = "edge";

interface BackpackSectionRow {
  label: string;
  tagline: string;
}

async function fetchStepMeta(slug: string): Promise<BackpackSectionRow | null> {
  const db = getDb();
  return db
    .prepare("SELECT label, tagline FROM backpack_sections WHERE slug = ?")
    .bind(slug)
    .first<BackpackSectionRow>();
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = await fetchStepMeta(slug);
  if (!section) return {};
  return {
    title: section.label,
    description: section.tagline,
    openGraph: {
      title: section.label,
      description: section.tagline,
    },
    twitter: {
      card: "summary",
      title: section.label,
      description: section.tagline,
    },
  };
}

export default async function StepPage({ params }: Props) {
  const { slug } = await params;
  return <StepClientPage slug={slug} />;
}
