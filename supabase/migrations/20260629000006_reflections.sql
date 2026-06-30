create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  step_slug text not null,
  body text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.reflections enable row level security;

create policy "Reflections are publicly readable"
  on public.reflections for select
  using (true);

insert into public.reflections (step_slug, body, sort_order) values
  ('one-question', 'What emotions come up when you imagine having complete freedom in your day?', 1),
  ('one-question', 'Which question from this challenge surprised you most?', 2),
  ('one-question', 'What does retirement mean to you beyond the end of a career?', 3),
  ('pinwirl', 'Which dimension of your Wayfinder results felt most surprising?', 1),
  ('pinwirl', 'Which area showed the most room for growth — and does that feel exciting or daunting?', 2),
  ('pinwirl', 'How does your overall score compare to what you expected?', 3),
  ('values', 'What three values guided your working life — and are they still the right ones?', 1),
  ('values', 'Where have you made compromises on your values, and what would you do differently?', 2),
  ('values', 'What does a life fully aligned with your values look like on an average Tuesday?', 3),
  ('purpose', 'What activities make you lose track of time?', 1),
  ('purpose', 'What would you do with your days if money were no concern?', 2),
  ('purpose', 'Who do you most want to serve or help in this next chapter?', 3),
  ('skills', 'What skill have you always wanted to develop but never made time for?', 1),
  ('skills', 'What does learning something new feel like for you — energising or intimidating?', 2),
  ('skills', 'Which of your existing strengths will matter most in retirement?', 3),
  ('together', 'If you described your retirement vision in three sentences, what would you say?', 1),
  ('together', 'What do you want people to say about you ten years into retirement?', 2),
  ('together', 'What one commitment will you make to yourself before you retire?', 3),
  ('giveback', 'What life lesson do you most want to pass on to the next generation?', 1),
  ('giveback', 'Who would benefit most from your experience and how could you reach them?', 2),
  ('giveback', 'What legacy — big or small — would make this chapter feel complete?', 3)
on conflict do nothing;
