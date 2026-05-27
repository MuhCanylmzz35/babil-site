/* ─── Privacy, Terms, Support pages ─── */

function PrivacyPage() {
  return (
    <div className="container">
      <article className="doc-page">
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: May 17, 2026 · Effective immediately</p>

        <p>Babil is a personal finance tracker. We've built it so you can keep a full picture of your money without ever handing the underlying data to a third party — not us, not advertisers, not anyone. This policy explains what we collect, why, and what we'll never do.</p>

        <h2>The short version</h2>
        <ul>
          <li><strong>No ads, no trackers, no data sales — ever.</strong></li>
          <li>The Free plan stores everything on your device. We can't read it.</li>
          <li>Babil Pro syncs your data through Supabase using your account. It's encrypted in transit and at rest.</li>
          <li>You can export all your data at any time as CSV.</li>
          <li>You can delete your account and every byte we hold in two taps inside the app.</li>
        </ul>

        <h2>What we collect</h2>
        <p>If you use the Free plan, we collect <strong>nothing</strong>. The app reads and writes to your device's local storage.</p>
        <p>If you sign up for Babil Pro, we collect:</p>
        <ul>
          <li><strong>Account info:</strong> email address and an encrypted password hash.</li>
          <li><strong>Profile (optional):</strong> first name, last name, age range — only if you choose to enter them.</li>
          <li><strong>Your financial records</strong> — expenses, incomes, wallets, accounts, work logs — exactly as you enter them. We never enrich, infer, or share them.</li>
        </ul>

        <h2>How we use it</h2>
        <p>The only things we do with your data:</p>
        <ul>
          <li>Sync it across the devices you sign into.</li>
          <li>Back it up so a lost phone doesn't lose your history.</li>
          <li>Respond to support requests when you email us, and only with your permission.</li>
        </ul>

        <h2>What we don't do</h2>
        <p>We don't sell your data. We don't show it to advertisers. We don't train machine-learning models on it. We don't share aggregated reports with anyone. We don't use it for anything except running the app for you.</p>

        <h2>Where it lives</h2>
        <p>Babil Pro data is stored with <strong>Supabase</strong> (PostgreSQL, EU region). All connections are encrypted (TLS 1.3). Database backups are encrypted at rest. Babil staff cannot view the contents of your records — they're protected by row-level security keyed to your user ID.</p>

        <h2>Your rights</h2>
        <p>Under GDPR / CCPA / KVKK, you have the right to access, correct, export, and delete your data. All four are one-tap inside the app under <strong>Profile → Manage data</strong>. If anything doesn't work, email <a href="#">privacy@babil.app</a> and we'll handle it within 30 days.</p>

        <h2>Contact</h2>
        <p>Babil Finance · Istanbul, Türkiye · <a href="#">privacy@babil.app</a></p>
      </article>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="container">
      <article className="doc-page">
        <h1>Terms of Service</h1>
        <p className="meta">Last updated: May 17, 2026</p>

        <p>By installing or using Babil ("the app"), you agree to these terms. They're written in plain English on purpose — if anything is unclear, email us.</p>

        <h2>1. Who we are</h2>
        <p>Babil is operated by Babil Finance, registered in Istanbul, Türkiye. "We," "us," and "our" refer to Babil Finance throughout this document.</p>

        <h2>2. Using the app</h2>
        <p>You can use Babil if you're at least 13 years old. The Free plan is free of charge for personal use. Babil Pro is a paid subscription billed through the App Store or Google Play under the terms of their respective billing systems.</p>

        <h2>3. Your data is yours</h2>
        <p>You own every record you create in Babil. We hold a license only to store, sync, and display it back to you. We don't claim any rights to your financial data, your notes, your category names, or anything else you enter.</p>

        <h2>4. Babil is not financial advice</h2>
        <p>The app is a tool for tracking what's already happened. It does not provide investment, tax, accounting, or legal advice. Don't make material financial decisions based solely on the numbers shown in Babil — talk to a qualified professional for that.</p>

        <h2>5. Acceptable use</h2>
        <p>You agree not to reverse-engineer the app, abuse the sync service to host non-financial data, or use Babil to commit fraud. We reserve the right to suspend accounts that do.</p>

        <h2>6. Subscription, refunds, cancellation</h2>
        <p>Babil Pro is a recurring subscription. You can cancel any time through your App Store or Google Play account; cancellation takes effect at the end of the current billing period. Refunds are handled by the store, not by us, but we'll happily back any reasonable request you escalate to <a href="#">billing@babil.app</a>.</p>

        <h2>7. Service availability</h2>
        <p>We aim for 99.9% uptime on sync, but we don't guarantee it. The local-only Free plan works regardless of our server status. We're not liable for losses that result from sync downtime — keep your phone backed up.</p>

        <h2>8. Changes</h2>
        <p>We may update these terms occasionally. If we make a material change, we'll show a notice inside the app before it takes effect.</p>

        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of the Republic of Türkiye. Any dispute will be resolved in the Istanbul Çağlayan courts.</p>
      </article>
    </div>
  );
}

function SupportPage({ setPage }) {
  const cats = [
    { ico: "🚀", t: "Getting started", d: "Set up your first wallet, log your first expense, and find your way around." },
    { ico: "💼", t: "Wallets & accounts", d: "Multiple currencies, credit cards, trip wallets — how it all fits together." },
    { ico: "📊", t: "Stats & charts", d: "Reading the donut, comparing periods, exporting your numbers." },
    { ico: "🧾", t: "Installments & recurring", d: "Splitting one big purchase across months, and editing a series after the fact." },
    { ico: "☁️", t: "Sync & Pro", d: "Cross-device sync, account changes, biometric unlock." },
    { ico: "🔒", t: "Privacy & data", d: "Exporting your records, deleting your account, controlling what's stored." },
  ];
  const popular = [
    "How do I switch a wallet's currency without losing data?",
    "Why does my installment show up in months I haven't reached yet?",
    "Where is the CSV import button?",
    "Can I share a wallet with my partner?",
    "How do I reset my password?",
    "What does the streak in Work Log measure?",
  ];
  return (
    <div className="container">
      <article className="doc-page" style={{ maxWidth: 900 }}>
        <h1>Support center</h1>
        <p className="meta">Search articles or contact us directly — we read every email.</p>

        <div style={{ padding: 18, borderRadius: 18, background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="var(--text-secondary)" strokeWidth="1.6"/><path d="M20 20l-3.5-3.5" stroke="var(--text-secondary)" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <input placeholder="Search for an answer…" style={{ flex: 1, background: 0, border: 0, outline: 0, color: "var(--text)", fontSize: 16, fontFamily: "inherit" }} />
        </div>

        <h2 style={{ marginTop: 0 }}>Browse by topic</h2>
        <div className="support-cats">
          {cats.map(c => (
            <div className="support-cat" key={c.t}>
              <div className="ico">{c.ico}</div>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </div>
          ))}
        </div>

        <h2>Popular questions</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {popular.map((q, i) => (
            <li key={i} style={{ borderTop: "1px solid var(--border)", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <span style={{ color: "var(--text)", fontSize: 15, fontWeight: 500 }}>{q}</span>
              <span style={{ color: "var(--primary-muted)" }}>→</span>
            </li>
          ))}
        </ul>

        <h2>Still stuck?</h2>
        <p>Drop us a line at <a href="mailto:support@babilfinance.com">support@babilfinance.com</a> and a real human will reply within 24 hours. For bug reports, please include your app version (Profile → About) and what you were doing when it broke.</p>
        <button className="btn btn-primary btn-lg" onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50); }} style={{ marginTop: 12 }}>Open contact form</button>
      </article>
    </div>
  );
}

Object.assign(window, { PrivacyPage, TermsPage, SupportPage });
