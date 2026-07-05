import { NextRequest, NextResponse } from "next/server";
import { getDb, toBool } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

interface BadgeRow {
  id: string;
  name: string;
  image: string;
  metric:
    | "articles_read"
    | "videos_seen"
    | "podcasts_listened"
    | "feedback_given"
    | "steps_completed"
    | "assignment_completed";
  comparator: "<" | ">" | "=";
  threshold: number;
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

const STEP_COLUMNS: (keyof StepProgressRow)[] = [
  "one_question_challenge",
  "wayfair_tool",
  "values_and_beliefs",
  "finding_your_purpose",
  "new_skills",
  "retirement",
  "give_back_step",
];

function compare(value: number, comparator: BadgeRow["comparator"], threshold: number): boolean {
  if (comparator === "<") return value < threshold;
  if (comparator === ">") return value > threshold;
  return value === threshold;
}

// Returns the badges whose rule the current member's progress satisfies.
// steps_completed and assignment_completed are intentionally the same
// underlying count (users_seven_step_process) -- there is no separate
// "assignment" concept in this app, per product decision.
export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const [{ results: badges }, articleCount, videoCount, episodeCount, feedbackCount, stepRow] =
    await Promise.all([
      db.prepare("SELECT * FROM badges").all<BadgeRow>(),
      db
        .prepare(
          "SELECT COUNT(*) as count FROM content_views WHERE user_id = ? AND content_type = 'article'",
        )
        .bind(member.sub)
        .first<{ count: number }>(),
      db
        .prepare(
          "SELECT COUNT(*) as count FROM content_views WHERE user_id = ? AND content_type = 'video'",
        )
        .bind(member.sub)
        .first<{ count: number }>(),
      db
        .prepare(
          "SELECT COUNT(*) as count FROM content_views WHERE user_id = ? AND content_type = 'episode'",
        )
        .bind(member.sub)
        .first<{ count: number }>(),
      db
        .prepare("SELECT COUNT(*) as count FROM testimonials WHERE member_id = ?")
        .bind(member.sub)
        .first<{ count: number }>(),
      db
        .prepare(
          `SELECT one_question_challenge, wayfair_tool, values_and_beliefs, finding_your_purpose,
                  new_skills, retirement, give_back_step
           FROM users_seven_step_process WHERE user_id = ?`,
        )
        .bind(member.sub)
        .first<StepProgressRow>(),
    ]);

  const stepsCompleted = stepRow
    ? STEP_COLUMNS.filter((k) => toBool(stepRow[k])).length
    : 0;

  const counts: Record<BadgeRow["metric"], number> = {
    articles_read: articleCount?.count ?? 0,
    videos_seen: videoCount?.count ?? 0,
    podcasts_listened: episodeCount?.count ?? 0,
    feedback_given: feedbackCount?.count ?? 0,
    steps_completed: stepsCompleted,
    assignment_completed: stepsCompleted,
  };

  const earned = (badges ?? [])
    .filter((b) => compare(counts[b.metric], b.comparator, b.threshold))
    .map((b) => ({ id: b.id, name: b.name, image: b.image }));

  return NextResponse.json(earned);
}
