/* ─── Babil Landing Page ─── */

function Nav({ page, setPage, variant, setVariant }) {
  const [featOpen, setFeatOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeTimer = React.useRef(null);

  const links = [
    { k: "home", l: "Home" },
    { k: "pricing", l: "Pricing", anchor: true },
    { k: "contact", l: "Support", anchor: true },
  ];

  const featItems = [
    { id: "feat-worklog",    num: "01", label: "Work Log",   color: "#FFB547" },
    { id: "feat-accounts",  num: "02", label: "Accounts",   color: "#00D4AA" },
    { id: "feat-analytics", num: "03", label: "Analytics",  color: "#6C63FF" },
    { id: "feat-tripwallet",num: "04", label: "Trip Wallet",color: "#FF5C5C" },
  ];

  function goAnchor(id) {
    if (page !== "home") { setPage("home"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openFeat()  { clearTimeout(closeTimer.current); setFeatOpen(true); }
  function closeFeat() { closeTimer.current = setTimeout(() => setFeatOpen(false), 120); }

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <button className="logo" onClick={() => setPage("home")} style={{ gap: 14 }}>
          <BabilHex size={56} />
          <span className="logo-text" style={{ fontSize: 44 }}>Babil</span>
        </button>
        <div className="nav-links">
          <button data-active={page === "home"} onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Home</button>

          {/* Features with dropdown */}
          <div style={{ position: "relative" }} onMouseEnter={openFeat} onMouseLeave={closeFeat}>
            <button
              data-active={page === "home"}
              onClick={() => goAnchor("features")}
            >
              Features
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: 4, opacity: 0.5 }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {featOpen && (
              <div className="feat-dropdown" onMouseEnter={openFeat} onMouseLeave={closeFeat}>
                {featItems.map(f => (
                  <button
                    key={f.id}
                    onClick={() => { setFeatOpen(false); goAnchor(f.id); }}
                  >
                    <span style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: f.color,
                      width: 56,
                      flexShrink: 0,
                      letterSpacing: "0.04em",
                      opacity: 0.9,
                    }}>{f.num}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{f.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {links.filter(l => l.k !== "home").map(l => (
            <button key={l.k} data-active={page === l.k || (l.anchor && page === "home")} onClick={() => l.anchor ? goAnchor(l.k) : setPage(l.k)}>{l.l}</button>
          ))}
        </div>
        <div className="nav-cta">
          <button className="btn btn-primary" onClick={() => goAnchor("download")}>Download</button>
        </div>
        <button className="nav-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-link" onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); setMobileOpen(false); }}>Home</button>
          <div className="mobile-menu-label">Features</div>
          {featItems.map(f => (
            <button key={f.id} className="mobile-menu-link" onClick={() => { setMobileOpen(false); goAnchor(f.id); }}>
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 12, fontWeight: 700, color: f.color, width: 32, flexShrink: 0 }}>{f.num}</span>
              {f.label}
            </button>
          ))}
          <button className="mobile-menu-link" onClick={() => { goAnchor("pricing"); setMobileOpen(false); }}>Pricing</button>
          <button className="mobile-menu-link" onClick={() => { goAnchor("contact"); setMobileOpen(false); }}>Support</button>
          <div className="mobile-menu-download">
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => { goAnchor("download"); setMobileOpen(false); }}>Download</button>
          </div>
        </div>
      )}
    </nav>
  );
}

function AppStoreBtn({ store }) {
  const disabledStyle = {
    opacity: 0.45,
    filter: "grayscale(1)",
    cursor: "default",
    pointerEvents: "none",
  };
  if (store === "apple") return (
    <a className="store-btn" href="#" style={disabledStyle} aria-disabled="true">
      <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04c-.02-2.6 2.13-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.95.94-.81 0-2.07-.92-3.41-.89-1.75.03-3.37 1.02-4.27 2.59-1.83 3.17-.47 7.86 1.31 10.43.87 1.26 1.9 2.67 3.25 2.62 1.3-.05 1.79-.84 3.37-.84 1.58 0 2.02.84 3.4.81 1.4-.02 2.29-1.28 3.15-2.54.99-1.46 1.4-2.88 1.42-2.95-.03-.01-2.71-1.04-2.73-4.12zM14.59 4.4c.72-.87 1.21-2.07 1.08-3.27-1.04.04-2.31.69-3.05 1.56-.67.77-1.26 2-1.1 3.18 1.16.09 2.35-.59 3.07-1.47z"/></svg>
      <div><small>Download on the</small><strong>App Store</strong><br /><small style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A94A6" }}>Coming Soon</small></div>
    </a>
  );
  return (
    <a className="store-btn" href="#" style={disabledStyle} aria-disabled="true">
      <svg className="store-icon" viewBox="0 0 24 24"><path fill="#34A853" d="M3.6 1.7c-.4.3-.6.8-.6 1.4v17.8c0 .6.2 1.1.6 1.4l10.8-10.3L3.6 1.7z"/><path fill="#FBBC04" d="M17.4 8.7l-3-1.7-3.6 3.4 3.6 3.4 3-1.7c1.4-.8 1.4-2.6 0-3.4z"/><path fill="#EA4335" d="M14.4 7l-11 6.3 3.6-3.4L14.4 7z" opacity=".95"/><path fill="#4285F4" d="M3.4 22.3l11-6.3-3.6-3.4-7.4 9.7z" opacity=".95"/></svg>
      <div><small>GET IT ON</small><strong>Google Play</strong><br /><small style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A94A6" }}>Coming Soon</small></div>
    </a>
  );
}

function Hero({ variant }) {
  return (
    <section className="hero">
      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="container">
        <div className="hero-grid">
          <div>
            {variant === "bold" ? (
              <h1 className="reveal d1">
                Spending smart<br/>
                is the <span className="accent">real way of earning.</span>
              </h1>
            ) : (
              <h1 className="reveal d1">
                Spending <span className="accent">smart</span> is the<br/>
                real way of earning.
              </h1>
            )}
            <p className="lede reveal d2">
              Run yourself like a one-person company. Babil pulls every account, every work day, and every spending pattern into one clear view, so you can see what's earning, what's draining, and what to change next.
            </p>
            <div className="cta-row reveal d3" id="download">
              <AppStoreBtn store="apple" />
              <AppStoreBtn store="google" />
            </div>
          </div>
          <div className="phone-stage reveal d2">
            {variant === "bold" && <div className="phone-back"><Phone screen="stats" /></div>}
            {variant === "bold" && <div className="phone-back2"><Phone screen="log" /></div>}
            <Phone screen="home" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Features({ variant }) {

  return (
    <section id="features">
      <div className="container">
        <div style={{ maxWidth: 680 }}>
          <div className="section-eyebrow">Features</div>
          {variant === "bold" ? (
            <h2 className="section-title">Built for the way you <em>actually</em> spend.</h2>
          ) : (
            <h2 className="section-title">Built for the way you actually spend.</h2>
          )}
          <p className="section-lede">Not how much you earn. How you spend it. Babil gives you the tools to see every pattern, control every dollar, and actually get ahead.</p>
        </div>

        {/* ── Feature 01 · Work Log ── */}
        <div id="feat-worklog" style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0 10px" }}>
          <span className="feat-eyebrow-chip" style={{ background: "color-mix(in oklab,#FFB547 12%,transparent)", borderColor: "#FFB54766", color: "#FFB547" }}>01 · Work Log</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        </div>
        <div className="feat-block" style={{ marginTop: 0 }}>
          <div className="feat-block-top">
            {/* Left: copy */}
            <div className="feat-block-text">
              <h3 className="feat-h3">You are your own<br/>enterprise.</h3>
              <p className="feat-p">Lead it like a CEO. Log every shift, session, and side gig, then drill into your numbers by week, month, or year. See your real hourly rate, your revenue trends over time, and exactly what your time is worth.</p>
              <div className="feat-chips">
                <div className="feat-chip">
                  <span className="chip-lbl">Worked this week</span>
                  <span className="chip-val" style={{ color: "#FFB547" }}>34.5h</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Earned this week</span>
                  <span className="chip-val" style={{ color: "var(--income)" }}>$980</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Avg hourly rate</span>
                  <span className="chip-val" style={{ color: "#FFB547" }}>$28/hr</span>
                </div>
              </div>
            </div>

            {/* Right: visual */}
            <div className="feat-block-visual">
              <div className="feat-visual-glow" style={{ background: "radial-gradient(ellipse 70% 60% at 62% 50%, color-mix(in oklab,#FFB547 14%, transparent) 0%, transparent 100%)" }}></div>
              <div style={{ position: "relative", zIndex: 2 }}>
                <Phone screen="log" />
              </div>
              {/* Floating: week summary */}
              <div className="feat-float" style={{ right: 24, top: 90 }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Week Summary</div>
                {[
                  { label: "Hours worked", val: "34.5h", color: "#FFB547" },
                  { label: "Avg rate",     val: "$28/hr", color: "#FFB547" },
                  { label: "Net earned",   val: "$980",   color: "#00D4AA" },
                ].map((r, i, arr) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #1E264022" : 0 }}>
                    <span style={{ fontSize: 12, color: "#8A94A6", fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif" }}>{r.val}</span>
                  </div>
                ))}
              </div>
              {/* Floating: your rate card */}
              <div className="feat-float" style={{ left: 24, bottom: 120, width: "auto", padding: "14px 18px" }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Your Rate</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                  <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 700, color: "#FFB547", lineHeight: 1 }}>$28</span>
                  <span style={{ fontSize: 12, color: "#8A94A6", fontWeight: 600 }}>/hr avg</span>
                </div>
                <div style={{ fontSize: 11, color: "#00D4AA", fontWeight: 600, marginTop: 6 }}>↑ 12% vs last week</div>
              </div>
            </div>
          </div>
          <DailyLogBottom />
        </div>



        {/* ── Feature 02 · Accounts & Multi-wallet ── */}
        <div id="feat-accounts" style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0 10px" }}>
          <span className="feat-eyebrow-chip" style={{ background: "color-mix(in oklab,#00D4AA 12%,transparent)", borderColor: "#00D4AA66", color: "#00D4AA" }}>02 · Accounts</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        </div>
        <div className="feat-block" style={{ marginTop: 0 }}>
          <div className="feat-block-top">
            {/* Left: copy */}
            <div className="feat-block-text">
              <h3 className="feat-h3">Every account.<br/>One wallet.</h3>
              <p className="feat-p">
                Babil layers every account you own, debit, credit, savings, cash, under a single wallet. See your real net worth across all accounts, monitor credit utilization before it hurts your score, and keep travel spending in its own dedicated trip wallet.
              </p>
              <div className="feat-chips">
                <div className="feat-chip">
                  <span className="chip-lbl">Total balance</span>
                  <span className="chip-val" style={{ color: "#00D4AA" }}>$2,660</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Accounts tracked</span>
                  <span className="chip-val" style={{ color: "var(--primary)" }}>4 accounts</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Credit util</span>
                  <span className="chip-val" style={{ color: "#FFB547" }}>43%</span>
                </div>
              </div>
            </div>
            {/* Right: visual */}
            <div className="feat-block-visual">
              <div className="feat-visual-glow" style={{ background: "radial-gradient(ellipse 70% 60% at 62% 50%, color-mix(in oklab,#00D4AA 14%, transparent) 0%, transparent 100%)" }}></div>
              <div style={{ position: "relative", zIndex: 2 }}>
                <Phone screen="wallet" />
              </div>
              {/* Floating: Net Worth */}
              <div className="feat-float" style={{ right: 28, top: 90 }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Net Worth</div>
                {[
                  { label: "All assets",  val: "$3,180",  color: "#00D4AA" },
                  { label: "Credit debt", val: "−$520",   color: "#FF5C5C" },
                  { label: "Net total",   val: "$2,660",  color: "#fff"    },
                ].map((r, i, arr) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #1E264022" : 0 }}>
                    <span style={{ fontSize: 12, color: "#8A94A6", fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif" }}>{r.val}</span>
                  </div>
                ))}
              </div>
              {/* Floating: May net flow */}
              <div className="feat-float" style={{ left: 28, bottom: 110, width: "auto", padding: "12px 18px" }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>May net flow</div>
                <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, fontWeight: 700, color: "#00D4AA" }}>+$4,210</div>
                    <div style={{ fontSize: 10, color: "#8A94A6", marginTop: 2 }}>income</div>
                  </div>
                  <div style={{ width: 1, height: 28, background: "#1E2640" }}></div>
                  <div>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, fontWeight: 700, color: "#FF5C5C" }}>−$2,045</div>
                    <div style={{ fontSize: 10, color: "#8A94A6", marginTop: 2 }}>expense</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ── Bottom: Credit health + Trip wallets ── */}
          <div className="feat-block-bottom" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 220 }}>
            {/* Left: Credit Utilization */}
            <div style={{ padding: "28px 36px 32px", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 18 }}>Credit Utilization</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { em: "💳", name: "BabilBank Credit",   debt: 520,  limit: 1200, util: 0.43, color: "#FFB547" },
                  { em: "💳", name: "BabilBank Premium",  debt: 3120, limit: 4000, util: 0.78, color: "#FF5C5C" },
                  { em: "💳", name: "BabilBank Rewards",  debt: 280,  limit: 2000, util: 0.14, color: "#00D4AA" },
                  { em: "💳", name: "BabilBank Platinum", debt: 950,  limit: 3000, util: 0.32, color: "#FFB547" },
                ].map((card, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 100, background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{card.em}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{card.name}</div>
                        <div style={{ fontSize: 10, color: "var(--text-secondary)", marginTop: 1 }}>${card.debt.toLocaleString()} / ${card.limit.toLocaleString()} limit</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: card.color, fontFamily: "Space Grotesk, sans-serif" }}>{Math.round(card.util * 100)}%</div>
                    </div>
                    <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${card.util * 100}%`, background: card.color, borderRadius: 3 }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Keep utilization under 30% to protect your credit score. Babil flags it so you catch it first.
              </div>
            </div>
            {/* Right: Category Settings mockup */}
            <div style={{ padding: "28px 36px 32px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 14 }}>Customize Categories</div>

              {/* Card */}
              <div style={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-elevated)", overflow: "hidden" }}>

                {/* Expenses / Sources tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                  {["Expenses", "Sources"].map((tab, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", cursor: "pointer" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "var(--text)" : "var(--text-secondary)" }}>{tab}</span>
                      {i === 0 && <div style={{ height: 2, width: "40%", background: "var(--primary)", borderRadius: 2, marginTop: 6 }}></div>}
                    </div>
                  ))}
                </div>



                {/* Category rows */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    { em: "🍔", name: "Food"             },
                    { em: "🚗", name: "Transport"        },
                    { em: "💡", name: "Bills"            },
                    { em: "📈", name: "Investment"       },
                    { em: "🎉", name: "Arbitrary Extras" },
                  ].map((cat, i, arr) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "9px 16px",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3A4258", flexShrink: 0 }}></div>
                      <span style={{ fontSize: 18 }}>{cat.em}</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{cat.name}</span>
                    </div>
                  ))}
                </div>

                {/* Add Category */}
                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", cursor: "pointer" }}>+ Add Category</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature 03 · Analytics ── */}
        <div id="feat-analytics" style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0 10px" }}>
          <span className="feat-eyebrow-chip">03 · Analytics</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        </div>
        <div className="feat-block" style={{ marginTop: 0 }}>
          <div className="feat-block-top">

            {/* Left: copy */}
            <div className="feat-block-text">
              <h3 className="feat-h3">See what's actually<br/>draining you.</h3>
              <p className="feat-p">
                Knowing your income doesn't put you in control. Babil maps every expense category, every income source, and every period, so the quiet patterns draining your money become impossible to ignore.
              </p>
              <div className="feat-chips">
                <div className="feat-chip">
                  <span className="chip-lbl">Top expense · May</span>
                  <span className="chip-val" style={{ color: "#6C63FF" }}>🏠 Rent · 38%</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Net saved · May</span>
                  <span className="chip-val" style={{ color: "var(--income)" }}>+$2,165</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Trend vs last month</span>
                  <span className="chip-val" style={{ color: "var(--expense)" }}>↑ 12% on food</span>
                </div>
              </div>
            </div>

            {/* Right: visual */}
            <div className="feat-block-visual">
              <div className="feat-visual-glow" />

              {/* Phone */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <Phone screen="stats" />
              </div>

              {/* Floating: Income sources */}
              <div className="feat-float" style={{ right: 28, top: 80 }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Income Sources</div>
                {[
                  { em: "💼", name: "Salary",      val: "$3,200" },
                  { em: "🎨", name: "Freelance",   val: "$840"   },
                  { em: "📈", name: "Investment",  val: "$170"   },
                ].map((r, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #1E264022" : 0 }}>
                    <span style={{ fontSize: 14 }}>{r.em}</span>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{r.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#00D4AA" }}>+{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Floating: Top 3 categories */}
              <div className="feat-float" style={{ left: 28, bottom: 110 }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Top 3 this month</div>
                {[
                  { em: "🏠", name: "Rent",     pct: "38%", val: "$780", color: "#6C63FF" },
                  { em: "🛍️", name: "Shopping", pct: "24%", val: "$495", color: "#FFB547" },
                  { em: "🍽️", name: "Food",     pct: "18%", val: "$369", color: "#00D4AA" },
                ].map((r, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid #1E264022" : 0 }}>
                    <span style={{ fontSize: 13 }}>{r.em}</span>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: "#8A94A6", marginRight: 6 }}>{r.pct}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom: Activity list + Installment visual ── */}
          <div className="feat-block-bottom" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 220 }}>

            {/* Left: Recent category activity */}
            <div style={{ padding: "28px 36px 32px", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 18 }}>Recent Activity</div>
              <div className="feat-recent-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                {[
                  { em: "🏠", cat: "Rent",       date: "May 1",  amt: "−$780",  neg: true  },
                  { em: "🛍️", cat: "Shopping",   date: "May 3",  amt: "−$124",  neg: true  },
                  { em: "💼", cat: "Salary",      date: "May 5",  amt: "+$3,200",neg: false },
                  { em: "🍽️", cat: "Food",        date: "May 7",  amt: "−$68",   neg: true  },
                  { em: "🚗", cat: "Transport",   date: "May 9",  amt: "−$42",   neg: true  },
                  { em: "🎨", cat: "Freelance",   date: "May 12", amt: "+$840",  neg: false },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--border-ghost)" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 100, background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{r.em}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.cat}</div>
                      <div style={{ fontSize: 10, color: "var(--text-secondary)", marginTop: 1 }}>{r.date}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: r.neg ? "var(--expense)" : "var(--income)", flexShrink: 0 }}>{r.amt}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Installment entry concept */}
            <div style={{ padding: "28px 36px 32px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 18 }}>Log Once, Split Across Months</div>

              {/* Mock expense entry card */}
              <div style={{ borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-elevated)", overflow: "hidden" }}>
                {/* Entry header */}
                <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 100, background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>💻</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>MacBook Pro</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Electronics · May 1, 2026</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: "var(--expense)" }}>−$2,388</div>
                </div>

                {/* Installment toggle row */}
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>Pay in installments</span>
                  {/* Toggle — ON state */}
                  <div style={{ width: 36, height: 20, borderRadius: 100, background: "var(--primary)", position: "relative", flexShrink: 0 }}>
                    <div style={{ position: "absolute", right: 2, top: 2, width: 16, height: 16, borderRadius: 100, background: "#fff" }} />
                  </div>
                </div>

                {/* Installment details */}
                <div style={{ padding: "12px 16px", display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, padding: "10px 12px", borderRadius: 10, background: "var(--bg)", border: "1px solid var(--primary-ghost-border)" }}>
                    <div style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 3 }}>MONTHS</div>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: "var(--primary)" }}>12</div>
                  </div>
                  <div style={{ flex: 1, padding: "10px 12px", borderRadius: 10, background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 3 }}>PER MONTH</div>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>$199</div>
                  </div>
                  <div style={{ flex: 1, padding: "10px 12px", borderRadius: 10, background: "var(--bg)", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 3 }}>TOTAL</div>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>$2,388</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Log it once. Babil spreads the cost across the right months automatically.
              </div>
            </div>

          </div>
        </div>

        {/* ── Feature 04 · Trip Wallet ── */}
        <div id="feat-tripwallet" style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0 10px" }}>
          <span className="feat-eyebrow-chip" style={{ background: "color-mix(in oklab,#FF5C5C 12%,transparent)", borderColor: "#FF5C5C66", color: "#FF5C5C" }}>04 · Trip Wallet</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        </div>
        <div className="feat-block" style={{ marginTop: 0 }}>
          <div className="feat-block-top">

            {/* Left: copy */}
            <div className="feat-block-text">
              <h3 className="feat-h3">Your trip.<br/>Your budget.</h3>
              <p className="feat-p">
                Travel spending is different: it's intense, short, and category-heavy. Babil gives every trip its own wallet so it never bleeds into your monthly budget. See exactly where your money went, day by day and category by category.
              </p>
              <div className="feat-chips">
                <div className="feat-chip">
                  <span className="chip-lbl">Las Vegas total</span>
                  <span className="chip-val" style={{ color: "#FF5C5C" }}>$847.30</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Avg per day</span>
                  <span className="chip-val" style={{ color: "#FFB547" }}>$169/day</span>
                </div>
                <div className="feat-chip">
                  <span className="chip-lbl">Top category</span>
                  <span className="chip-val" style={{ color: "#00B4D8" }}>🍽️ Food · 30%</span>
                </div>
              </div>
            </div>

            {/* Right: visual */}
            <div className="feat-block-visual">
              <div className="feat-visual-glow" style={{ background: "radial-gradient(ellipse 70% 60% at 62% 50%, color-mix(in oklab,#FF5C5C 14%, transparent) 0%, transparent 100%)" }}></div>
              <div style={{ position: "relative", zIndex: 2 }}>
                <Phone screen="lasvegas" />
              </div>

              {/* Floating: Budget status */}
              <div className="feat-float" style={{ right: 28, top: 90 }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Trip Summary</div>
                {[
                  { label: "Total spent",  val: "$847.30", color: "#FF5C5C" },
                  { label: "Avg / day",    val: "$169",    color: "#FFB547" },
                  { label: "Days logged",  val: "5 days",  color: "#fff"    },
                ].map((r, i, arr) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #1E264022" : 0 }}>
                    <span style={{ fontSize: 12, color: "#8A94A6", fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif" }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Floating: Top category */}
              <div className="feat-float" style={{ left: 28, bottom: 110, width: "auto", padding: "12px 18px" }}>
                <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Top spend</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>🍽️</span>
                  <div>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, fontWeight: 700, color: "#00B4D8", lineHeight: 1 }}>$254.19</div>
                    <div style={{ fontSize: 10, color: "#8A94A6", fontWeight: 600, marginTop: 3 }}>Food · 30%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom: Category breakdown + Multi-trip comparison ── */}
          <div className="feat-block-bottom" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 220 }}>

            {/* Left: Las Vegas Category Breakdown */}
            <div style={{ padding: "28px 36px 32px", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 18 }}>Las Vegas · Category Breakdown</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { em: "🍽️", name: "Food & Drinks",  amt: "$254.19", pct: 30, c: "#00B4D8" },
                  { em: "🏨", name: "Lodging",         amt: "$220.30", pct: 26, c: "#00D4AA" },
                  { em: "🎭", name: "Entertainment",   amt: "$169.46", pct: 20, c: "#FF7A35" },
                  { em: "✈️", name: "Transportation",  amt: "$101.68", pct: 12, c: "#FF5C5C" },
                  { em: "🛍️", name: "Shopping",        amt: "$67.78",  pct:  8, c: "#FFB547" },
                  { em: "🎁", name: "Gifts",           amt: "$33.89",  pct:  4, c: "#A78BFA" },
                ].map((cat, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 100, background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{cat.em}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{cat.name}</div>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--text-secondary)", marginRight: 6 }}>{cat.pct}%</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: cat.c, fontFamily: "Space Grotesk, sans-serif" }}>{cat.amt}</span>
                    </div>
                    <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${cat.pct * 3}%`, background: cat.c, borderRadius: 3 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Trip Wallets list (mirrors WalletSettingsScreen trip tab) */}
            <div style={{ padding: "28px 36px 32px" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>My Trips</div>
                <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-secondary)" }}>
                  <span>2 trips</span><span>·</span><span>9 days</span><span>·</span><span>56 entries</span>
                </div>
              </div>

              {/* Trip wallet cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    em: "🎰", name: "Las Vegas 2026",     status: "Active",    statusColor: "#00D4AA",
                    date: "2026-05-08 / 2026-05-12",
                    total: "$847.30", days: 5, avgDay: "$169", entries: 24,
                    cats: [
                      { c: "#00B4D8", em: "🍽️", pct: 30 }, { c: "#00D4AA", em: "🏨", pct: 26 },
                      { c: "#FF7A35", em: "🎭", pct: 20 }, { c: "#FF5C5C", em: "✈️", pct: 12 },
                      { c: "#FFB547", em: "🛍️", pct: 8  }, { c: "#A78BFA", em: "🎁", pct: 4  },
                    ],
                  },
                  {
                    em: "👑", name: "Halloween New York", status: "Completed", statusColor: "#8A94A6",
                    date: "2025-10-30 / 2025-11-02",
                    total: "$592.56", days: 4, avgDay: "$148", entries: 32,
                    cats: [
                      { c: "#00B4D8", em: "🍔", pct: 32 }, { c: "#00D4AA", em: "🏛️", pct: 18 },
                      { c: "#C8A97E", em: "✈️", pct: 16 }, { c: "#FFB547", em: "🎉", pct: 13 },
                      { c: "#FF5C5C", em: "🎫", pct: 12 }, { c: "#4ADE80", em: "🎁", pct: 7  },
                    ],
                  },
                ].map((trip, ti) => (
                  <div key={ti} style={{ borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-elevated)", overflow: "hidden" }}>
                    {/* Card header */}
                    <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)" }}>
                      <div style={{ width: 34, height: 34, borderRadius: 17, background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{trip.em}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{trip.name}</span>
                          <span style={{ padding: "2px 8px", borderRadius: 100, background: trip.statusColor + "22", border: `1px solid ${trip.statusColor}44`, fontSize: 10, fontWeight: 700, color: trip.statusColor, flexShrink: 0 }}>● {trip.status}</span>
                        </div>
                        <div style={{ fontSize: 10, color: "var(--text-secondary)", marginTop: 1 }}>{trip.date}</div>
                      </div>
                      <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 15, fontWeight: 800 }}>{trip.total}</span>
                    </div>
                    {/* Card body */}
                    <div style={{ padding: "8px 14px 10px" }}>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 7 }}>{trip.days} days · {trip.avgDay}/day · {trip.entries} entries</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 10px", marginBottom: 7 }}>
                        {trip.cats.map((c, ci) => (
                          <span key={ci} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.c, display: "inline-block", flexShrink: 0 }}></span>
                            <span style={{ fontSize: 12 }}>{c.em}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>{c.pct}%</span>
                          </span>
                        ))}
                      </div>
                      <div style={{ height: 4, borderRadius: 3, overflow: "hidden", display: "flex" }}>
                        {trip.cats.map((c, ci) => (
                          <div key={ci} style={{ flex: c.pct, background: c.c }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>



      </div>
    </section>
  );
}

function DailyLogBottom() {
  const containerRef = React.useRef(null);
  const stRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const DUR = 1600, PAUSE = 2800;
  const DAY_HOURS = [6, 8, 7.5, 8, 5, 0, 0];
  const DAY_EARN  = [168, 224, 210, 224, 154, 0, 0];
  const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const MAX_H = 140, MAX_HOURS = 9;

  React.useEffect(() => {
    function easeOut(x) { return 1 - Math.pow(1 - x, 3); }
    function tick(ts) {
      if (!stRef.current) stRef.current = ts;
      const raw = Math.min((ts - stRef.current) / DUR, 1);
      const ep = easeOut(raw);
      const el = containerRef.current;
      if (!el) return;
      const barHeights = [];
      el.querySelectorAll('.feat-dl-bar').forEach((bar, i) => {
        const h = Math.round(ep * (DAY_HOURS[i] / MAX_HOURS) * MAX_H);
        bar.style.height = h + 'px';
        bar.style.background = DAY_HOURS[i] > 0 ? 'linear-gradient(180deg,#FFB547,#FF6B35)' : '#1E2640';
        barHeights.push(h);
      });
      el.querySelectorAll('.feat-dl-earn').forEach((earn, i) => {
        earn.textContent = DAY_EARN[i] > 0 ? '$' + Math.round(ep * DAY_EARN[i]) : '';
        earn.style.opacity = ep;
        const overflow = Math.max(0, (barHeights[i] || 0) - 76);
        earn.style.transform = `translateY(${-overflow}px)`;
      });
      const tv = el.querySelector('.feat-dl-total-val');
      if (tv) tv.textContent = '$' + Math.round(ep * 980);
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => { stRef.current = null; rafRef.current = requestAnimationFrame(tick); }, PAUSE);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="feat-dl-bottom" ref={containerRef}>
      <div className="feat-dl-week">
        {DAYS.map((d, i) => (
          <div key={i} className="feat-dl-day">
            <div className="feat-dl-earn"></div>
            <div className="feat-dl-bar-wrap">
              <div className="feat-dl-bar" style={{ height: 0, background: "#1E2640" }}></div>
            </div>
            <div className="feat-dl-hours">{DAY_HOURS[i] ? DAY_HOURS[i] + 'h' : '—'}</div>
            <div className="feat-dl-label">{d}</div>
          </div>
        ))}
        <div className="feat-dl-divider"></div>
        <div className="feat-dl-total">
          <div className="feat-dl-total-label">Earned</div>
          <div className="feat-dl-total-val">$0</div>
          <div className="feat-dl-total-sub">34.5h this week</div>
        </div>
      </div>
      <div className="feat-dl-jobs">
        {[
          { color: "#6C63FF", name: "Rideshare", h: "22h",   earn: "$620" },
          { color: "#00D4AA", name: "Server",    h: "12.5h", earn: "$310" },
          { color: "#FFB547", name: "Cash tips", h: "—",     earn: "$50"  },
        ].map((job, i) => (
          <div key={i} className="feat-dl-job">
            <span style={{ width: 10, height: 10, borderRadius: 3, background: job.color, display: "block", flexShrink: 0 }}></span>
            <span style={{ flex: 1 }}>{job.name}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{job.h}</span>
            <span style={{ color: "var(--income)", fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", minWidth: 48, textAlign: "right" }}>{job.earn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks({ variant }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [tick, setTick] = React.useState(0);
  const DURATION = 4000;

  const steps = [
    {
      num: "01",
      title: "Set up in seconds",
      body: "Pick your currency, name your wallet, add accounts: debit, credit, cash. You're ready before your coffee gets cold.",
      screen: "wallet",
      accent: "#00D4AA",
    },
    {
      num: "02",
      title: "Log as you go",
      body: "3 taps to add an expense. Pick a category, split into installments if you need to. Babil suggests recent entries to make it even faster.",
      screen: "home",
      accent: "#6C63FF",
    },
    {
      num: "03",
      title: "Track your work",
      body: "Open Work Log, enter your hours and extras. Babil calculates your real hourly rate and weekly earnings automatically.",
      screen: "log",
      accent: "#FFB547",
    },
    {
      num: "04",
      title: "See the full picture",
      body: "Your money, mapped by category, by month, by account. The quiet patterns draining you become impossible to ignore.",
      screen: "stats",
      accent: "#FF5C5C",
    },
  ];

  // Auto-advance timer — resets whenever activeStep changes
  React.useEffect(() => {
    const id = setTimeout(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
      setTick(t => t + 1);
    }, DURATION);
    return () => clearTimeout(id);
  }, [activeStep]);

  function handleClick(i) {
    setActiveStep(i);
    setTick(t => t + 1);
  }

  const active = steps[activeStep];

  return (
    <section id="how">
      <div className="container">
        <div className="section-eyebrow">How it works</div>

        <div className="hiw-layout">

          {/* ── Left: step list ── */}
          <div className="hiw-steps">
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  className="hiw-step"
                  data-active={String(isActive)}
                  onClick={() => handleClick(i)}
                  style={{ "--step-color": s.accent }}
                >
                  <div className="hiw-bar"></div>
                  <div className="hiw-num">{s.num}</div>
                  <div className="hiw-text">
                    <h4 className="hiw-title">{s.title}</h4>
                    <p className="hiw-desc">{s.body}</p>
                  </div>
                  {isActive && (
                    <div
                      key={`prog-${activeStep}-${tick}`}
                      className="hiw-progress"
                      style={{ "--hiw-dur": DURATION + "ms", background: s.accent }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Right: sticky phone ── */}
          <div className="hiw-phone-col">
            <div className="hiw-phone-sticky">
              <div
                className="hiw-glow"
                style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${active.accent}28 0%, transparent 70%)` }}
              ></div>
              <div key={activeStep} className="hiw-phone-anim">
                <Phone screen={active.screen} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const PRICING_PLANS = [
  {
    id: "free",
    label: "Free",
    priceMonthly: "$0",
    priceYearly: "$0",
    perMonthYearly: "$0",
    billingNote: "forever",
    color: "#8A94A6",
    featured: false,
    cta: "Get the app",
    ctaStyle: "secondary",
  },
  {
    id: "premium",
    label: "Premium",
    priceMonthly: "$4.99",
    priceYearly: "$35.99",
    perMonthYearly: "$2.99",
    color: "#FF7A35",
    featured: false,
    cta: "Try free for 7 days",
    ctaStyle: "ghost-amber",
  },
  {
    id: "unlimited",
    label: "Unlimited",
    priceMonthly: "$8.99",
    priceYearly: "$59.99",
    perMonthYearly: "$4.99",
    color: "#6C63FF",
    featured: true,
    cta: "Try free for 7 days",
    ctaStyle: "primary",
  },
];

const PRICING_FEATURES = [
  { label: "Unlimited entries",              free: true,            premium: true,             unlimited: true        },
  { label: "Unlimited accounts in wallets",  free: true,            premium: true,             unlimited: true        },
  { label: "Customize categories & sources", free: true,            premium: true,             unlimited: true        },
  { label: "Main wallets",                   free: "1 main wallet", premium: "3 main wallets", unlimited: "Unlimited",
    tooltip: "Ongoing ledgers, e.g. Personal, Freelance, separate countries." },
  { label: "Trip wallets",                   free: "1 trip wallet", premium: "4 trip wallets", unlimited: "Unlimited",
    tooltip: "Bounded budgets for vacations, weddings, renovations. Won't mix with your monthly stats." },
  { label: "CSV import",                     free: false,           premium: "3 imports",      unlimited: "Unlimited" },
  { label: "Job preset library",             free: false,           premium: "3 presets",      unlimited: "Unlimited",
    tooltip: "Add your jobs once, tap to log. Set an hourly rate and your earnings calculate automatically." },
];

function InfoTooltip({ text, isOpen, onToggle }) {
  const btnRef = React.useRef(null);
  const [rect, setRect] = React.useState(null);

  function handleClick(e) {
    e.stopPropagation();
    if (!isOpen && btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    onToggle(!isOpen);
  }

  React.useEffect(() => {
    if (!isOpen) return;
    function onDown(e) { if (btnRef.current && !btnRef.current.contains(e.target)) onToggle(false); }
    function onScroll() { onToggle(false); }
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    return () => { document.removeEventListener("mousedown", onDown); window.removeEventListener("scroll", onScroll, true); };
  }, [isOpen]);

  const TW = 220;
  const tooltipLeft = rect ? Math.min(Math.max(16, rect.left + rect.width / 2 - TW / 2), window.innerWidth - TW - 16) : 0;
  const caretLeft   = rect ? Math.max(12, Math.min(rect.left + rect.width / 2 - tooltipLeft, TW - 20)) : 0;

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleClick}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 16, height: 16, borderRadius: "50%",
          background: "transparent", border: "none", cursor: "pointer", padding: 0,
          marginLeft: 5, verticalAlign: "middle", flexShrink: 0,
          color: isOpen ? "var(--primary-muted)" : "var(--text-dim)",
          transition: "color 0.15s",
        }}
        aria-label="More info"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7.5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="5.5" r="0.8" fill="currentColor"/>
        </svg>
      </button>
      {isOpen && rect && ReactDOM.createPortal(
        <div style={{
          position: "fixed",
          top: rect.bottom + 10,
          left: tooltipLeft,
          width: TW,
          zIndex: 9999,
          pointerEvents: "none",
          animation: "dropInSimple 0.15s cubic-bezier(0.2,0.7,0.2,1) forwards",
        }}>
          <div style={{
            position: "absolute", top: -6, left: caretLeft,
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "7px solid var(--border)",
          }}>
            <div style={{
              position: "absolute", top: 1, left: -5,
              width: 0, height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: "6px solid var(--bg-elevated)",
            }} />
          </div>
          <div style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 12,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05)",
          }}>
            {text}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function PricingCell({ value, color, extraStyle }) {
  const cellBase = { textAlign: "center", padding: "7px 8px", borderLeft: "1px solid var(--border)", ...extraStyle };
  if (value === true) {
    return (
      <td style={cellBase}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block" }}>
          <circle cx="10" cy="10" r="10" fill={color + "22"} />
          <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </td>
    );
  }
  if (value === false) {
    return (
      <td style={cellBase}>
        <span style={{ color: "#FFFFFF", fontSize: 22, lineHeight: 1, display: "inline-block", opacity: 0.5 }}>—</span>
      </td>
    );
  }
  return (
    <td style={cellBase}>
      <span style={{
        display: "inline-block",
        fontSize: 12, fontWeight: 700, color,
        fontFamily: "Space Grotesk, sans-serif",
        background: color + "18",
        padding: "3px 9px", borderRadius: 20,
        whiteSpace: "nowrap",
      }}>{value}</span>
    </td>
  );
}

// ─── Wallet diagram - 3D animated ──────────────────────────────────────────────
function WalletDiagramWeb({ slide, tierColor, layout }) {
  if (!slide) return null;
  const tc  = tierColor || '#A78BFA';
  const isH = layout === 'horizontal';
  const [vis, setVis] = React.useState(false);
  const [animKey, setAnimKey] = React.useState(0);
  const uid = React.useId().replace(/:/g,'');

  React.useEffect(() => {
    setVis(false);
    const t = setTimeout(() => { setVis(true); setAnimKey(k => k+1); }, 60);
    return () => clearTimeout(t);
  }, [slide.id]);

  const diagCSS = `
    @keyframes wdYouIn  { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
    @keyframes wdRing   { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.55} 100%{transform:translate(-50%,-50%) scale(2.4);opacity:0} }
    @keyframes wdCardIn { from{opacity:0;transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(16px)} to{opacity:1;transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(0)} }
    @keyframes wdFloat  { 0%,100%{transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(0)} 50%{transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(-5px)} }
    @keyframes wdItemIn { from{opacity:0;transform:translateX(-7px)} to{opacity:1;transform:translateX(0)} }
    @keyframes wdGlow   { 0%,100%{opacity:0.3;transform:scaleX(0.75)} 50%{opacity:0.7;transform:scaleX(1.05)} }
  `;

  function ItemIconMini({ label }) {
    const l = (label||'').toLowerCase();
    const c = 'rgba(255,255,255,0.44)'; const sw = '1.3';
    if (l.includes('credit')||l.includes('debit')||l.includes('card'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={c} strokeWidth={sw}/><line x1="2" y1="10" x2="22" y2="10" stroke={c} strokeWidth={sw}/><rect x="5" y="13" width="4" height="2" rx="0.5" fill={c}/></svg>;
    if (l.includes('cash'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke={c} strokeWidth={sw}/><circle cx="12" cy="12" r="3" stroke={c} strokeWidth={sw}/><circle cx="5" cy="12" r="1" fill={c}/><circle cx="19" cy="12" r="1" fill={c}/></svg>;
    if (l.includes('saving'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8v2H4v-2z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/><path d="M8 18v1M16 18v1" stroke={c} strokeWidth={sw} strokeLinecap="round"/></svg>;
    if (l.includes('transport'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" stroke={c} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round"/></svg>;
    if (l.includes('lodging')||l.includes('hotel'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/><rect x="9" y="14" width="6" height="8" stroke={c} strokeWidth={sw} strokeLinejoin="round"/></svg>;
    if (l.includes('food'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><line x1="18" y1="8" x2="18" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/><path d="M15 8a3 3 0 006 0" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="6" y1="3" x2="6" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="3" y1="3" x2="3" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="9" y1="3" x2="9" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="3" y1="10" x2="9" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/></svg>;
    if (l.includes('gift'))
      return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="18" height="12" rx="1" stroke={c} strokeWidth={sw}/><rect x="3" y="6" width="18" height="3" rx="1" stroke={c} strokeWidth={sw}/><line x1="12" y1="6" x2="12" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/></svg>;
    return <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.5" fill={c}/><circle cx="12" cy="12" r="1.5" fill={c}/><circle cx="19" cy="12" r="1.5" fill={c}/></svg>;
  }

  function WalletCard({ wallet, isTrip, idx }) {
    const cc = isTrip ? '#FF7A2F' : tc;
    const items = isTrip ? wallet.categories : wallet.accounts;
    const d = idx * 110; const fd = d + 720;
    const n = (wallet.name||'').toLowerCase();
    return (
      <div style={{ position:'relative', flex:1, minWidth:0 }}>
        <div style={{ position:'absolute',bottom:-6,left:'12%',right:'12%',height:16,background:`radial-gradient(ellipse, ${cc}55 0%, transparent 70%)`,filter:'blur(5px)',pointerEvents:'none',animation:vis?`wdGlow 4s ease-in-out ${fd}ms infinite`:'none' }} />
        <div style={{ background:`linear-gradient(148deg, ${cc}14 0%, ${cc}06 100%)`,border:`1px solid ${cc}55`,borderRadius:13,padding:'11px 11px 9px',position:'relative',overflow:'hidden',boxShadow:`0 14px 36px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.32), inset 0 1px 0 ${cc}35`,animation:vis?`wdCardIn 0.58s cubic-bezier(0.16,1,0.3,1) ${d}ms both, wdFloat 5s ease-in-out ${fd}ms infinite`:'none' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${cc}AA,transparent)` }} />
          <div style={{ position:'absolute',top:0,right:0,width:28,height:28,background:`radial-gradient(circle at 100% 0%, ${cc}22 0%, transparent 70%)`,pointerEvents:'none' }} />
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8 }}>
            <div style={{ display:'flex',alignItems:'center',gap:6 }}>
              <div style={{ width:26,height:26,borderRadius:7,background:`${cc}22`,border:`1px solid ${cc}44`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                {isTrip ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={cc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5" stroke={cc} strokeWidth="1.4"/></svg>
                : n.includes('business') ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="18" height="13" rx="1.5" stroke={cc} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 9V7a4 4 0 018 0v2" stroke={cc} strokeWidth="1.5" strokeLinecap="round"/></svg>
                : n.includes('account') ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="20" height="13" rx="2" stroke={cc} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 8V6a4 4 0 018 0v2" stroke={cc} strokeWidth="1.5" strokeLinecap="round"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={cc} strokeWidth="1.5"/><path d="M4.5 20c0-4 3.36-7 7.5-7s7.5 3 7.5 7" stroke={cc} strokeWidth="1.5" strokeLinecap="round"/></svg>}
              </div>
              <span style={{ color:'#E4EEF8',fontSize:13.1,fontWeight:700,fontFamily:'Space Grotesk, sans-serif',lineHeight:1.2,letterSpacing:'-0.01em' }}>{wallet.name}</span>
            </div>
            <span style={{ color:cc,fontSize:9.4,fontWeight:800,background:`${cc}1A`,border:`1px solid ${cc}40`,borderRadius:4,padding:'2px 5px',letterSpacing:'0.05em',fontFamily:'Space Grotesk, sans-serif',flexShrink:0 }}>{wallet.currency}</span>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:2.5 }}>
            {items.map((it, ii) => (
              <div key={it.label} style={{ display:'flex',alignItems:'center',gap:6,padding:'3px 7px',borderLeft:`1.5px solid ${cc}40`,background:`${cc}06`,borderRadius:'0 4px 4px 0',opacity:vis?1:0,animation:vis?`wdItemIn 0.38s ease ${d+220+ii*58}ms both`:'none' }}>
                <ItemIconMini label={it.label} />
                <span style={{ color:'#6A8098',fontSize:11.3,fontWeight:500,letterSpacing:'0.01em' }}>{it.label}</span>
              </div>
            ))}
            {!isTrip && (
              <div style={{ display:'flex',alignItems:'center',gap:6,padding:'3px 7px',borderLeft:`1.5px dashed ${cc}28`,borderRadius:'0 4px 4px 0',opacity:vis?0.45:0,animation:vis?`wdItemIn 0.38s ease ${d+220+items.length*58}ms both`:'none' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke={cc} strokeWidth="1.8" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={cc} strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span style={{ color:`${cc}80`,fontSize:10,fontWeight:600,letterSpacing:'0.04em',fontFamily:'Space Grotesk, sans-serif' }}>Add account</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const ghostCounts = { free:{main:0,trip:0}, premium:{main:1,trip:2}, unlimited:{main:1,trip:2} };
  const ghosts = ghostCounts[slide.id] || {main:0,trip:0};
  const isUnlimited = slide.id === 'unlimited';

  function GhostCard({ color, isUnlim, delay }) {
    return (
      <div style={{ flex:1, minWidth:0, border:`1.5px dashed ${color}45`, borderRadius:11, padding:'6px', display:'flex', alignItems:'center', justifyContent:'center', background:`${color}04`, opacity:vis?0.55:0, animation:vis?`wdCardIn 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`:'none', minHeight:54 }}>
        <div style={{ width:22,height:22,borderRadius:'50%',border:`1.5px dashed ${color}50`,display:'flex',alignItems:'center',justifyContent:'center',color:`${color}80`,fontSize:isUnlim?13:16,fontWeight:300,lineHeight:1 }}>
          {isUnlim ? '∞' : '+'}
        </div>
      </div>
    );
  }

  const allMain = slide.mainWallets;
  const allTrip = slide.tripWallets;
  const total   = allMain.length + allTrip.length;

  return (
    <div key={animKey} style={{ position:'relative' }}>
      <style>{diagCSS}</style>
      <div style={{ display:'flex',justifyContent:'center',marginBottom:14,position:'relative' }}>
        {vis && [0,1,2].map(i => (
          <div key={i} style={{ position:'absolute',top:'50%',left:'50%',width:46,height:46,borderRadius:'50%',border:`1.5px solid ${tc}65`,animation:`wdRing 2.8s ease-out ${i*0.9}s infinite`,pointerEvents:'none' }} />
        ))}
        <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:`${tc}18`,border:`1.5px solid ${tc}65`,borderRadius:100,padding:'7px 16px 7px 9px',boxShadow:`0 0 22px ${tc}40, 0 0 44px ${tc}18`,animation:vis?'wdYouIn 0.5s cubic-bezier(0.16,1,0.3,1) both':'none',position:'relative',zIndex:2 }}>
          <div style={{ width:24,height:24,borderRadius:'50%',background:`${tc}32`,border:`1px solid ${tc}60`,display:'flex',alignItems:'center',justifyContent:'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={tc} strokeWidth="1.6"/><path d="M4.5 20c0-4 3.36-7 7.5-7s7.5 3 7.5 7" stroke={tc} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
          <span style={{ color:'#fff',fontSize:15,fontWeight:700,fontFamily:'Space Grotesk, sans-serif' }}>You</span>
        </div>
      </div>
      <svg width="100%" height="26" style={{ display:'block',overflow:'visible',marginBottom:0 }}>
        <defs>
          <linearGradient id={`${uid}v`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={tc} stopOpacity="0.85"/><stop offset="100%" stopColor={tc} stopOpacity="0.08"/></linearGradient>
          <linearGradient id={`${uid}h`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={tc} stopOpacity="0.04"/><stop offset="50%" stopColor={tc} stopOpacity="0.45"/><stop offset="100%" stopColor={tc} stopOpacity="0.04"/></linearGradient>
        </defs>
        <line x1="50%" y1="0" x2="50%" y2="18" stroke={`url(#${uid}v)`} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20" style={{ strokeDashoffset:vis?0:20,transition:'stroke-dashoffset 0.35s 0.1s ease' }} />
        {total > 1 && <line x1={isH?'5%':(total===2?'25%':total===3?'17%':'10%')} y1="18" x2={isH?'95%':(total===2?'75%':total===3?'83%':'90%')} y2="18" stroke={`url(#${uid}h)`} strokeWidth="1.2" strokeDasharray="400" style={{ strokeDashoffset:vis?0:400,transition:'stroke-dashoffset 0.5s 0.22s ease' }} />}
      </svg>
      {isH ? (
        <div style={{ display:'flex',gap:10,alignItems:'stretch' }}>
          {/* Main wallets group */}
          <div style={{ display:'flex',flexDirection:'column',gap:7,flex:allMain.length+(ghosts.main||0),minWidth:0 }}>
            <div style={{ fontSize:9.4,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.13em',color:tc,fontFamily:'Space Grotesk, sans-serif',textAlign:'center',paddingBottom:4,borderBottom:`1px solid ${tc}28`,opacity:0.85 }}>
              Main Wallets
            </div>
            <div style={{ display:'grid',gridTemplateColumns:(allMain.length+ghosts.main)<=2?`repeat(${allMain.length+ghosts.main},1fr)`:'1fr 1fr',gap:8 }}>
              {allMain.map((w,i) => <WalletCard key={w.name} wallet={w} isTrip={false} idx={i} />)}
              {Array.from({length:ghosts.main}).map((_,gi) => (
                <GhostCard key={`mg${gi}`} color={tc} isUnlim={isUnlimited} delay={(allMain.length+gi)*110+200} />
              ))}
            </div>
          </div>
          {/* Divider */}
          {allTrip.length > 0 && allMain.length > 0 && (
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'stretch',flexShrink:0,padding:'0 4px',paddingTop:20 }}>
              <div style={{ width:1,flex:1,background:`linear-gradient(180deg, ${tc}18, #FF7A2F18)` }} />
            </div>
          )}
          {/* Trip wallets group */}
          {allTrip.length > 0 && (
            <div style={{ display:'flex',flexDirection:'column',gap:7,flex:Math.min(allTrip.length+(ghosts.trip||0),3),minWidth:0 }}>
              <div style={{ fontSize:9.4,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.13em',color:'#FF7A2F',fontFamily:'Space Grotesk, sans-serif',textAlign:'center',paddingBottom:4,borderBottom:'1px solid #FF7A2F28',opacity:0.85 }}>
                Trip Wallets
              </div>
              <div style={{ display:'grid',gridTemplateColumns:(allTrip.length+ghosts.trip)<=2?`repeat(${allTrip.length+ghosts.trip},1fr)`:'1fr 1fr',gap:8 }}>
                {allTrip.map((w,i) => <WalletCard key={w.name} wallet={w} isTrip={true} idx={allMain.length+i} />)}
                {Array.from({length:ghosts.trip}).map((_,gi) => (
                  <GhostCard key={`tg${gi}`} color="#FF7A2F" isUnlim={isUnlimited} delay={(allMain.length+allTrip.length+gi)*110+200} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <React.Fragment>
          {allMain.length > 0 && <div><div style={{ fontSize:9.4,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.13em',color:'#3A5570',marginBottom:7,textAlign:'center',fontFamily:'Space Grotesk, sans-serif' }}>Main Wallets</div><div style={{ display:'flex',gap:8 }}>{allMain.map((w,i) => <WalletCard key={w.name} wallet={w} isTrip={false} idx={i} />)}</div></div>}
          {allTrip.length > 0 && allMain.length > 0 && <div style={{ margin:'12px 0 8px',display:'flex',alignItems:'center',gap:8 }}><div style={{ flex:1,height:1,background:`linear-gradient(90deg,transparent,${tc}22)` }} /><span style={{ fontSize:9.4,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.13em',color:'#3A5570',fontFamily:'Space Grotesk, sans-serif',flexShrink:0 }}>Trip Wallets</span><div style={{ flex:1,height:1,background:'linear-gradient(90deg,#FF7A2F22,transparent)' }} /></div>}
          {allTrip.length > 0 && <div style={{ display:'grid',gridTemplateColumns:allTrip.length<=2?(`repeat(${allTrip.length},1fr)`):'1fr 1fr',gap:8 }}>{allTrip.map((w,i) => <WalletCard key={w.name} wallet={w} isTrip={true} idx={allMain.length+i} />)}</div>}
        </React.Fragment>
      )}
    </div>
  );
}

// ─── Wallet explainer modal ───────────────────────────────────────────────────
const WALLET_SLIDES = [
  {
    id: "free", tier: "Free", tierColor: "#8A94A6",
    mainWallets: [
      { name: "Personal Wallet", currency: "USD", symbol: "$", emoji: "💼",
        accounts: [{ emoji: "💳", label: "Credit Card" }, { emoji: "💵", label: "Cash" }, { emoji: "🏦", label: "Savings" }] },
    ],
    tripWallets: [
      { name: "Cappadocia Trip", currency: "TRY", symbol: "₺", emoji: "🎈",
        categories: [{ emoji: "✈️", label: "Transport" }, { emoji: "🏨", label: "Lodging" }, { emoji: "🍔", label: "Food" }] },
    ],
  },
  {
    id: "premium", tier: "Premium", tierColor: "#F59E0B",
    mainWallets: [
      { name: "Personal Wallet", currency: "USD", symbol: "$", emoji: "💼",
        accounts: [{ emoji: "💳", label: "Credit Card" }, { emoji: "💵", label: "Cash" }] },
      { name: "Business Wallet", currency: "USD", symbol: "$", emoji: "🏢",
        accounts: [{ emoji: "💳", label: "Credit Card" }, { emoji: "💵", label: "Cash" }] },
    ],
    tripWallets: [
      { name: "Business Trip", currency: "JPY", symbol: "¥", emoji: "✈️",
        categories: [{ emoji: "✈️", label: "Transport" }, { emoji: "🍔", label: "Food" }, { emoji: "🎉", label: "Arbitrary" }] },
      { name: "Italy Trip", currency: "EUR", symbol: "€", emoji: "🍕",
        categories: [{ emoji: "🏨", label: "Lodging" }, { emoji: "🍔", label: "Food" }, { emoji: "🎁", label: "Gifts" }] },
    ],
  },
  {
    id: "unlimited", tier: "Unlimited", tierColor: "#A78BFA",
    mainWallets: [
      { name: "USA Account Wallet", currency: "USD", symbol: "$", emoji: "🇺🇸",
        accounts: [{ emoji: "💳", label: "Credit Card" }, { emoji: "💵", label: "Cash" }] },
      { name: "UK Account Wallet", currency: "GBP", symbol: "£", emoji: "🇬🇧",
        accounts: [{ emoji: "💳", label: "Debit Card" }, { emoji: "🏦", label: "Savings" }] },
      { name: "Business Wallet", currency: "EUR", symbol: "€", emoji: "🏢",
        accounts: [{ emoji: "💳", label: "Credit Card" }, { emoji: "💵", label: "Cash" }] },
    ],
    tripWallets: [
      { name: "Business Trip", currency: "GBP", symbol: "£", emoji: "✈️",
        categories: [{ emoji: "✈️", label: "Transport" }, { emoji: "🏨", label: "Lodging" }] },
      { name: "Paris", currency: "EUR", symbol: "€", emoji: "🗼",
        categories: [{ emoji: "🏨", label: "Lodging" }, { emoji: "🍔", label: "Food" }] },
      { name: "Festival", currency: "USD", symbol: "$", emoji: "🎪",
        categories: [{ emoji: "🎁", label: "Gifts" }, { emoji: "🍔", label: "Food" }] },
      { name: "Japan", currency: "JPY", symbol: "¥", emoji: "⛩️",
        categories: [{ emoji: "✈️", label: "Transport" }, { emoji: "🍔", label: "Food" }] },
    ],
  },
];

function WalletExplainerModal({ onClose, triggerRef }) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isClosing, setIsClosing] = React.useState(false);
  const modalBoxRef  = React.useRef(null);
  const backdropRef  = React.useRef(null);

  function handleClose() {
    if (isClosing) return;
    setIsClosing(true);

    const box      = modalBoxRef.current;
    const backdrop = backdropRef.current;

    // Calculate vacuum target
    let dx = 0, dy = 0;
    if (triggerRef && triggerRef.current && box) {
      const btn     = triggerRef.current.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      dx = (btn.left + btn.width  / 2) - (boxRect.left + boxRect.width  / 2);
      dy = (btn.top  + btn.height / 2) - (boxRect.top  + boxRect.height / 2);
    }

    // Animate modal box with Web Animations API
    if (box) {
      box.animate(
        [
          { transform: 'translate(0,0) scale(1)',            opacity: '1' },
          { transform: `translate(${dx}px,${dy}px) scale(0.03)`, opacity: '0' }
        ],
        { duration: 500, easing: 'cubic-bezier(0.55,0,1,0.45)', fill: 'forwards' }
      );
    }

    // Fade backdrop
    if (backdrop) {
      backdrop.animate(
        [
          { background: 'rgba(0,0,0,0.88)' },
          { background: 'rgba(0,0,0,0)' }
        ],
        { duration: 420, easing: 'ease', fill: 'forwards' }
      );
    }

    // Unmount + pulse button
    setTimeout(() => {
      onClose();
      if (triggerRef && triggerRef.current) {
        const b = triggerRef.current;
        b.style.boxShadow = '0 0 0 5px rgba(167,139,250,0.55), 0 0 0 12px rgba(167,139,250,0.15)';
        b.style.transition = 'box-shadow 0.05s';
        setTimeout(() => {
          b.style.boxShadow = '0 0 0 0px rgba(167,139,250,0)';
          b.style.transition = 'box-shadow 0.85s ease';
          setTimeout(() => { b.style.boxShadow = ''; b.style.transition = ''; }, 950);
        }, 100);
      }
    }, 500);
  }

  React.useEffect(() => {
    function onKey(e) { if (e.key === "Escape") handleClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isClosing]);
  const slide = WALLET_SLIDES[activeSlide];
  const tc = slide.tierColor;
  const JOB_PRESETS = [
    { name: "Housekeeper", rate: "$20/hr", bg: "#6C63FF22", border: "#6C63FF55", text: "#A78BFA" },
    { name: "Rideshare",   rate: "",       bg: "#00D4AA22", border: "#00D4AA55", text: "#00D4AA" },
    { name: "Tutoring",    rate: "$30/hr", bg: "#F59E0B22", border: "#F59E0B55", text: "#F59E0B" },
    { name: "Cafe shift",  rate: "$18/hr", bg: "#60A5FA22", border: "#60A5FA55", text: "#60A5FA" },
  ];
  const EXAMPLES = [
    { emoji: "🌍", title: "Living across countries",      desc: "A wallet per country and currency, so balances stay clean." },
    { emoji: "🏠", title: "Sharing with roommates",       desc: "Your personal money in one wallet, shared costs in another." },
    { emoji: "💼", title: "Business owner or freelancer", desc: "Keep personal and business books separate for easier tax time." },
  ];
  return ReactDOM.createPortal(
    <div ref={backdropRef} onClick={handleClose} style={{ position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"modalOverlayIn 0.25s ease forwards" }}>
      <div ref={modalBoxRef} onClick={e => e.stopPropagation()} style={{ display:"flex",flexDirection:"column",background:"#06090F",border:"1px solid #0F1825",borderRadius:28,width:"min(96vw, 1040px)",maxHeight:"88vh",overflow:"hidden",animation:"modalIn 0.38s cubic-bezier(0.16,1,0.3,1) forwards",boxShadow:"0 40px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)",willChange:"transform,opacity" }}>

        <style>{`.babil-ms::-webkit-scrollbar{width:4px}.babil-ms::-webkit-scrollbar-track{background:transparent}.babil-ms::-webkit-scrollbar-thumb{background:#1A2840;border-radius:6px}.babil-ms::-webkit-scrollbar-thumb:hover{background:#263A58}`}</style>

        {/* TOP BAR */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px 14px",borderBottom:"1px solid #0C1526",flexShrink:0 }}>
          <div>
            <div style={{ color:"#4A6A8A",fontSize:11.3,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:4,fontFamily:"Space Grotesk, sans-serif" }}>Babil · Money structure</div>
            <h3 style={{ color:"#FFFFFF",fontSize:21.3,fontWeight:800,margin:0,fontFamily:"Space Grotesk, sans-serif",lineHeight:1.15,letterSpacing:"-0.025em" }}>How Babil organizes your money</h3>
          </div>
          <button onClick={handleClose} style={{ width:32,height:32,borderRadius:"50%",background:"#0A1020",border:"1px solid #0F1C2E",color:"#607080",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s" }} onMouseEnter={e=>{e.currentTarget.style.background="#111D2E";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="#0A1020";e.currentTarget.style.color="#607080";}}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* TIER TABS */}
        <div style={{ display:"flex",borderBottom:"1px solid #0C1526",flexShrink:0,background:"#050810" }}>
          {WALLET_SLIDES.map((s, i) => {
            const active = i === activeSlide;
            return (
              <button key={s.id} onClick={() => setActiveSlide(i)}
                style={{ flex:1,padding:"13px 20px",background:active?s.tierColor+"14":"transparent",border:"none",borderBottom:active?`2.5px solid ${s.tierColor}`:"2.5px solid transparent",borderRight:i<2?"1px solid #0C1526":"none",cursor:"pointer",transition:"all 0.2s ease",display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.background=s.tierColor+"08"; }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.background="transparent"; }}
              >
                <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:s.tierColor,boxShadow:active?`0 0 8px ${s.tierColor}CC`:"none",transition:"box-shadow 0.2s" }} />
                  <span style={{ color:active?s.tierColor:"#4A6A8A",fontSize:17.5,fontWeight:700,fontFamily:"Space Grotesk, sans-serif",letterSpacing:"0.02em",transition:"color 0.2s" }}>{s.tier}</span>
                </div>
                <span className="wallet-tier-sub" style={{ color:active?s.tierColor+"BB":"#2E4060",fontSize:12.5,fontWeight:500,transition:"color 0.2s" }}>
                  {s.id === "free" ? "1 main wallet · 1 trip wallet" : s.id === "premium" ? "3 main wallets · 4 trip wallets" : "∞ main wallets · ∞ trip wallets"}
                </span>
              </button>
            );
          })}
        </div>

        {/* SCROLLABLE CONTENT — diagram + explanations together */}
        <div className="babil-ms" style={{ overflowY:"auto",flex:1,display:"flex",flexDirection:"column",scrollbarWidth:"thin",scrollbarColor:"#1A2840 transparent" }}>

          {/* DIAGRAM */}
          <div className="wallet-diag-section" style={{ padding:"20px 28px 18px",background:"linear-gradient(168deg, #070E1C 0%, #040810 100%)",borderBottom:"1px solid #0C1526",flexShrink:0,position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,mixBlendMode:"screen" }} />
            <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:200,borderRadius:"50%",background:`radial-gradient(ellipse, ${tc}10 0%, transparent 70%)`,pointerEvents:"none",transition:"background 0.5s" }} />
            <WalletDiagramWeb slide={slide} tierColor={tc} layout={typeof window !== 'undefined' && window.innerWidth < 600 ? "vertical" : "horizontal"} />
          </div>

          {/* CONTENT */}
          <div style={{ padding:"20px 28px 28px",display:"flex",flexDirection:"column",gap:18 }}>
          <p style={{ color:"#8A9CB4",fontSize:16.3,lineHeight:"21px",margin:0 }}>
            <strong style={{ color:"#D0DCEC" }}>A wallet</strong> is a segment of your life you want to track separately, not just a bank account. Organize finances by context: personal, business, or a trip.
          </p>

          {/* Two wallet types + Common use cases side by side */}
          <div className="wallet-modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,alignItems:"stretch" }}>
            <div className="wallet-modal-left" style={{ gridColumn:"span 2", display:"flex", flexDirection:"column", gap:12 }}>
              <div>
                <div style={{ fontSize:11.3,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#4A6A8A",marginBottom:9,fontFamily:"Space Grotesk, sans-serif" }}>Two wallet types</div>
                <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
                  {[
                    { color:tc, title:"Main wallet", sub:"Ongoing · holds accounts", desc:"Tracks everyday finances across cards, cash, and savings. Always running.", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/></svg> },
                    { color:"#FF7A2F", title:"Trip wallet", sub:"Bounded · holds categories", desc:"A fixed-duration wallet for travel or events. Spending isolated from monthly stats.", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg> },
                  ].map((card,idx) => (
                    <div key={idx} style={{ display:"flex",gap:12,padding:"11px 13px",background:`${card.color}07`,border:`1px solid ${card.color}24`,borderRadius:12,alignItems:"flex-start" }}>
                      <div style={{ width:28,height:28,borderRadius:8,background:`${card.color}18`,border:`1px solid ${card.color}35`,display:"flex",alignItems:"center",justifyContent:"center",color:card.color,flexShrink:0 }}>{card.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap" }}>
                          <span style={{ color:"#E0E8F0",fontSize:15,fontWeight:700,fontFamily:"Space Grotesk, sans-serif" }}>{card.title}</span>
                          <span style={{ color:card.color,fontSize:11.3,fontWeight:600,opacity:0.85 }}>{card.sub}</span>
                        </div>
                        <p style={{ color:"#7A8EA8",fontSize:13.8,lineHeight:"17px",margin:0 }}>{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Work Log presets - same width as Two wallet types */}
              <div>
                <div style={{ fontSize:11.3,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#4A6A8A",marginBottom:9,fontFamily:"Space Grotesk, sans-serif" }}>Work Log presets</div>
                <div style={{ background:"#050A12",border:"1px solid #0C1526",borderRadius:12,padding:"12px 16px" }}>
                  <div style={{ display:"flex",alignItems:"flex-start",gap:9,marginBottom:12 }}>
                    <div style={{ width:26,height:26,borderRadius:7,background:"#A78BFA14",border:"1px solid #A78BFA2A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#A78BFA" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ color:"#C8D0DE",fontSize:13.8,fontWeight:700,fontFamily:"Space Grotesk, sans-serif",marginBottom:2 }}>Log work in one tap</div>
                      <p style={{ color:"#607080",fontSize:12.5,lineHeight:"15px",margin:0 }}>Save recurring jobs with a rate. Tap to log, earnings calculate automatically.</p>
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {JOB_PRESETS.map((job,i) => (
                      <div key={i} style={{ display:"flex",alignItems:"center",gap:5,background:job.bg,border:`1.5px solid ${job.border}`,borderRadius:16,padding:"6px 11px" }}>
                        <div style={{ width:5,height:5,borderRadius:"50%",background:job.text,flexShrink:0 }} />
                        <div>
                          <div style={{ color:"#C8D0DE",fontSize:13.1,fontWeight:700,fontFamily:"Space Grotesk, sans-serif" }}>{job.name}</div>
                          {job.rate && <div style={{ color:job.text,fontSize:11.3,fontWeight:600 }}>{job.rate}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div style={{ fontSize:11.3,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#4A6A8A",marginBottom:9,fontFamily:"Space Grotesk, sans-serif" }}>Common use cases</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8,flex:1 }}>
                {EXAMPLES.map((ex,i) => (
                  <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:12,padding:"13px 14px",background:"#050A12",border:"1px solid #0C1526",borderRadius:12,flex:1 }}>
                    <div style={{ width:34,height:34,borderRadius:9,background:"#080F1E",border:"1px solid #0F1C2E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{ex.emoji}</div>
                    <div>
                      <div style={{ color:"#B8C8D8",fontSize:15,fontWeight:700,marginBottom:4,fontFamily:"Space Grotesk, sans-serif" }}>{ex.title}</div>
                      <div style={{ color:"#607080",fontSize:13,lineHeight:"18px" }}>{ex.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          </div>{/* /CONTENT */}

        </div>{/* /SCROLLABLE */}

      </div>
    </div>,
    document.body
  );
}

Object.assign(window, { Nav, Landing, Footer });

function Pricing({ variant }) {
  const [yearly, setYearly] = React.useState(true);
  const [activeTooltip, setActiveTooltip] = React.useState(null);
  const [showWalletModal, setShowWalletModal] = React.useState(false);
  const sectionRef = React.useRef(null);
  const modalShownRef = React.useRef(false);
  const triggerBtnRef = React.useRef(null);

  // Auto-open once the pricing section first enters the viewport
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !modalShownRef.current) {
          modalShownRef.current = true;
          setShowWalletModal(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} style={{ padding: "56px 0" }}>
      <div className="container">

        {/* Header */}
        <div style={{ maxWidth: 720, textAlign: "center", margin: "0 auto" }}>
          <div className="section-eyebrow">Pricing</div>
          {variant === "bold"
            ? <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 0 }}>The right plan <em>pays for itself.</em></h2>
            : <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 0 }}>The right plan pays for itself.</h2>}
        </div>

        {/* Billing toggle — minimal */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20, marginBottom: 20 }}>
          <div style={{
            display: "inline-flex", alignItems: "center",
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            borderRadius: 100, padding: 3, gap: 0,
          }}>
            {[{ label: "Monthly", val: false }, { label: "Annually", val: true }].map(opt => (
              <button
                key={String(opt.val)}
                onClick={() => setYearly(opt.val)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 16px", borderRadius: 100,
                  background: yearly === opt.val ? "var(--primary)" : "transparent",
                  color: yearly === opt.val ? "#fff" : "var(--text-secondary)",
                  fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 13,
                  cursor: "pointer", transition: "all 0.18s", border: 0,
                }}
              >
                {opt.label}
                {opt.val && (
                  <span style={{
                    background: "rgba(74,222,128,0.18)",
                    color: "#ffffff",
                    fontSize: 10, fontWeight: 800, padding: "1px 6px",
                    borderRadius: 20,
                  }}>Save up to 44%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Full comparison table */}
        <div className="pricing-table-outer" style={{
          border: "1px solid var(--border)",
          borderRadius: 24,
          background: "var(--bg-elevated)",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {/* Label column — shrinks to fit longest text */}
                <th className="pricing-label-th" style={{ width: "1px", padding: 0, textAlign: "left" }}>
                  <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8,
                    height: "100%", padding: "16px 20px 16px 16px", boxSizing: "border-box",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <BabilHex size={36} />
                      <span className="logo-text" style={{ fontSize: 20 }}>Babil</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Features</span>
                  </div>
                </th>

                {/* Plan header columns */}
                {PRICING_PLANS.map(p => {
                  const price = p.id === "free" ? "$0" : (yearly ? p.perMonthYearly : p.priceMonthly);
                  const billing = p.id === "free"
                    ? "forever free"
                    : yearly ? `billed ${p.priceYearly}/yr` : "billed monthly";
                  return (
                    <th
                      key={p.id}
                      style={{
                        padding: "16px 12px 14px", textAlign: "center",
                        verticalAlign: "bottom", position: "relative",
                        background: p.featured ? "linear-gradient(180deg, " + p.color + "0e 0%, transparent 100%)" : "transparent",
                        borderLeft: "1px solid var(--border)",
                        ...(p.id === "unlimited" ? {
                          borderLeft: "2px solid #00B488",
                          borderRight: "2px solid #00B488",
                          borderTop: "2px solid #00B488",
                          borderBottom: "none",
                          background: "rgba(0,180,136,0.025)",
                        } : {}),
                        overflow: "hidden",
                      }}
                    >
                      {p.id === "unlimited" && (() => {
                          const label = "Save up to 44%";
                          return (
                            <div style={{
                              position: "absolute", top: 14, right: -26,
                              background: "linear-gradient(135deg, #009E79, #00B488)",
                              color: "#fff",
                              fontSize: 9, fontWeight: 800,
                              letterSpacing: "0.07em",
                              textTransform: "uppercase",
                              padding: "4px 32px",
                              transform: "rotate(35deg)",
                              boxShadow: "0 2px 10px rgba(0,180,136,0.5)",
                              pointerEvents: "none",
                              whiteSpace: "nowrap",
                            }}>{label}</div>
                          );
                        })()}
                      <div style={{
                        fontSize: 9, fontWeight: 800, letterSpacing: "0.12em",
                        textTransform: "uppercase", color: p.color, marginBottom: 6,
                      }}>{p.label}</div>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 2, marginBottom: 2 }}>
                        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>{price}</span>
                        {p.id !== "free" && <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>/mo</span>}
                      </div>
                      <div style={{ fontSize: 9, color: "var(--text-secondary)", marginBottom: 10 }}>{billing}</div>
                      <button
                        style={{
                          width: "100%", padding: "7px 0", borderRadius: 100,
                          fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 11,
                          cursor: "pointer", transition: "all 0.18s",
                          ...(p.ctaStyle === "primary"
                            ? { background: p.color, color: "#fff", border: "none", boxShadow: `0 4px 20px ${p.color}44` }
                            : p.ctaStyle === "ghost-amber"
                            ? { background: p.color, color: "#fff", border: "none", boxShadow: `0 4px 20px ${p.color}44` }
                            : { background: "transparent", color: "var(--text-secondary)", border: "1.5px solid var(--border)" }
                          ),
                        }}
                      >{p.cta}</button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {PRICING_FEATURES.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderBottom: i < PRICING_FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: i % 2 === 1 ? "rgba(255,255,255,0.012)" : "transparent",
                  }}
                >
                  <td className="pricing-label-td" style={{ padding: "7px 20px", fontSize: 12, fontWeight: 500, color: "var(--text)" }}>
                    <span style={{ display: "inline-flex", alignItems: "center" }}>
                      {row.label}
                      {row.tooltip && (
                        <InfoTooltip
                          text={row.tooltip}
                          isOpen={activeTooltip === row.label}
                          onToggle={(open) => setActiveTooltip(open ? row.label : null)}
                        />
                      )}
                    </span>
                  </td>
                  <PricingCell value={row.free}      color="#8A94A6" />
                  <PricingCell value={row.premium}   color="#FF7A35" />
                  <PricingCell value={row.unlimited} color="#6C63FF" extraStyle={{ borderLeft:"2px solid #00B488", borderRight:"2px solid #00B488", borderTop:"none", borderBottom:"none", background:"rgba(0,180,136,0.025)" }} />
                </tr>
              ))}
              {/* Green bottom border for Unlimited column */}
              <tr>
                <td style={{ padding:0, height:0 }}></td>
                <td style={{ padding:0, height:0, borderLeft:"1px solid var(--border)" }}></td>
                <td style={{ padding:0, height:0, borderLeft:"1px solid var(--border)" }}></td>
                <td style={{ padding:0, height:0, borderLeft:"2px solid #00B488", borderRight:"2px solid #00B488", borderBottom:"2px solid #00B488", background:"rgba(0,180,136,0.025)" }}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* How it works CTA */}
        <div style={{ textAlign: "center", marginTop: 36, marginBottom: 4 }}>
          <button
            ref={triggerBtnRef}
            onClick={() => setShowWalletModal(true)}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--primary-muted)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.background = "var(--primary-ghost)";
              const arrow = e.currentTarget.querySelector("[data-arrow]");
              if (arrow) arrow.style.transform = "scale(1.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.background = "transparent";
              const arrow = e.currentTarget.querySelector("[data-arrow]");
              if (arrow) arrow.style.transform = "scale(1)";
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "9px 9px 9px 22px",
              background: "transparent",
              border: "1.5px solid var(--border)",
              borderRadius: 100, cursor: "pointer",
              transition: "border-color 0.22s, background 0.22s, color 0.22s",
              color: "var(--text-secondary)",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em",
            }}
          >
            Understand how Babil organizes your money
            <div
              data-arrow=""
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "var(--card-bg, #161B2C)",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)",
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 10.5L10.5 2.5M5 2.5h5.5v5.5" stroke="var(--primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: "var(--text-secondary)" }}>
          Auto-renews. Cancel anytime.
        </p>
      </div>

      {showWalletModal && <WalletExplainerModal onClose={() => setShowWalletModal(false)} triggerRef={triggerBtnRef} />}
    </section>
  );
}

function FAQ({ variant }) {
  const items = [
    { q: "Is my financial data private?", a: "Yes. Babil never sells, shares, or shows your data to advertisers; there are no ads, no trackers, and no third-party analytics. Your records are stored in Supabase (PostgreSQL), encrypted in transit (TLS) and at rest. Row-level security means each account can only ever read its own data, Babil staff cannot access your records." },
    { q: "Do I need to create an account?", a: "Yes, a free account is required to use Babil. Signing up takes under a minute and lets us keep your data safe. You can delete your account and every record we hold directly from inside the app (Profile → Manage data) at any time." },
    { q: "Which currencies are supported?", a: "Babil supports 36 currencies including USD, EUR, GBP, TRY, JPY, CAD, AUD, CHF, and more. Each wallet has its own currency, so you can keep a separate Trip Wallet in a foreign currency without it mixing into your main budget." },
    { q: "Can I import from another app or my bank?", a: "Yes, Babil reads any CSV with date, amount, category, and description columns. The importer auto-maps common column names and lets you fix individual rows before committing. A full batch history lets you move or delete a past import if something looks off." },
    { q: "Can I log in with Face ID or fingerprint?", a: "Yes. Babil supports biometric login (Face ID on iPhone, fingerprint on Android) as an alternative to typing your password each time. Enable it from Profile → Security. Your password is never stored on the device, only a secure refresh token is kept." },
    { q: "Is there a web version?", a: "Not currently. Babil is a mobile-only app, available on iOS and Android. There is no web dashboard at this time." },
    { q: "Can I share a wallet with my partner or family?", a: "Not at the moment. Babil is a single-user personal finance tracker; each account manages one person's finances. Multi-user shared wallets are not supported." },
    { q: "What happens if I cancel Premium or Unlimited?", a: "Your data stays in your account and is never deleted. Paid features pause until you re-subscribe. You can pick up right where you left off, nothing is lost." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="tight">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <div className="section-eyebrow">FAQ</div>
          {variant === "bold" ? <h2 className="section-title">Things people <em>ask first.</em></h2> : <h2 className="section-title">Things people ask first.</h2>}
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div className="faq-item" data-open={open === i} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="ico"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ variant }) {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("");
  const [topicOpen, setTopicOpen] = useState(false);
  const topicRef = React.useRef(null);

  const topics = ["Bug report", "Feature request", "Billing / Pro", "Press / partnership", "Something else"];

  React.useEffect(() => {
    function handler(e) {
      if (topicRef.current && !topicRef.current.contains(e.target)) setTopicOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section id="contact" className="tight">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <div className="section-eyebrow">Contact</div>
          {variant === "bold" ? <h2 className="section-title">Have a question? <em>Actually written by a human.</em></h2> : <h2 className="section-title">Have a question? We read every email.</h2>}
          <p className="section-lede">Babil is built by a small team. You'll hear back, usually within 3 days, sometimes faster.</p>
        </div>
        <div className="contact-grid">
          {sent ? (
            <div className="contact-form" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>✓</div>
                <p style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Thanks, we'll get back to you soon.</p>
                <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>We read every message and reply within 24–72 hours.</p>
              </div>
            </div>
          ) : (
            <form
              className="contact-form"
              action="https://formspree.io/f/mykvevjj"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const data = new FormData(form);
                try {
                  const res = await fetch("https://formspree.io/f/mykvevjj", {
                    method: "POST",
                    body: data,
                    headers: { Accept: "application/json" },
                  });
                  if (res.ok) setSent(true);
                } catch (err) {
                  setSent(true);
                }
              }}
            >
              <input type="hidden" name="_subject" value="New Babil support message" />
              <div className="field"><label>Name</label><input name="name" placeholder="Your name" required /></div>
              <div className="field"><label>Email</label><input type="email" name="email" placeholder="you@somewhere.com" required /></div>
              <div className="field"><label>Topic</label>
                <div ref={topicRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setTopicOpen(o => !o)}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 12,
                      border: `1px solid ${topicOpen ? "var(--primary)" : "var(--border)"}`,
                      background: "var(--bg-elevated)", color: topic ? "var(--text)" : "var(--text-secondary)",
                      fontSize: 15, fontFamily: "inherit", textAlign: "left",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      cursor: "pointer", transition: "border-color 0.15s",
                    }}
                  >
                    <span>{topic || "Bug, feature request, billing…"}</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                      style={{ transition: "transform 0.2s", transform: topicOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <input type="hidden" name="topic" value={topic} />
                  {topicOpen && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 100,
                      background: "var(--bg-elevated)", border: "1px solid var(--border)",
                      borderRadius: 12, overflow: "hidden",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.05)",
                      animation: "dropInSimple 0.15s cubic-bezier(0.2,0.7,0.2,1) forwards",
                    }}>
                      {topics.map((t, i) => (
                        <button
                          key={t} type="button"
                          onClick={() => { setTopic(t); setTopicOpen(false); }}
                          style={{
                            width: "100%", padding: "11px 14px", textAlign: "left",
                            background: topic === t ? "var(--primary-ghost)" : "transparent",
                            color: topic === t ? "var(--text)" : "var(--text-secondary)",
                            fontSize: 14, fontFamily: "inherit", fontWeight: 500,
                            borderBottom: i < topics.length - 1 ? "1px solid var(--border-ghost)" : "none",
                            cursor: "pointer", transition: "background 0.12s, color 0.12s",
                            border: 0, display: "block",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-ghost)"; e.currentTarget.style.color = "var(--text)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = topic === t ? "var(--primary-ghost)" : "transparent"; e.currentTarget.style.color = topic === t ? "var(--text)" : "var(--text-secondary)"; }}
                        >{t}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="field"><label>Message</label><textarea name="message" placeholder="What's up?" required></textarea></div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "flex-start" }}>Send message</button>
            </form>
          )}
          <aside className="contact-info">
            <div className="row"><span className="ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6"/></svg>
            </span><div><strong>support@babilfinance.com</strong><p>For anything you need.</p></div></div>
            <div className="row"><span className="ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </span><div><strong>~24h reply time</strong><p>7/24.</p></div></div>
            <div className="row"><span className="ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.4 8.4 0 01-9.5 8.5L3 21l1-3.5A8.5 8.5 0 1121 11.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
            </span><div><strong>Support center</strong><p>Step-by-step articles for the common stuff.</p></div></div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <button className="logo" onClick={() => setPage("home")}><BabilHex size={28} /><span className="logo-text">Babil</span></button>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 14, maxWidth: 320 }}>A calm, private finance tracker for people whose money doesn't fit in one box.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>Features</button></li>
              <li><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>Pricing</button></li>
              <li><button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>FAQ</button></li>
              <li><button onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })}>Download</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><button onClick={() => setPage("support")}>Support</button></li>
              <li><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Contact</button></li>
              <li><button>Changelog</button></li>
              <li><button>Press kit</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="/privacy" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Privacy</a></li>
              <li><a href="/terms" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Terms</a></li>
              <li><button>Cookies</button></li>
              <li><button>DPA</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 Babil. Made in Istanbul.</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Contact: <a href="mailto:support@babilfinance.com" style={{ color: "var(--text-secondary)" }}>support@babilfinance.com</a></div>
          <div className="socials">
            <button aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.3l-7.2 8.2L22 21h-6.8l-5.3-6.9L3.7 21H.4l7.7-8.8L0 3h7l4.8 6.4L17.5 3z"/></svg></button>
            <button aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.6 2.9 8.5 6.8 9.8.5.1.7-.2.7-.5v-1.7C6.7 20.4 6.1 18.5 6.1 18.5c-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1.8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.7 1.1 2.8 0 4-2.4 4.9-4.7 5.1.4.3.7 1 .7 2v3c0 .3.2.6.7.5C19.1 20.8 22 16.9 22 12.3 22 6.6 17.5 2 12 2z"/></svg></button>
            <button aria-label="Mail"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.8"/></svg></button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing({ variant }) {
  return (
    <React.Fragment>
      <Hero variant={variant} />
      <Features variant={variant} />
      <Pricing variant={variant} />
      <FAQ variant={variant} />
      <Contact variant={variant} />
    </React.Fragment>
  );
}

Object.assign(window, { Nav, Landing, Footer });
