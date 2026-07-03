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
  bio: string | null;
  mantra: string | null;
  interests: string | null;
  age: number | null;
  occupation: string | null;
  years_in_occupation: number | null;
  education: string | null;
  retired: string | null;
  retirement_date: string | null;
  marital_status: string | null;
  divorced: string | null;
  kids: string | null;
  home_paid_off: string | null;
  working_income: string | null;
  net_worth: string | null;
  avatar_id: string | null;
  notifications_email: number;
  created_at: string;
  updated_at: string | null;
}

interface ProfilePutPayload {
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  location?: string | null;
  bio?: string | null;
  mantra?: string | null;
  interests?: string[] | null;
  age?: string;
  occupation?: string | null;
  yearsInOccupation?: string;
  education?: string | null;
  retired?: string | null;
  retirementDate?: string | null;
  maritalStatus?: string | null;
  divorced?: string | null;
  kids?: string | null;
  homePaidOff?: string | null;
  workingIncome?: string | null;
  netWorth?: string | null;
  avatarId?: string | null;
}

function mapUser(row: UserRow) {
  return {
    ...row,
    interests: parseJson<string[] | null>(row.interests, null),
    notifications_email: toBool(row.notifications_email),
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
  return NextResponse.json(row ? mapUser(row) : null);
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
         id, email, first_name, last_name, username, location, bio, mantra, interests,
         age, occupation, years_in_occupation, education, retired, retirement_date,
         marital_status, divorced, kids, home_paid_off, working_income, net_worth,
         avatar_id, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         email = excluded.email,
         first_name = excluded.first_name,
         last_name = excluded.last_name,
         username = excluded.username,
         location = excluded.location,
         bio = excluded.bio,
         mantra = excluded.mantra,
         interests = excluded.interests,
         age = excluded.age,
         occupation = excluded.occupation,
         years_in_occupation = excluded.years_in_occupation,
         education = excluded.education,
         retired = excluded.retired,
         retirement_date = excluded.retirement_date,
         marital_status = excluded.marital_status,
         divorced = excluded.divorced,
         kids = excluded.kids,
         home_paid_off = excluded.home_paid_off,
         working_income = excluded.working_income,
         net_worth = excluded.net_worth,
         avatar_id = excluded.avatar_id,
         updated_at = excluded.updated_at`,
    )
    .bind(
      member.sub,
      updated.email ?? "",
      updated.firstName ?? null,
      updated.lastName ?? null,
      updated.username ?? null,
      updated.location ?? null,
      updated.bio ?? null,
      updated.mantra ?? null,
      toJson(updated.interests ?? null),
      updated.age !== undefined && updated.age !== ""
        ? parseInt(updated.age, 10)
        : null,
      updated.occupation ?? null,
      updated.yearsInOccupation !== undefined &&
        updated.yearsInOccupation !== ""
        ? parseInt(updated.yearsInOccupation, 10)
        : null,
      updated.education ?? null,
      updated.retired ?? null,
      updated.retirementDate ?? null,
      updated.maritalStatus ?? null,
      updated.divorced ?? null,
      updated.kids ?? null,
      updated.homePaidOff ?? null,
      updated.workingIncome ?? null,
      updated.netWorth ?? null,
      updated.avatarId ?? null,
      nowIso(),
    )
    .run();

  return new NextResponse(null, { status: 204 });
}
