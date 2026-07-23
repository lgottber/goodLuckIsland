import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, parseJson } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";
import { getTopTagsForUser } from "../../../lib/analyticsQuery.server";
import { fetchTagLabelMap } from "../../../lib/tags.server";
import { resolveTagLabels } from "../../../lib/tags";

export const runtime = "edge";

const STEP_SLUGS = [
  "one-question",
  "pinwirl",
  "values",
  "purpose",
  "skills",
  "together",
  "giveback",
] as const;

interface OneQuestionAnswerRow {
  question_index: number;
  answer: string;
}

interface OneQuestionRow {
  id: string;
  index: number | null;
  content: string;
  hint: string | null;
  question_type: string;
}

interface PinwirlResultRow {
  scores: string;
  taken_at: string;
}

interface JournalEntryRow {
  step_slug: string;
  body: string;
}

interface ProfileRow {
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  occupation: string | null;
  years_in_occupation: number | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  retired: string | null;
  retirement_date: string | null;
  retirement_confidence: number | null;
  life_satisfaction: number | null;
  sense_of_purpose: number | null;
  retirement_motivations: string | null;
  retirement_concerns: string | null;
  ideal_retirement_day: string | null;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { env } = getRequestContext<CloudflareEnv>();
  const db = getDb();

  const [
    profileRow,
    [topTagIds, tagLabelMap],
    { results: answerResults },
    { results: questionResults },
    pinwirlRow,
    journalResults,
  ] = await Promise.all([
    db
      .prepare(
        `SELECT first_name, last_name, age, occupation, years_in_occupation,
                city, state, zip_code, retired, retirement_date,
                retirement_confidence, life_satisfaction, sense_of_purpose,
                retirement_motivations, retirement_concerns, ideal_retirement_day
         FROM users WHERE id = ?`,
      )
      .bind(member.sub)
      .first<ProfileRow>(),
    Promise.all([getTopTagsForUser(env, member.sub), fetchTagLabelMap()]).catch(() => [[], new Map()] as [number[], Map<number, string>]),
    db
      .prepare(
        "SELECT question_index, answer FROM one_question_answers WHERE user_id = ? ORDER BY question_index ASC",
      )
      .bind(member.sub)
      .all<OneQuestionAnswerRow>(),
    db
      .prepare(
        `SELECT id, "index", content, hint, question_type FROM one_questions ORDER BY "index" IS NULL, "index" ASC`,
      )
      .all<OneQuestionRow>(),
    db
      .prepare(
        "SELECT scores, taken_at FROM pinwirl_results WHERE user_id = ? ORDER BY taken_at DESC LIMIT 1",
      )
      .bind(member.sub)
      .first<PinwirlResultRow>(),
    Promise.all(
      STEP_SLUGS.map((slug) =>
        db
          .prepare(
            "SELECT step_slug, body FROM journal_entries WHERE user_id = ? AND step_slug = ?",
          )
          .bind(member.sub, slug)
          .first<JournalEntryRow>(),
      ),
    ),
  ]);

  const interests = resolveTagLabels(topTagIds, tagLabelMap);

  const answerMap = new Map<number, string>(
    (answerResults ?? []).map((r) => [r.question_index, r.answer]),
  );

  const oneQuestionPairs = (questionResults ?? []).map((q) => ({
    index: q.index,
    question: q.content,
    hint: q.hint ?? null,
    answer: answerMap.get(q.index ?? 0) ?? "",
  }));

  const pinwirlScores = pinwirlRow
    ? parseJson<Record<string, number>>(pinwirlRow.scores, {})
    : null;
  const pinwirlDate = pinwirlRow?.taken_at ?? null;

  const journalEntries: Record<string, string> = {};
  STEP_SLUGS.forEach((slug, i) => {
    const row = journalResults[i];
    if (row?.body?.trim()) {
      journalEntries[slug] = row.body;
    }
  });

  return NextResponse.json({
    profile: profileRow
      ? {
          firstName: profileRow.first_name,
          lastName: profileRow.last_name,
          age: profileRow.age,
          occupation: profileRow.occupation,
          yearsInOccupation: profileRow.years_in_occupation,
          city: profileRow.city,
          state: profileRow.state,
          zipCode: profileRow.zip_code,
          retired: profileRow.retired,
          retirementDate: profileRow.retirement_date,
          retirementConfidence: profileRow.retirement_confidence,
          lifeSatisfaction: profileRow.life_satisfaction,
          senseOfPurpose: profileRow.sense_of_purpose,
          retirementMotivations: parseJson<string[] | null>(
            profileRow.retirement_motivations,
            null,
          ),
          retirementConcerns: parseJson<string[] | null>(
            profileRow.retirement_concerns,
            null,
          ),
          idealRetirementDay: profileRow.ideal_retirement_day,
        }
      : null,
    interests,
    oneQuestionPairs,
    pinwirlScores,
    pinwirlDate,
    journalEntries,
  });
}
