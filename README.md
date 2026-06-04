# Babil Website

The marketing and legal website for [Babil](https://babilfinance.com), a personal finance tracker that helps you understand your spending, earnings, and habits at a glance.

## Structure

```
index.html          Entry point
landing.jsx         Landing page sections (hero, features, pricing, etc.)
app-screens.jsx     App mockup components rendered inside the landing page
pages.jsx           Privacy, Terms, and Support page components
styles.css          All styles (dark/light theme, variants, responsive)
assets/             Favicon and app icons
privacy.html        Privacy policy (standalone)
terms.html          Terms of service (standalone)
waitlist.html       Pre-launch email sign-up (standalone)
vercel.json         Vercel deployment config
supabase/migrations Database migrations (waitlist table, RLS)
```

## Tech

No build step. React 18 and Babel are loaded from CDN; `.jsx` files are transpiled in the browser at runtime. This keeps the setup simple and the source files fully readable.

## Deployment

The site is deployed on [Vercel](https://vercel.com) via the `main` branch. Every push to `main` triggers an automatic redeploy.

## Local Preview

No install needed. Just open `index.html` in a browser, or serve it with any static file server:

```bash
npx serve .
```

Then open `http://localhost:3000`.

## Waitlist

The `/waitlist` page (`waitlist.html`) lets visitors leave their email before launch.
Sign-ups are written straight to the Supabase `waitlist` table from the browser using
the public anon key (same pattern as `work-summary.html`). Row Level Security allows
anonymous `INSERT` only, so nobody can read the list with the anon key.

A `?source=` query param is recorded with each sign-up (e.g.
`/waitlist?source=linkedin`); it defaults to `website`.

To pull the collected emails, run this with the **service_role** key (Supabase SQL editor):

```sql
SELECT email FROM waitlist ORDER BY created_at DESC;
```

Mark people as notified after announcing the launch:

```sql
UPDATE waitlist SET notified = true WHERE notified = false;
```

The table and its policies are defined in `supabase/migrations/`.

### Welcome email

On a successful sign-up the page calls the `waitlist-welcome` Edge Function
(`supabase/functions/waitlist-welcome/`), which sends a one-time welcome email from
`noreply@babilfinance.com` via the Brevo transactional API. The call is best-effort:
if it fails, the visitor still sees the confirmation.

The function needs a `BREVO_API_KEY` secret set on the Supabase project (Brevo
dashboard, SMTP & API, API Keys). `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are
injected by Supabase automatically. Deploy with:

```bash
supabase functions deploy waitlist-welcome --no-verify-jwt
```
