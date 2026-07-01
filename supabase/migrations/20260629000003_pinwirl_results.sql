create table if not exists public.pinwirl_results (
  id          uuid         primary key default gen_random_uuid(),
  user_id     text         not null references public.users(id) on delete cascade,
  taken_at    timestamptz  not null default now(),
  scores      jsonb        not null default '{}',
  created_at  timestamptz  not null default now()
);

alter table public.pinwirl_results enable row level security;

create policy "Users can read own pinwirl results"
  on public.pinwirl_results for select
  using (auth.jwt() ->> 'sub' = user_id);

create policy "Users can insert own pinwirl results"
  on public.pinwirl_results for insert
  with check (auth.jwt() ->> 'sub' = user_id);
