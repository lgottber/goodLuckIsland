import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders, toBool } from "../../../../lib/db.server";

export const runtime = "edge";

interface AssessmentRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
}

interface DimensionRow {
  name: string;
  red_max: number;
  yellow_max: number;
}

interface ReportTemplateRow {
  show_summary: number;
  show_dimension_breakdown: number;
  show_recommendations: number;
  brand_color: string;
  brand_logo_url: string | null;
  intro_text: string;
}

interface RecommendationRow {
  dimension: string;
  band: string;
  body: string;
  sort_order: number;
}

// Public content -- no per-user data here, matching pinwirl's public
// question/recommendation routes. Only serves published assessments.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = getDb();

  const assessment = await db
    .prepare("SELECT id, slug, title, description, estimated_minutes FROM assessments WHERE id = ? AND status = 'published'")
    .bind(id)
    .first<AssessmentRow>();
  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  const [dimensionsResult, template, recommendationsResult] = await Promise.all([
    db
      .prepare("SELECT name, red_max, yellow_max FROM assessment_dimensions WHERE assessment_id = ? ORDER BY sort_order")
      .bind(id)
      .all<DimensionRow>(),
    db
      .prepare("SELECT * FROM assessment_report_templates WHERE assessment_id = ?")
      .bind(id)
      .first<ReportTemplateRow>(),
    db
      .prepare("SELECT dimension, band, body, sort_order FROM assessment_recommendations WHERE assessment_id = ? ORDER BY sort_order")
      .bind(id)
      .all<RecommendationRow>(),
  ]);

  return NextResponse.json(
    {
      ...assessment,
      dimensions: dimensionsResult.results ?? [],
      reportTemplate: template
        ? {
            showSummary: toBool(template.show_summary),
            showDimensionBreakdown: toBool(template.show_dimension_breakdown),
            showRecommendations: toBool(template.show_recommendations),
            brandColor: template.brand_color,
            brandLogoUrl: template.brand_logo_url,
            introText: template.intro_text,
          }
        : null,
      recommendations: recommendationsResult.results ?? [],
    },
    { headers: publicCacheHeaders(300, 3600) },
  );
}
