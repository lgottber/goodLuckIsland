import { apiFetch, apiFetchVoid } from "./apiClient";

export type JournalEntry = {
  id: string;
  step_slug: string;
  body: string;
  updated_at: string;
};

// userId kept in the signature for call-site compatibility, but the
// server verifies identity itself from the Auth0 token now -- this value
// is never trusted or sent.
export async function fetchJournalEntry(
  userId: string,
  stepSlug: string,
): Promise<JournalEntry | null> {
  return apiFetch<JournalEntry | null>(
    `/journal?stepSlug=${encodeURIComponent(stepSlug)}`,
  );
}

export async function saveJournalEntry(
  userId: string,
  stepSlug: string,
  body: string,
): Promise<void> {
  await apiFetchVoid("/journal", {
    method: "POST",
    body: JSON.stringify({ stepSlug, body }),
  });
}

export type PastPersonQuestion = {
  key: string;
  text: string;
  placeholder: string;
  sort_order: number;
};

export async function fetchPastPersonQuestions(): Promise<
  PastPersonQuestion[]
> {
  return apiFetch<PastPersonQuestion[]>("/journal/past-person/questions");
}

export async function fetchPastPersonAnswers(
  _userId: string,
): Promise<Record<string, string>> {
  return apiFetch<Record<string, string>>("/journal/past-person");
}

export async function savePastPersonAnswer(
  userId: string,
  questionKey: string,
  answer: string,
): Promise<void> {
  await apiFetchVoid("/journal/past-person", {
    method: "POST",
    body: JSON.stringify({ questionKey, answer }),
  });
}
