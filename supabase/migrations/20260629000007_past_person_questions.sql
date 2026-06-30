create table if not exists public.past_person_questions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  text text not null,
  placeholder text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.past_person_questions enable row level security;

create policy "Past person questions are publicly readable"
  on public.past_person_questions for select
  using (true);

insert into public.past_person_questions (key, text, placeholder, sort_order) values
  ('career_identity',  'What was your primary career or role, and how much of your identity was tied to it?', 'I spent 30 years as a…', 1),
  ('past_success',     'How did your past self define success? What did achieving it feel like?',               'Success meant…',         2),
  ('relationships',    'What relationships were most central to your pre-retirement life?',                     'The people who mattered most were…', 3),
  ('wished_for_more',  'What did you wish you had more time for while you were working?',                       'I kept putting off…',    4),
  ('future_surprise',  'What would surprise your past self most about who you''re becoming now?',               'My past self would never have imagined…', 5)
on conflict do nothing;
