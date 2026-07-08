import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";
import {
  countStepsCompleted,
  isEarned,
  isImplementedMetricType,
} from "../../../lib/badgeEvaluation";
import type { StepProgressRow } from "../../../lib/badgeEvaluation";
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
      if (!isImplementedMetricType(badge.metric_type)) return false;
      const value = metricValues[badge.metric_type];
      return isEarned(value, badge.comparator, badge.threshold_value);
    })
    .map((badge) => ({ id: badge.id, name: badge.name, image_slug: badge.image_slug }));

  return NextResponse.json(earned);
}
