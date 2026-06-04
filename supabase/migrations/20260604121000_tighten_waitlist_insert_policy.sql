-- Tighten the public INSERT policy: visitors may add an email, but cannot
-- pre-mark themselves notified, and length is bounded to limit abuse.
drop policy if exists waitlist_insert_anon on public.waitlist;

create policy waitlist_insert_anon on public.waitlist
  for insert to anon, authenticated
  with check (
    notified = false
    and char_length(email) <= 254
    and (source is null or char_length(source) <= 60)
  );
