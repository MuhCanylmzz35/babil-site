# Babil — Website

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
vercel.json         Vercel deployment config
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
