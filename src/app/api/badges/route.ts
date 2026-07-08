import { NextRequest, NextResponse } from "next/server";
import { getDb, toBool } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";
import type { BadgeMetricType } from "../../../types/badge";

export const runtime = "edge";

interface BadgeRow {
  id: string;
  name: string;
  image_slug: string;
  metric_type: string;
  comparator: string;
  threshold_value: number;
}

interface StepProgressRow {
  one_question_challenge: number;
  wayfair_tool: number;
  values_and_beliefs: number;
  finding_your_purpose: number;
  new_skills: number;
  retirement: number;
  give_back_step: number;
}

function countStepsCompleted(row: StepProgressRow | null): number {
  if (!row) return 0;
  return [
    row.one_question_challenge,
    row.wayfair_tool,
    row.values_and_beliefs,
    row.finding_your_purpose,
    row.new_skills,
    row.retirement,
    row.give_back_step,
  ].filter((v) => toBool(v)).length;
}

function isEarned(value: number, comparator: string, threshold: number): boolean {
  if (comparator === "<") return value < threshold;
  if (comparator === ">") return value > threshold;
  return value === threshold;
}

function isBadgeMetricType(value: string): value is BadgeMetricType {
  return (
    value === "steps_completed" ||
    value === "feedback_given" ||
    value === "assignments_completed" ||
    value === "articles_read" ||
    value === "videos_seen" ||
    value === "podcasts_listened"
  );
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const userId = member.sub;

  const [{ results: badgeRows }, stepRow, feedbackCount, pinwirlCount, oneQuestionCount] =
    await Promise.all([
      db.prepare("SELECT * FROM badges").all<BadgeRow>(),
      db
        .prepare(
          `SELECT one_question_challenge, wayfair_tool, values_and_beliefs, finding_your_purpose,
                  new_skills, retirement, give_back_step
           FROM users_seven_step_process WHERE user_id = ?`,
        )
        .bind(userId)
        .first<StepProgressRow>(),
      db
        .prepare("SELECT COUNT(*) as n FROM testimonials WHERE member_id = ?")
        .bind(userId)
        .first<{ n: number }>(),
      db
        .prepare("SELECT COUNT(*) as n FROM pinwirl_results WHERE user_id = ?")
        .bind(userId)
        .first<{ n: number }>(),
      db
        .prepare("SELECT COUNT(*) as n FROM one_question_answers WHERE user_id = ?")
        .bind(userId)
        .first<{ n: number }>(),
    ]);

  const metricValues: Record<BadgeMetricType, number> = {
    steps_completed: countStepsCompleted(stepRow ?? null),
    feedback_given: feedbackCount?.n ?? 0,
    assignments_completed: (pinwirlCount?.n ?? 0) + (oneQuestionCount?.n ?? 0),
    articles_read: 0,
    videos_seen: 0,
    podcasts_listened: 0,
  };

  const earned = (badgeRows ?? [])
    .filter((badge) => {
      const value = isBadgeMetricType(badge.metric_type) ? metricValues[badge.metric_type] : 0;
      return isEarned(value, badge.comparator, badge.threshold_value);
    })
    .map((badge) => ({ id: badge.id, name: badge.name, image_slug: badge.image_slug }));

  return NextResponse.json(earned);
}
