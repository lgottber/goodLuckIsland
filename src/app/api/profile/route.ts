import { NextRequest, NextResponse } from "next/server";
import {
  getDb,
  toBool,
  parseJson,
  toJson,
  nowIso,
} from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

interface UserRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  location: string | null;
  zip_code: string | null;
  city: string | null;
  state: string | null;
  bio: string | null;
  mantra: string | null;
  interests: string | null;
  age: number | null;
  occupation: string | null;
  years_in_occupation: number | null;
  education: string | null;
  retired: string | null;
  retirement_date: string | null;
  retirement_date_reason: string | null;
  marital_status: string | null;
  divorced: string | null;
  kids: string | null;
  home_paid_off: string | null;
  working_income: string | null;
  net_worth: string | null;
  avatar_id: string | null;
  notifications_email: number;
  notifications_in_app: number;
  is_deleted: number;
  created_at: string;
  updated_at: string | null;
  gender: string | null;
  household_composition: string | null;
  geo_classifier: string | null;
  employment_status: string | null;
  industry: string | null;
  years_until_retirement: string | null;
  retirement_confidence: number | null;
  life_satisfaction: number | null;
  sense_of_purpose: number | null;
  stress_level: number | null;
  optimism: number | null;
  loneliness_connection: number | null;
  retirement_identity: string | null;
  retirement_vision_clarity: number | null;
  retirement_motivations: string | null;
  retirement_concerns: string | null;
  ideal_retirement_day: string | null;
}

interface ProfilePutPayload {
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  location?: string | null;
  zipCode?: string | null;
  city?: string | null;
  state?: string | null;
  bio?: string | null;
  mantra?: string | null;
  interests?: string[] | null;
  age?: string;
  occupation?: string | null;
  yearsInOccupation?: string;
  education?: string | null;
  retired?: string | null;
  retirementDate?: string | null;
  retirementDateReason?: string | null;
  maritalStatus?: string | null;
  divorced?: string | null;
  kids?: string | null;
  homePaidOff?: string | null;
  workingIncome?: string | null;
  netWorth?: string | null;
  avatarId?: string | null;
  gender?: string | null;
  householdComposition?: string | null;
  geoClassifier?: string | null;
  employmentStatus?: string | null;
  industry?: string | null;
  yearsUntilRetirement?: string | null;
  retirementConfidence?: string;
  lifeSatisfaction?: string;
  senseOfPurpose?: string;
  stressLevel?: string;
  optimism?: string;
  lonelinessConnection?: string;
  retirementIdentity?: string | null;
  retirementVisionClarity?: string;
  retirementMotivations?: string[] | null;
  retirementConcerns?: string[] | null;
  idealRetirementDay?: string | null;
}

function toIntOrNull(value: string | undefined): number | null {
  return value !== undefined && value !== "" ? parseInt(value, 10) : null;
}

function mapUser(row: UserRow) {
  return {
    ...row,
    interests: parseJson<string[] | null>(row.interests, null),
    notifications_email: toBool(row.notifications_email),
    notifications_in_app: toBool(row.notifications_in_app),
    is_deleted: toBool(row.is_deleted),
    retirement_motivations: parseJson<string[] | null>(row.retirement_motivations, null),
    retirement_concerns: parseJson<string[] | null>(row.retirement_concerns, null),
  };
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(member.sub)
    .first<UserRow>();
  if (!row) return NextResponse.json(null);

  // Reaching this endpoint authenticated is the "logged back in" signal --
  // cancel a pending account deletion (see POST /api/delete-account) rather
  // than requiring a separate un-delete action from the client.
  if (toBool(row.is_deleted)) {
    await db
      .prepare("UPDATE users SET is_deleted = 0 WHERE id = ?")
      .bind(member.sub)
      .run();
    row.is_deleted = 0;
  }

  return NextResponse.json(mapUser(row));
}

// Same allowlist of columns as the pre-migration upsertProfile -- never
// widen this to admin-only fields (blocked_at, unsubscribed_at, etc.),
// and always write to the verified member's own row, never a
// client-supplied id.
export async function PUT(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const updated: ProfilePutPayload = await request.json();

  const db = getDb();
  await db
    .prepare(
      `INSERT INTO users (
         id, email, first_name, last_name, username, location, zip_code, city, state, bio, mantra, interests,
         age, occupation, years_in_occupation, education, retired, retirement_date,
         retirement_date_reason, marital_status, divorced, kids, home_paid_off,
         working_income, net_worth, avatar_id,
         gender, household_composition, geo_classifier, employment_status, industry,
         years_until_retirement, retirement_confidence, life_satisfaction, sense_of_purpose,
         stress_level, optimism, loneliness_connection, retirement_identity,
         retirement_vision_clarity, retirement_motivations, retirement_concerns,
         ideal_retirement_day, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         email = excluded.email,
         first_name = excluded.first_name,
         last_name = excluded.last_name,
         username = excluded.username,
         location = excluded.location,
         zip_code = excluded.zip_code,
         city = excluded.city,
         state = excluded.state,
         bio = excluded.bio,
         mantra = excluded.mantra,
         interests = excluded.interests,
         age = excluded.age,
         occupation = excluded.occupation,
         years_in_occupation = excluded.years_in_occupation,
         education = excluded.education,
         retired = excluded.retired,
         retirement_date = excluded.retirement_date,
         retirement_date_reason = excluded.retirement_date_reason,
         marital_status = excluded.marital_status,
         divorced = excluded.divorced,
         kids = excluded.kids,
         home_paid_off = excluded.home_paid_off,
         working_income = excluded.working_income,
         net_worth = excluded.net_worth,
         avatar_id = excluded.avatar_id,
         gender = excluded.gender,
         household_composition = excluded.household_composition,
         geo_classifier = excluded.geo_classifier,
         employment_status = excluded.employment_status,
         industry = excluded.industry,
         years_until_retirement = excluded.years_until_retirement,
         retirement_confidence = excluded.retirement_confidence,
         life_satisfaction = excluded.life_satisfaction,
         sense_of_purpose = excluded.sense_of_purpose,
         stress_level = excluded.stress_level,
         optimism = excluded.optimism,
         loneliness_connection = excluded.loneliness_connection,
         retirement_identity = excluded.retirement_identity,
         retirement_vision_clarity = excluded.retirement_vision_clarity,
         retirement_motivations = excluded.retirement_motivations,
         retirement_concerns = excluded.retirement_concerns,
         ideal_retirement_day = excluded.ideal_retirement_day,
         updated_at = excluded.updated_at`,
    )
    .bind(
      member.sub,
      updated.email ?? "",
      updated.firstName ?? null,
      updated.lastName ?? null,
      updated.username ?? null,
      updated.location ?? null,
      updated.zipCode ?? null,
      updated.city ?? null,
      updated.state ?? null,
      updated.bio ?? null,
      updated.mantra ?? null,
      toJson(updated.interests ?? null),
      toIntOrNull(updated.age),
      updated.occupation ?? null,
      toIntOrNull(updated.yearsInOccupation),
      updated.education ?? null,
      updated.retired ?? null,
      updated.retirementDate ?? null,
      updated.retirementDateReason ?? null,
      updated.maritalStatus ?? null,
      updated.divorced ?? null,
      updated.kids ?? null,
      updated.homePaidOff ?? null,
      updated.workingIncome ?? null,
      updated.netWorth ?? null,
      updated.avatarId ?? null,
      updated.gender ?? null,
      updated.householdComposition ?? null,
      updated.geoClassifier ?? null,
      updated.employmentStatus ?? null,
      updated.industry ?? null,
      updated.yearsUntilRetirement ?? null,
      toIntOrNull(updated.retirementConfidence),
      toIntOrNull(updated.lifeSatisfaction),
      toIntOrNull(updated.senseOfPurpose),
      toIntOrNull(updated.stressLevel),
      toIntOrNull(updated.optimism),
      toIntOrNull(updated.lonelinessConnection),
      updated.retirementIdentity ?? null,
      toIntOrNull(updated.retirementVisionClarity),
      toJson(updated.retirementMotivations ?? null),
      toJson(updated.retirementConcerns ?? null),
      updated.idealRetirementDay ?? null,
      nowIso(),
    )
    .run();

  return new NextResponse(null, { status: 204 });
}
