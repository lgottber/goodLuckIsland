import type { Tables } from "../../types/supabase";
import { formatMemberSince } from "./memberSince";

function nullStat(): number | null {
  return null;
}

export const INITIAL_USER = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  location: "",
  zipCode: "",
  city: "",
  state: "",
  address: "",
  avatarUrl: "",
  avatarId: "",
  bio: "",
  mantra: "Peace of mind, planned for.",
  memberSince: "",
  interests: new Array<string>(),
  stats: {
    articlesRead: nullStat(),
    podcastsListened: nullStat(),
    savedItems: nullStat(),
    daysActive: nullStat(),
  },
  age: "",
  occupation: "",
  yearsInOccupation: "",
  education: "",
  retired: "",
  retirementDate: "",
  retirementDateReason: "",
  maritalStatus: "",
  divorced: "",
  kids: "",
  homePaidOff: "",
  workingIncome: "",
  netWorth: "",
  gender: "",
  householdComposition: "",
  geoClassifier: "",
  employmentStatus: "",
  industry: "",
  yearsUntilRetirement: "",
  retirementConfidence: "",
  lifeSatisfaction: "",
  senseOfPurpose: "",
  stressLevel: "",
  optimism: "",
  lonelinessConnection: "",
  retirementIdentity: "",
  retirementVisionClarity: "",
  retirementMotivations: new Array<string>(),
  retirementConcerns: new Array<string>(),
  idealRetirementDay: "",
};

export type ProfileUser = typeof INITIAL_USER;

export function applySupabaseFields(
  prev: ProfileUser,
  data: Tables<"users">,
  picture: string | undefined,
): ProfileUser {
  return {
    ...prev,
    firstName: data.first_name ?? prev.firstName,
    lastName: data.last_name ?? prev.lastName,
    email: data.email ?? prev.email,
    username: data.username ?? prev.username,
    location: data.location ?? prev.location,
    zipCode: data.zip_code ?? prev.zipCode,
    city: data.city ?? prev.city,
    state: data.state ?? prev.state,
    bio: data.bio ?? prev.bio,
    mantra: data.mantra ?? prev.mantra,
    interests: data.interests ?? prev.interests,
    occupation: data.occupation ?? prev.occupation,
    education: data.education ?? prev.education,
    retired: data.retired ?? prev.retired,
    retirementDate: data.retirement_date ?? prev.retirementDate,
    retirementDateReason: data.retirement_date_reason ?? prev.retirementDateReason,
    maritalStatus: data.marital_status ?? prev.maritalStatus,
    divorced: data.divorced ?? prev.divorced,
    kids: data.kids ?? prev.kids,
    homePaidOff: data.home_paid_off ?? prev.homePaidOff,
    workingIncome: data.working_income ?? prev.workingIncome,
    netWorth: data.net_worth ?? prev.netWorth,
    avatarId: data.avatar_id ?? prev.avatarId,
    age: data.age != null ? String(data.age) : prev.age,
    yearsInOccupation:
      data.years_in_occupation != null
        ? String(data.years_in_occupation)
        : prev.yearsInOccupation,
    avatarUrl: data.avatar_id ? "" : (picture ?? prev.avatarUrl),
    gender: data.gender ?? prev.gender,
    householdComposition: data.household_composition ?? prev.householdComposition,
    geoClassifier: data.geo_classifier ?? prev.geoClassifier,
    employmentStatus: data.employment_status ?? prev.employmentStatus,
    industry: data.industry ?? prev.industry,
    yearsUntilRetirement: data.years_until_retirement ?? prev.yearsUntilRetirement,
    retirementConfidence:
      data.retirement_confidence != null ? String(data.retirement_confidence) : prev.retirementConfidence,
    lifeSatisfaction:
      data.life_satisfaction != null ? String(data.life_satisfaction) : prev.lifeSatisfaction,
    senseOfPurpose:
      data.sense_of_purpose != null ? String(data.sense_of_purpose) : prev.senseOfPurpose,
    stressLevel: data.stress_level != null ? String(data.stress_level) : prev.stressLevel,
    optimism: data.optimism != null ? String(data.optimism) : prev.optimism,
    lonelinessConnection:
      data.loneliness_connection != null ? String(data.loneliness_connection) : prev.lonelinessConnection,
    retirementIdentity: data.retirement_identity ?? prev.retirementIdentity,
    retirementVisionClarity:
      data.retirement_vision_clarity != null
        ? String(data.retirement_vision_clarity)
        : prev.retirementVisionClarity,
    retirementMotivations: data.retirement_motivations ?? prev.retirementMotivations,
    retirementConcerns: data.retirement_concerns ?? prev.retirementConcerns,
    idealRetirementDay: data.ideal_retirement_day ?? prev.idealRetirementDay,
    memberSince: formatMemberSince(data.created_at) || prev.memberSince,
  };
}
