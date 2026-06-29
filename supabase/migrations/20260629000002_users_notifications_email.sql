-- Add email notification preference to users table.
-- Defaults to true so existing users keep receiving emails until they opt out.
alter table public.users
  add column if not exists notifications_email boolean not null default true;
