-- Waitlist: public pre-launch email sign-ups for babilfinance.com/waitlist
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now(),
  notified   boolean not null default false,
  source     text,
  constraint waitlist_email_check
    check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

alter table public.waitlist enable row level security;

-- Anyone (anonymous visitor) may add their email through the public form.
create policy waitlist_insert_anon on public.waitlist
  for insert to anon, authenticated
  with check (true);

-- No SELECT / UPDATE / DELETE policies are defined, so only the service_role
-- key (which bypasses RLS) can read or manage rows. Admin reads happen there.
