import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "../../../lib/db.server";
import AssessmentClientPage from "./AssessmentClientPage";

// Edge-cached SSR, matching articles/[id]/page.tsx and steps/[slug]/page.tsx --
// no generateStaticParams/SSG (no prior art for that in this codebase; see
// #103 plan). revalidate gives this route actual caching, since the two
// pages it mirrors set no Cache-Control/revalidate of their own today.
export const runtime = "edge";
export const revalidate = 300;

interface AssessmentRow {
  id: string;
  title: string;
  introduction: string;
  conclusion: string;
  use_score: number;
  status: "draft" | "published";
}

async function getAssessment(id: string): Promise<AssessmentRow | null> {
  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM assessments WHERE id = ?")
    .bind(id)
    .first<AssessmentRow>();
  return row ?? null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const assessment = await getAssessment(id);
  if (!assessment || assessment.status !== "published") return {};
  return { title: assessment.title };
}

export default async function AssessmentPage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const assessment = await getAssessment(id);
  // assessments.status is finally enforced here -- no other client route
  // reads the generic `assessments` table today, so this is the first
  // place "draft" has ever meant "not reachable on the live site."
  if (!assessment || assessment.status !== "published") notFound();

  return (
    <AssessmentClientPage
      assessmentId={assessment.id}
      title={assessment.title}
      introductionHtml={assessment.introduction}
      conclusionHtml={assessment.conclusion}
      useScore={assessment.use_score === 1}
    />
  );
}
