-- Add in-app notification preference to users
alter table public.users
  add column if not exists notifications_in_app boolean not null default true;

-- Notifications table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  type text not null,
  title text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

create policy "Users select own notifications"
  on public.notifications for select
  using (current_setting('request.jwt.claims', true)::jsonb ->> 'sub' = user_id);

create policy "Users update own notifications"
  on public.notifications for update
  using (current_setting('request.jwt.claims', true)::jsonb ->> 'sub' = user_id);
