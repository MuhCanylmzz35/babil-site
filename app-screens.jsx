/* ─── Babil App Screen mockups (phone interior) ─── */
/* Faithful HTML/CSS recreation of HomeScreen, StatsScreen, DailyLogTab */

const { useState } = React;

// ── Babil hex logo (orange gradient)
function BabilHex({ size = 28 }) {
  const gradId = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB547" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
      <path d="M60,10 L102,35 L102,85 L60,110 L18,85 L18,35 Z" fill="none" stroke={`url(#${gradId})`} strokeWidth="5" strokeLinejoin="round" />
      <line x1="42" y1="82" x2="42" y2="62" stroke={`url(#${gradId})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="60" y1="82" x2="60" y2="48" stroke={`url(#${gradId})`} strokeWidth="8" strokeLinecap="round" />
      <line x1="78" y1="82" x2="78" y2="32" stroke={`url(#${gradId})`} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

// ── Status bar
function StatusBar() {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 24px 4px", color: "#fff", fontSize: 13, fontWeight: 600,
      fontFamily: "-apple-system, system-ui, sans-serif"
    }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4.5" y="5" width="3" height="6" rx="0.5"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5"/></svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="#fff" opacity="0.5"/><rect x="2" y="2" width="19" height="8" rx="1.5" fill="#fff"/><rect x="24" y="4" width="1.5" height="4" rx="0.5" fill="#fff" opacity="0.5"/></svg>
      </div>
    </div>
  );
}

// ── Bottom tabs
function BottomTabs({ active }) {
  const tabs = [
    { key: "home", label: "Home", icon: (a) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z" stroke={a ? "var(--primary)" : "var(--text-secondary)"} strokeWidth="1.8" strokeLinejoin="round"/></svg>) },
    { key: "stats", label: "Stats", icon: (a) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 19V11M12 19V5M19 19V14" stroke={a ? "var(--primary)" : "var(--text-secondary)"} strokeWidth="1.8" strokeLinecap="round"/></svg>) },
    { key: "log", label: "Work Log", icon: (a) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 4h10a3 3 0 013 3v11a2 2 0 01-2 2H8a3 3 0 01-3-3V5a1 1 0 011-1z M9 9h7M9 13h7M9 17h4" stroke={a ? "var(--primary)" : "var(--text-secondary)"} strokeWidth="1.8" strokeLinecap="round"/></svg>) },
  ];
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, height: 78,
      background: "#0D1117", borderTop: "1px solid #1E2640",
      display: "flex", justifyContent: "space-around", alignItems: "flex-start",
      paddingTop: 10
    }}>
      {tabs.map(t => {
        const a = t.key === active;
        return (
          <div key={t.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
            {t.icon(a)}
            <span style={{ color: a ? "var(--primary)" : "var(--text-secondary)", fontSize: 10, fontWeight: 600 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Home / Overview screen
function HomeScreen() {
  // donut segments for the pie chart below W/M/Y
  const pie = [
    { v: 38, c: "#6C63FF", n: "Rent",      lbl: "$780" },
    { v: 24, c: "#FFB547", n: "Shopping",  lbl: "$495" },
    { v: 18, c: "#00D4AA", n: "Food",      lbl: "$369" },
    { v: 12, c: "#FF5C5C", n: "Transport", lbl: "$248" },
    { v: 8,  c: "#A78BFA", n: "Other",     lbl: "$165" },
  ];
  let pAcc = 0;
  const pR = 42, pCX = 60, pCY = 60, pSW = 14;
  const pC = 2 * Math.PI * pR;
  const gap = 1.6; // unit gap between segments (in stroke-units)

  return (
    <div style={{ width: "100%", height: "100%", background: "#0D1117", color: "#fff", overflow: "hidden", position: "relative", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <StatusBar />
      {/* Centered Babil logo + gradient wordmark */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "10px 20px 14px" }}>
        <BabilHex size={24} />
        <span style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #FFB547, #FF6B35)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          color: "transparent",
        }}>Babil</span>
      </div>

      {/* Minimal Main / Trip pill toggle */}
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 14 }}>
        <div style={{ display: "inline-flex", padding: 3, background: "#161B2C", borderRadius: 100, fontSize: 11, fontWeight: 600 }}>
          <span style={{ padding: "5px 14px", borderRadius: 100, background: "#1E2640", color: "#fff" }}>Main</span>
          <span style={{ padding: "5px 14px", borderRadius: 100, color: "#8A94A6" }}>Trip</span>
        </div>
      </div>

      {/* Balance header */}
      <div style={{ padding: "4px 20px 14px", borderTop: "1px solid #1E264022" }}>
        <div style={{ color: "#8A94A6", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 4, marginTop: 12, textTransform: "uppercase" }}>Net Total Balance</div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "Space Grotesk, sans-serif" }}>$35,064<span style={{ fontSize: 18, color: "#8A94A6" }}>.50</span></div>
        <div style={{ display: "flex", gap: 14, marginTop: 6, fontSize: 11 }}>
          <span style={{ color: "#00D4AA", fontWeight: 600 }}>+ $4,210 Income</span>
          <span style={{ color: "#FF5C5C", fontWeight: 600 }}>− $2,045 Expense</span>
        </div>
        {/* Minimal action buttons row */}
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          <button style={{ flex: 1, background: "transparent", color: "#fff", border: "1px solid #1E2640", borderRadius: 100, padding: "8px 0", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#FF5C5C" strokeWidth="1.6" strokeLinecap="round"/></svg>
            Expense
          </button>
          <button style={{ flex: 1, background: "transparent", color: "#fff", border: "1px solid #1E2640", borderRadius: 100, padding: "8px 0", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#00D4AA" strokeWidth="1.6" strokeLinecap="round"/></svg>
            Income
          </button>
          <button style={{ flex: 1, background: "transparent", color: "#fff", border: "1px solid #1E2640", borderRadius: 100, padding: "8px 0", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="2" y="2" width="8" height="8" rx="1.5" stroke="#A78BFA" strokeWidth="1.4"/><path d="M4 5h4M4 7h2.5" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Work Log
          </button>
        </div>
      </div>

      {/* W/M/Y bar */}
      <div style={{ display: "flex", padding: "10px 20px", gap: 24, borderTop: "1px solid #1E2640", borderBottom: "1px solid #1E264022", fontSize: 12 }}>
        {["W", "M", "Y"].map((p, i) => (
          <div key={p} style={{ color: i === 1 ? "#fff" : "#8A94A6", fontWeight: i === 1 ? 700 : 600, borderBottom: i === 1 ? "2px solid var(--primary)" : "0", paddingBottom: 4 }}>{p}</div>
        ))}
        <div style={{ marginLeft: "auto", color: "#A78BFA", fontSize: 12, fontWeight: 600 }}>May 2026 ▾</div>
      </div>

      {/* Pie chart + legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px 6px" }}>
        <svg width="118" height="118" viewBox="0 0 120 120" style={{ flexShrink: 0, overflow: "visible" }}>
          <defs>
            {pie.map((s, i) => (
              <linearGradient key={i} id={`pieG${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor={s.c} stopOpacity="1" />
                <stop offset="100%" stopColor={s.c} stopOpacity="0.6" />
              </linearGradient>
            ))}
            <radialGradient id="pieCenter" cx="50%" cy="50%" r="60%">
              <stop offset="0%"   stopColor="#1C2438" stopOpacity="1" />
              <stop offset="100%" stopColor="#0D1117" stopOpacity="1" />
            </radialGradient>
            <filter id="pieDrop" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Outer shadow */}
          <circle cx={pCX} cy={pCY} r={pR} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={pSW + 3} filter="url(#pieDrop)" />

          {/* Track */}
          <circle cx={pCX} cy={pCY} r={pR} fill="none" stroke="#13192A" strokeWidth={pSW} />

          {/* Glow copies */}
          {pie.map((s, i) => {
            const len = Math.max(0, (s.v / 100) * pC - gap);
            const off = pie.slice(0, i).reduce((a, x) => a + x.v, 0) / 100 * pC;
            return (
              <circle key={`pg${i}`} cx={pCX} cy={pCY} r={pR} fill="none"
                stroke={s.c} strokeWidth={pSW + 2}
                strokeDasharray={`${len} ${pC}`}
                strokeDashoffset={-off}
                strokeLinecap="butt"
                transform={`rotate(-90 ${pCX} ${pCY})`}
                opacity="0.22"
                style={{ filter: "blur(4px)" }}
              />
            );
          })}

          {/* Main segments */}
          {pie.map((s, i) => {
            const len = Math.max(0, (s.v / 100) * pC - gap);
            const off = pie.slice(0, i).reduce((a, x) => a + x.v, 0) / 100 * pC;
            return (
              <circle key={i} cx={pCX} cy={pCY} r={pR} fill="none"
                stroke={`url(#pieG${i})`}
                strokeWidth={pSW}
                strokeDasharray={`${len} ${pC}`}
                strokeDashoffset={-off}
                strokeLinecap="butt"
                transform={`rotate(-90 ${pCX} ${pCY})`}
              />
            );
          })}

          {/* Top highlight */}
          <circle cx={pCX} cy={pCY} r={pR + pSW/2 - 1} fill="none"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1"
            strokeDasharray={`${0.5 * pC} ${pC}`}
            strokeDashoffset={-0.02 * pC}
            transform={`rotate(-90 ${pCX} ${pCY})`}
          />

          {/* Center disc */}
          <circle cx={pCX} cy={pCY} r={pR - pSW/2 - 1} fill="url(#pieCenter)" />
          <circle cx={pCX} cy={pCY} r={pR - pSW/2 - 1} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" />

          <text x={pCX} y={pCY - 4} textAnchor="middle" fill="#8A94A6" fontSize="6.5" fontWeight="700" letterSpacing="0.15em" fontFamily="Manrope, sans-serif">SPENT</text>
          <text x={pCX} y={pCY + 8} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif" letterSpacing="-0.02em">$2,057</text>
          <text x={pCX} y={pCY + 19} textAnchor="middle" fill="#8A94A6" fontSize="6" fontWeight="500" fontFamily="Manrope, sans-serif">May 2026</text>
        </svg>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {pie.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: r.c, boxShadow: `0 0 6px ${r.c}66` }}></span>
              <span style={{ flex: 1, fontSize: 11, color: "#fff", fontWeight: 500 }}>{r.n}</span>
              <span style={{ fontSize: 11, color: "#8A94A6", fontWeight: 600, fontFamily: "Space Grotesk, sans-serif" }}>{r.v}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activities header */}
      <div style={{ padding: "12px 20px 8px", borderTop: "1px solid #1E2640", display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#A78BFA" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <span style={{ color: "#8A94A6", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Recent Activity</span>
      </div>

      {/* List rows */}
      {[
        { em: "☕", name: "Coffee", meta: "Today · Card", val: "−$5.40", neg: true },
        { em: "💼", name: "Salary", meta: "May 15 · Bank", val: "+$3,200", pos: true },
      ].map((row, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 20px", borderBottom: "1px solid #1E264022" }}>
          <div style={{ width: 30, height: 30, borderRadius: 100, background: "#161B2C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 12 }}>{row.em}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{row.name}</div>
            <div style={{ fontSize: 10, color: "#8A94A6", marginTop: 2 }}>{row.meta}</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: row.neg ? "#FF5C5C" : (row.pos ? "#00D4AA" : "#fff") }}>{row.val}</div>
        </div>
      ))}

      <BottomTabs active="home" />
    </div>
  );
}

// ── Stats screen with donut chart
function StatsScreen() {
  // donut values
  const segs = [
    { v: 38, c: "#6C63FF", em: "🏠", lbl: "Rent",      val: "$780" },
    { v: 24, c: "#FFB547", em: "🛍️", lbl: "Shopping",  val: "$495" },
    { v: 18, c: "#00D4AA", em: "🍽️", lbl: "Food",      val: "$369" },
    { v: 12, c: "#FF5C5C", em: "🚗", lbl: "Transport", val: "$248" },
    { v: 8,  c: "#A78BFA", em: "✨",  lbl: "Other",     val: "$165" },
  ];
  let acc = 0;
  const R = 60, CX = 90, CY = 90, SW = 16;
  const C = 2 * Math.PI * R;

  return (
    <div style={{ width: "100%", height: "100%", background: "#0D1117", color: "#fff", overflow: "hidden", position: "relative", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <StatusBar />
      <div style={{ padding: "10px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 17, fontWeight: 700 }}>Stats</div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ padding: "5px 10px", borderRadius: 8, background: "#1E2640", color: "#8A94A6", fontSize: 11, fontWeight: 600 }}>Filter</div>
        </div>
      </div>

      {/* Tab row */}
      <div style={{ display: "flex", padding: "0 4px", borderBottom: "1px solid #1E2640" }}>
        {["Expenses", "Overview", "Incomes"].map((t, i) => (
          <div key={t} style={{ flex: 1, textAlign: "center", padding: "10px 0" }}>
            <div style={{ color: i === 0 ? "#fff" : "#8A94A6", fontSize: 12, fontWeight: i === 0 ? 700 : 600 }}>{t}</div>
            {i === 0 && <div style={{ height: 2, background: "var(--primary)", borderRadius: 1, width: 50, margin: "6px auto 0" }}></div>}
          </div>
        ))}
      </div>

      {/* Period */}
      <div style={{ padding: "12px 20px 6px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #1E264022", gap: 18 }}>
        <span style={{ color: "#A78BFA", fontSize: 18 }}>‹</span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>May 2026</span>
        <span style={{ color: "#A78BFA", fontSize: 18 }}>›</span>
      </div>

      {/* Donut */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 4px" }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ overflow: "visible" }}>
          <defs>
            {/* Per-segment arc gradients */}
            {segs.map((s, i) => (
              <linearGradient key={i} id={`sg${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor={s.c} stopOpacity="1" />
                <stop offset="100%" stopColor={s.c} stopOpacity="0.6" />
              </linearGradient>
            ))}
            {/* Center disc gradient */}
            <radialGradient id="sCtr" cx="50%" cy="50%" r="60%">
              <stop offset="0%"   stopColor="#1C2438" stopOpacity="1" />
              <stop offset="100%" stopColor="#0D1117" stopOpacity="1" />
            </radialGradient>
            {/* Track gradient — subtle depth */}
            <radialGradient id="sTrk" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#1E2640" stopOpacity="1" />
              <stop offset="100%" stopColor="#111827" stopOpacity="1" />
            </radialGradient>
            {/* Drop shadow for the whole ring */}
            <filter id="sDrop" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.55" />
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
            </filter>
            {/* Glow filter per segment */}
            <filter id="sGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer ambient shadow ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth={SW + 4} filter="url(#sDrop)" />

          {/* Track */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#sTrk)" strokeWidth={SW} />

          {/* Segments — glow layer (blurred copy underneath) */}
          {(() => {
            let a2 = 0;
            return segs.map((s, i) => {
              const len = (s.v / 100) * C - 1.5;
              const off = (a2 / 100) * C;
              a2 += s.v;
              return (
                <circle key={`gl${i}`} cx={CX} cy={CY} r={R} fill="none"
                  stroke={s.c} strokeWidth={SW + 3}
                  strokeDasharray={`${len} ${C}`}
                  strokeDashoffset={-off}
                  transform={`rotate(-90 ${CX} ${CY})`}
                  strokeLinecap="butt"
                  opacity="0.25"
                  style={{ filter: `blur(5px)` }}
                />
              );
            });
          })()}

          {/* Segments — main */}
          {(() => {
            let a3 = 0;
            return segs.map((s, i) => {
              const len = (s.v / 100) * C - 1.5;
              const off = (a3 / 100) * C;
              a3 += s.v;
              return (
                <circle key={`sg${i}`} cx={CX} cy={CY} r={R} fill="none"
                  stroke={`url(#sg${i})`}
                  strokeWidth={SW}
                  strokeDasharray={`${len} ${C}`}
                  strokeDashoffset={-off}
                  transform={`rotate(-90 ${CX} ${CY})`}
                  strokeLinecap="butt"
                />
              );
            });
          })()}

          {/* Top highlight rim — light edge on outer arc */}
          <circle cx={CX} cy={CY} r={R + SW / 2 - 1} fill="none"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1"
            strokeDasharray={`${0.55 * C} ${C}`}
            strokeDashoffset={-0.02 * C}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
          {/* Bottom shadow rim */}
          <circle cx={CX} cy={CY} r={R - SW / 2 + 1} fill="none"
            stroke="rgba(0,0,0,0.35)" strokeWidth="1.5"
            strokeDasharray={`${0.5 * C} ${C}`}
            strokeDashoffset={-0.5 * C}
            transform={`rotate(-90 ${CX} ${CY})`}
          />

          {/* Center disc */}
          <circle cx={CX} cy={CY} r={R - SW / 2 - 1} fill="url(#sCtr)" />
          {/* Inner shadow ring */}
          <circle cx={CX} cy={CY} r={R - SW / 2 - 1} fill="none"
            stroke="rgba(0,0,0,0.4)" strokeWidth="2.5"
          />
          {/* Subtle top-left sheen */}
          <ellipse cx={CX} cy={CY - 6} rx={10} ry={6} fill="rgba(255,255,255,0.025)" />

          {/* Center text */}
          <text x={CX} y={CY - 4} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="Space Grotesk, sans-serif">$2,057</text>
          <text x={CX} y={CY + 14} textAnchor="middle" fill="#8A94A6" fontSize="10" fontWeight="600" letterSpacing="0.04em">SPENT</text>
        </svg>
      </div>

      {/* Legend list */}
      <div style={{ padding: "14px 20px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {segs.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 100, background: "#161B2C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{s.em}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{s.lbl}</div>
              <div style={{ height: 4, marginTop: 4, borderRadius: 100, background: "#161B2C", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.v * 2.4}%`, background: s.c, borderRadius: 100 }}></div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{s.val}</div>
          </div>
        ))}
      </div>

      <BottomTabs active="stats" />
    </div>
  );
}

// ── Daily Log screen — Weekly Stats view (matches actual app)
function DailyLogScreen() {
  const jobs = [
    { dot: "#6C63FF", n: "Rideshare",  h: "22h",   earn: 620 },
    { dot: "#00D4AA", n: "Server",     h: "12.5h", earn: 310 },
    { dot: "#FFB547", n: "Cash tips",  h: "—",     earn: 50  },
  ];
  const totalEarn = 980;
  const weekRows = [
    { name: "Mon", date: "12 May", hours: "6h",   earn: "$168", spent: "—",    rate: "$28/h" },
    { name: "Tue", date: "13 May", hours: "8h",   earn: "$224", spent: "-$42", rate: "$28/h" },
    { name: "Wed", date: "14 May", hours: "7.5h", earn: "$210", spent: "—",    rate: "$28/h" },
    { name: "Thu", date: "15 May", hours: "8h",   earn: "$224", spent: "-$68", rate: "$28/h" },
    { name: "Fri", date: "16 May", hours: "3h",   earn: "$154", spent: "—",    rate: "$28/h", today: true },
    { name: "Sat", date: "17 May", hours: "—",    earn: "—",    spent: "—",    rate: "—",     future: true },
    { name: "Sun", date: "18 May", hours: "—",    earn: "—",    spent: "—",    rate: "—",     future: true },
  ];
  const S = { fontFamily: "system-ui, -apple-system, sans-serif" };
  return (
    <div style={{ ...S, width: "100%", height: "100%", background: "#0D1117", color: "#fff", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* Period tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1E2640", flexShrink: 0 }}>
        {["Weekly","Monthly","Yearly"].map((p, i) => (
          <div key={p} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, paddingBottom: 0 }}>
            <span style={{ color: i === 0 ? "#fff" : "#8A94A6", fontSize: 12, fontWeight: i === 0 ? 700 : 600, paddingBottom: 8 }}>{p}</span>
            {i === 0 && <div style={{ height: 2, width: 44, background: "#6C63FF", borderRadius: 1 }}></div>}
            {i !== 0 && <div style={{ height: 2 }}></div>}
          </div>
        ))}
      </div>

      {/* Period nav */}
      <div style={{ display: "flex", alignItems: "center", padding: "9px 16px", borderBottom: "1px solid #1E2640", flexShrink: 0 }}>
        <span style={{ color: "#6C63FF", fontSize: 22, fontWeight: 300, lineHeight: 1, width: 24, textAlign: "center" }}>‹</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, textAlign: "center", letterSpacing: 0.2 }}>May 12–18, 2026</span>
        <span style={{ color: "#6C63FF", fontSize: 22, fontWeight: 300, lineHeight: 1, width: 24, textAlign: "center" }}>›</span>
      </div>

      {/* 4 stat cards: HOURS · PER HOUR · EARNED · SPENT */}
      <div style={{ display: "flex", borderBottom: "1px solid #1E264044", flexShrink: 0 }}>
        {[
          { lbl: "HOURS",    val: "34.5h", color: "#fff",    active: false },
          { lbl: "PER HOUR", val: "$28/h", color: "#FFB547", active: false },
          { lbl: "EARNED",   val: "$980",  color: "#00D4AA", active: true  },
          { lbl: "SPENT",    val: "$110",  color: "#FF5C5C", active: false },
        ].map((c, i) => (
          <div key={i} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            padding: "10px 2px 8px",
            borderLeft: i > 0 ? "1px solid #1E264044" : "none",
            background: c.active ? "#00D4AA1A" : "transparent",
            borderBottom: c.active ? "2px solid #00D4AA" : "2px solid transparent",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: c.color }}>{c.val}</span>
            <span style={{ fontSize: 8, color: "#8A94A6", fontWeight: 600, marginTop: 3, letterSpacing: "0.06em" }}>{c.lbl}</span>
          </div>
        ))}
      </div>

      {/* Job breakdown */}
      <div style={{ padding: "10px 18px 8px", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        {jobs.map((j, i) => {
          const pct = (j.earn / totalEarn) * 100;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: j.dot, flexShrink: 0, display: "block" }}></span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: "#fff" }}>{j.n}</span>
                <span style={{ fontSize: 11, color: "#8A94A6", marginRight: 6 }}>{j.h}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: j.dot, fontFamily: "Space Grotesk, sans-serif" }}>${j.earn}</span>
                <span style={{ fontSize: 11, color: "#3A4258" }}>▾</span>
              </div>
              <div style={{ height: 3, background: "#1E264066", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: j.dot, borderRadius: 2 }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly rows */}
      <div style={{ flex: 1, borderTop: "1px solid #1E2640", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Column headers */}
        <div style={{ display: "flex", alignItems: "center", padding: "4px 14px 4px", borderBottom: "1px solid #1E264033", flexShrink: 0 }}>
          <span style={{ width: 56 }}></span>
          <span style={{ flex: 1,   fontSize: 9, color: "#3A4258", fontWeight: 700, textAlign: "center", letterSpacing: "0.06em" }}>HRS</span>
          <span style={{ flex: 1.4, fontSize: 9, color: "#3A4258", fontWeight: 700, textAlign: "center", letterSpacing: "0.06em" }}>EARNED</span>
          <span style={{ flex: 1.4, fontSize: 9, color: "#3A4258", fontWeight: 700, textAlign: "center", letterSpacing: "0.06em" }}>SPENT</span>
          <span style={{ flex: 1,   fontSize: 9, color: "#3A4258", fontWeight: 700, textAlign: "center", letterSpacing: "0.06em" }}>/HR</span>
          <span style={{ width: 14 }}></span>
        </div>
        {weekRows.map((d, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", padding: "8px 14px",
            borderBottom: "1px solid #1E264022",
            borderLeft: d.today ? "3px solid #6C63FF" : "3px solid transparent",
            opacity: d.future ? 0.3 : 1,
            flexShrink: 0,
          }}>
            <div style={{ width: 53 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: "#8A94A6", marginTop: 1 }}>{d.date}</div>
            </div>
            <span style={{ flex: 1,   fontSize: 12, fontWeight: 600, color: d.hours === "—" ? "#3A4258" : "#C8D0E0", textAlign: "center" }}>{d.hours}</span>
            <span style={{ flex: 1.4, fontSize: 12, fontWeight: 700, color: d.earn  === "—" ? "#3A4258" : "#00D4AA", textAlign: "center", fontFamily: "Space Grotesk, sans-serif" }}>{d.earn}</span>
            <span style={{ flex: 1.4, fontSize: 12, fontWeight: 600, color: d.spent === "—" ? "#3A4258" : "#FF5C5C", textAlign: "center", fontFamily: "Space Grotesk, sans-serif" }}>{d.spent}</span>
            <span style={{ flex: 1,   fontSize: 12, fontWeight: 700, color: d.rate  === "—" ? "#3A4258" : "#FFB547", textAlign: "center", fontFamily: "Space Grotesk, sans-serif" }}>{d.rate}</span>
            <span style={{ width: 14, fontSize: 11, color: "#3A4258", textAlign: "center" }}>{!d.future && d.hours !== "—" ? "▾" : !d.future ? "+" : ""}</span>
          </div>
        ))}
      </div>

      <BottomTabs active="log" />
    </div>
  );
}

// ── Wallet / Accounts screen
function WalletScreen() {
  const accounts = [
    { em: "💳", name: "BabilBank Checking", type: "Debit Card",   bal: 2840.50 },
    { em: "💳", name: "BabilBank Credit",   type: "Credit Card",  bal: 680.00, available: true, limit: 1200, debt: 520, util: 0.43 },
    { em: "🏦", name: "BabilBank Savings",  type: "Savings",      bal: 12400.00, hidden: true },
    { em: "💵", name: "Cash",               type: "Cash",         bal: 340.00 },
  ];
  const S = { fontFamily: "system-ui, -apple-system, sans-serif" };
  return (
    <div style={{ ...S, width: "100%", height: "100%", background: "#0D1117", color: "#fff", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "8px 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Accounts</div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ padding: "4px 10px", borderRadius: 8, background: "#1E2640", color: "#8A94A6", fontSize: 11, fontWeight: 600 }}>Edit</div>
          <div style={{ padding: "4px 10px", borderRadius: 8, background: "#6C63FF22", border: "1px solid #6C63FF44", color: "#A78BFA", fontSize: 11, fontWeight: 600 }}>+ Add</div>
        </div>
      </div>

      {/* Wallet selector + balance */}
      <div style={{ padding: "4px 20px 14px", borderBottom: "1px solid #1E2640" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#8A94A6" }}>Main Wallet</span>
          <div style={{ display: "inline-flex", padding: 2, background: "#161B2C", borderRadius: 100, fontSize: 10, fontWeight: 600 }}>
            <span style={{ padding: "3px 10px", borderRadius: 100, background: "#1E2640", color: "#fff" }}>Net</span>
            <span style={{ padding: "3px 10px", borderRadius: 100, color: "#8A94A6" }}>Available</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "Space Grotesk, sans-serif" }}>
            $2,660<span style={{ fontSize: 17, color: "#8A94A6" }}>.50</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#8A94A6", flexShrink: 0 }}>
            <path d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 5, fontSize: 11 }}>
          <span style={{ color: "#00D4AA", fontWeight: 600 }}>$3,180 assets</span>
          <span style={{ color: "#FF5C5C", fontWeight: 600 }}>−$520 debt</span>
          <span style={{ color: "#3A4258", fontWeight: 500 }}>+ 1 hidden</span>
        </div>
      </div>

      {/* Account rows */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {accounts.map((acc, i) => (
          <div key={i} style={{ padding: "13px 20px", borderBottom: "1px solid #1E264022" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 19, background: "#161B2C", border: "1px solid #1E2640", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{acc.em}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{acc.name}</div>
                <div style={{ fontSize: 11, color: "#8A94A6", marginTop: 2 }}>
                  {acc.type}{acc.limit ? ` · Limit $${acc.limit.toLocaleString()}` : ""}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {acc.hidden ? (
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 3, color: "#8A94A6" }}>•••••</div>
                ) : (
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: acc.util ? "#FFB547" : "#fff" }}>
                    ${acc.bal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
                {acc.available && <div style={{ fontSize: 9, color: "#8A94A6", marginTop: 1 }}>available</div>}
              </div>
              <span style={{ color: "#3A4258", fontSize: 18, marginLeft: 4 }}>›</span>
            </div>
            {/* Credit utilization bar */}
            {acc.util && (
              <div style={{ marginTop: 9, paddingLeft: 50 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: "#8A94A6", fontWeight: 700, letterSpacing: "0.08em" }}>CREDIT</span>
                  <span style={{ fontSize: 10, color: "#8A94A6" }}>${acc.debt} / $1,200</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#FFB547" }}>{Math.round(acc.util * 100)}%</span>
                </div>
                <div style={{ height: 5, background: "#1E2640", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${acc.util * 100}%`, background: "#FFB547", borderRadius: 3 }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

// ── Wallet Diagram (mobile port of WalletDiagramWeb, unlimited tier, vertical only)
function WalletDiagramMobile() {
  const tc = "#A78BFA";
  const tripColor = "#FF7A2F";
  const mainWallets = [
    { name: "USA Account Wallet", currency: "USD",
      accounts: [{ label: "Credit Card" }, { label: "Cash" }] },
    { name: "UK Account Wallet", currency: "GBP",
      accounts: [{ label: "Debit Card" }, { label: "Savings" }] },
    { name: "Business Wallet", currency: "EUR",
      accounts: [{ label: "Credit Card" }, { label: "Cash" }] },
  ];
  const tripWallets = [
    { name: "Business Trip", currency: "GBP",
      categories: [{ label: "Transport" }, { label: "Lodging" }] },
    { name: "Paris", currency: "EUR",
      categories: [{ label: "Lodging" }, { label: "Food" }] },
    { name: "Festival", currency: "USD",
      categories: [{ label: "Gifts" }, { label: "Food" }] },
    { name: "Japan", currency: "JPY",
      categories: [{ label: "Transport" }, { label: "Food" }] },
  ];

  const [vis, setVis] = React.useState(false);
  const uid = React.useId().replace(/:/g, "");
  React.useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  const diagCSS = `
    @keyframes wdmYouIn  { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
    @keyframes wdmRing   { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.55} 100%{transform:translate(-50%,-50%) scale(2.4);opacity:0} }
    @keyframes wdmCardIn { from{opacity:0;transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(14px)} to{opacity:1;transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(0)} }
    @keyframes wdmFloat  { 0%,100%{transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(0)} 50%{transform:perspective(500px) rotateX(11deg) rotateY(-3deg) translateY(-4px)} }
    @keyframes wdmItemIn { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
    @keyframes wdmGlow   { 0%,100%{opacity:0.3;transform:scaleX(0.75)} 50%{opacity:0.7;transform:scaleX(1.05)} }
  `;

  function ItemIconMini({ label }) {
    const l = (label || "").toLowerCase();
    const c = "rgba(255,255,255,0.44)"; const sw = "1.3";
    if (l.includes("credit") || l.includes("debit") || l.includes("card"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={c} strokeWidth={sw}/><line x1="2" y1="10" x2="22" y2="10" stroke={c} strokeWidth={sw}/><rect x="5" y="13" width="4" height="2" rx="0.5" fill={c}/></svg>;
    if (l.includes("cash"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke={c} strokeWidth={sw}/><circle cx="12" cy="12" r="3" stroke={c} strokeWidth={sw}/><circle cx="5" cy="12" r="1" fill={c}/><circle cx="19" cy="12" r="1" fill={c}/></svg>;
    if (l.includes("saving"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8v2H4v-2z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/><path d="M8 18v1M16 18v1" stroke={c} strokeWidth={sw} strokeLinecap="round"/></svg>;
    if (l.includes("transport"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" stroke={c} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round"/></svg>;
    if (l.includes("lodging") || l.includes("hotel"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={c} strokeWidth={sw} strokeLinejoin="round"/><rect x="9" y="14" width="6" height="8" stroke={c} strokeWidth={sw} strokeLinejoin="round"/></svg>;
    if (l.includes("food"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><line x1="18" y1="8" x2="18" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/><path d="M15 8a3 3 0 006 0" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="6" y1="3" x2="6" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="3" y1="3" x2="3" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="9" y1="3" x2="9" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/><line x1="3" y1="10" x2="9" y2="10" stroke={c} strokeWidth={sw} strokeLinecap="round"/></svg>;
    if (l.includes("gift"))
      return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="18" height="12" rx="1" stroke={c} strokeWidth={sw}/><rect x="3" y="6" width="18" height="3" rx="1" stroke={c} strokeWidth={sw}/><line x1="12" y1="6" x2="12" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/></svg>;
    return <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.5" fill={c}/><circle cx="12" cy="12" r="1.5" fill={c}/><circle cx="19" cy="12" r="1.5" fill={c}/></svg>;
  }

  function WalletCard({ wallet, isTrip, idx }) {
    const cc = isTrip ? tripColor : tc;
    const items = isTrip ? wallet.categories : wallet.accounts;
    const d = idx * 90; const fd = d + 620;
    const n = (wallet.name || "").toLowerCase();
    return (
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        <div style={{ position: "absolute", bottom: -5, left: "12%", right: "12%", height: 13, background: `radial-gradient(ellipse, ${cc}55 0%, transparent 70%)`, filter: "blur(5px)", pointerEvents: "none", animation: vis ? `wdmGlow 4s ease-in-out ${fd}ms infinite` : "none" }} />
        <div style={{ background: `linear-gradient(148deg, ${cc}14 0%, ${cc}06 100%)`, border: `1px solid ${cc}55`, borderRadius: 10, padding: "8px 8px 7px", position: "relative", overflow: "hidden", boxShadow: `0 10px 26px rgba(0,0,0,0.6), 0 3px 8px rgba(0,0,0,0.32), inset 0 1px 0 ${cc}35`, animation: vis ? `wdmCardIn 0.55s cubic-bezier(0.16,1,0.3,1) ${d}ms both, wdmFloat 5s ease-in-out ${fd}ms infinite` : "none" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${cc}AA,transparent)` }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, background: `radial-gradient(circle at 100% 0%, ${cc}22 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0, flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: `${cc}22`, border: `1px solid ${cc}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {isTrip ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={cc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5" stroke={cc} strokeWidth="1.4"/></svg>
                : n.includes("business") ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="18" height="13" rx="1.5" stroke={cc} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 9V7a4 4 0 018 0v2" stroke={cc} strokeWidth="1.5" strokeLinecap="round"/></svg>
                : n.includes("account") ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="20" height="13" rx="2" stroke={cc} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 8V6a4 4 0 018 0v2" stroke={cc} strokeWidth="1.5" strokeLinecap="round"/></svg>
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={cc} strokeWidth="1.5"/><path d="M4.5 20c0-4 3.36-7 7.5-7s7.5 3 7.5 7" stroke={cc} strokeWidth="1.5" strokeLinecap="round"/></svg>}
              </div>
              <span style={{ color: "#E4EEF8", fontSize: 10.5, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.15, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis" }}>{wallet.name}</span>
            </div>
            <span style={{ color: cc, fontSize: 7.5, fontWeight: 800, background: `${cc}1A`, border: `1px solid ${cc}40`, borderRadius: 3, padding: "1.5px 4px", letterSpacing: "0.05em", fontFamily: "Space Grotesk, sans-serif", flexShrink: 0 }}>{wallet.currency}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((it, ii) => (
              <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 5, padding: "2.5px 6px", borderLeft: `1.5px solid ${cc}40`, background: `${cc}06`, borderRadius: "0 3px 3px 0", opacity: vis ? 1 : 0, animation: vis ? `wdmItemIn 0.36s ease ${d + 200 + ii * 50}ms both` : "none" }}>
                <ItemIconMini label={it.label} />
                <span style={{ color: "#6A8098", fontSize: 9.5, fontWeight: 500, letterSpacing: "0.01em" }}>{it.label}</span>
              </div>
            ))}
            {!isTrip && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "2.5px 6px", borderLeft: `1.5px dashed ${cc}28`, borderRadius: "0 3px 3px 0", opacity: vis ? 0.45 : 0, animation: vis ? `wdmItemIn 0.36s ease ${d + 200 + items.length * 50}ms both` : "none" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke={cc} strokeWidth="1.8" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={cc} strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span style={{ color: `${cc}80`, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.04em", fontFamily: "Space Grotesk, sans-serif" }}>Add account</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const total = mainWallets.length + tripWallets.length;
  const S = { fontFamily: "system-ui, -apple-system, sans-serif" };

  return (
    <div style={{ ...S, width: "100%", height: "100%", background: "#0D1117", color: "#fff", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "8px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1E2640" }}>
        <div>
          <div style={{ color: "#4A6A8A", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 2, fontFamily: "Space Grotesk, sans-serif" }}>Babil · Structure</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.02em" }}>Wallet Structure</div>
        </div>
        <div style={{ padding: "3px 9px", borderRadius: 100, background: `${tc}18`, border: `1px solid ${tc}55`, color: tc, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", fontFamily: "Space Grotesk, sans-serif" }}>UNLIMITED</div>
      </div>

      {/* Scrollable diagram */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", paddingBottom: 88, background: "linear-gradient(168deg, #070E1C 0%, #040810 100%)", position: "relative" }}>
        <style>{diagCSS}</style>
        <div style={{ position: "absolute", top: 80, left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 160, borderRadius: "50%", background: `radial-gradient(ellipse, ${tc}12 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          {/* You bubble */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, position: "relative" }}>
            {vis && [0, 1, 2].map(i => (
              <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${tc}65`, animation: `wdmRing 2.8s ease-out ${i * 0.9}s infinite`, pointerEvents: "none" }} />
            ))}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${tc}18`, border: `1.5px solid ${tc}65`, borderRadius: 100, padding: "6px 13px 6px 7px", boxShadow: `0 0 18px ${tc}40, 0 0 36px ${tc}18`, animation: vis ? "wdmYouIn 0.5s cubic-bezier(0.16,1,0.3,1) both" : "none", position: "relative", zIndex: 2 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${tc}32`, border: `1px solid ${tc}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={tc} strokeWidth="1.6"/><path d="M4.5 20c0-4 3.36-7 7.5-7s7.5 3 7.5 7" stroke={tc} strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>You</span>
            </div>
          </div>

          {/* Connector */}
          <svg width="100%" height="22" style={{ display: "block", overflow: "visible", marginBottom: 4 }}>
            <defs>
              <linearGradient id={`${uid}v`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={tc} stopOpacity="0.85"/><stop offset="100%" stopColor={tc} stopOpacity="0.08"/></linearGradient>
              <linearGradient id={`${uid}h`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={tc} stopOpacity="0.04"/><stop offset="50%" stopColor={tc} stopOpacity="0.45"/><stop offset="100%" stopColor={tc} stopOpacity="0.04"/></linearGradient>
            </defs>
            <line x1="50%" y1="0" x2="50%" y2="16" stroke={`url(#${uid}v)`} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="18" style={{ strokeDashoffset: vis ? 0 : 18, transition: "stroke-dashoffset 0.35s 0.1s ease" }} />
            {total > 1 && <line x1="10%" y1="16" x2="90%" y2="16" stroke={`url(#${uid}h)`} strokeWidth="1.2" strokeDasharray="400" style={{ strokeDashoffset: vis ? 0 : 400, transition: "stroke-dashoffset 0.5s 0.22s ease" }} />}
          </svg>

          {/* Main wallets */}
          {mainWallets.length > 0 && (
            <div>
              <div style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", color: "#3A5570", marginBottom: 6, textAlign: "center", fontFamily: "Space Grotesk, sans-serif" }}>Main Wallets</div>
              <div style={{ display: "grid", gridTemplateColumns: mainWallets.length <= 2 ? `repeat(${mainWallets.length},1fr)` : "1fr 1fr", gap: 7 }}>
                {mainWallets.map((w, i) => <WalletCard key={w.name} wallet={w} isTrip={false} idx={i} />)}
              </div>
            </div>
          )}

          {/* Divider */}
          {tripWallets.length > 0 && mainWallets.length > 0 && (
            <div style={{ margin: "12px 0 8px", display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${tc}22)` }} />
              <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", color: "#3A5570", fontFamily: "Space Grotesk, sans-serif", flexShrink: 0 }}>Trip Wallets</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${tripColor}22,transparent)` }} />
            </div>
          )}

          {/* Trip wallets */}
          {tripWallets.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: tripWallets.length <= 2 ? `repeat(${tripWallets.length},1fr)` : "1fr 1fr", gap: 7 }}>
              {tripWallets.map((w, i) => <WalletCard key={w.name} wallet={w} isTrip={true} idx={mainWallets.length + i} />)}
            </div>
          )}
        </div>
      </div>

      <BottomTabs active="wallet" />
    </div>
  );
}

// ── Phone container
function Phone({ screen = "home", style = {} }) {
  const screens = { home: <HomeScreen />, stats: <StatsScreen />, log: <DailyLogScreen />, wallet: <WalletScreen />, trip: <TripWalletScreen />, lasvegas: <LasVegasTripScreen />, diagram: <WalletDiagramMobile /> };
  return (
    <div className="phone" style={style}>
      <span className="side-btn-l1"></span>
      <span className="side-btn-l2"></span>
      <span className="side-btn-l3"></span>
      <span className="side-btn-r"></span>
      <div className="phone-screen">
        <div className="phone-notch"></div>
        {screens[screen]}
      </div>
    </div>
  );
}

// ── Trip Wallet screen
function TripWalletScreen() {
  const cats = [
    { em: "🍽️", name: "Food",       amt: 480, pct: 39, c: "#6C63FF" },
    { em: "🚇", name: "Transport",  amt: 334, pct: 27, c: "#00D4AA" },
    { em: "🎌", name: "Activities", amt: 260, pct: 21, c: "#FFB547" },
    { em: "🏨", name: "Hotels",     amt: 166, pct: 13, c: "#A78BFA" },
  ];
  const total = 1240;
  // donut
  const R = 46, CX = 56, CY = 56, SW = 13, C = 2 * Math.PI * R;
  let acc = 0;
  const S = { fontFamily: "system-ui, -apple-system, sans-serif" };
  return (
    <div style={{ ...S, width:"100%", height:"100%", background:"#0D1117", color:"#fff", overflow:"hidden", position:"relative", display:"flex", flexDirection:"column" }}>
      <StatusBar />
      {/* Header */}
      <div style={{ padding:"8px 16px 10px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid #1E2640" }}>
        <span style={{ color:"#6C63FF", fontSize:22, fontWeight:300, lineHeight:1 }}>‹</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15, fontWeight:700 }}>Tokyo Spring 2026</div>
          <div style={{ fontSize:11, color:"#8A94A6", marginTop:1 }}>Apr 28 — May 5, 2026</div>
        </div>
        <span style={{ padding:"3px 10px", borderRadius:100, background:"#00D4AA22", border:"1px solid #00D4AA44", color:"#00D4AA", fontSize:11, fontWeight:700 }}>● Active</span>
      </div>

      {/* Summary row */}
      <div style={{ display:"flex", borderBottom:"1px solid #1E264044" }}>
        {[
          { lbl:"SPENT",   val:"$1,240", color:"#FF5C5C" },
          { lbl:"DAYS",    val:"8",      color:"#fff"    },
          { lbl:"AVG/DAY", val:"$155",   color:"#FFB547" },
        ].map((c,i) => (
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 4px 8px", borderLeft: i>0 ? "1px solid #1E264044":"none" }}>
            <span style={{ fontSize:15, fontWeight:700, fontFamily:"Space Grotesk, sans-serif", color:c.color }}>{c.val}</span>
            <span style={{ fontSize:9, color:"#8A94A6", fontWeight:600, marginTop:3, letterSpacing:"0.07em" }}>{c.lbl}</span>
          </div>
        ))}
      </div>

      {/* Donut + legend */}
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px 10px" }}>
        <svg width="112" height="112" viewBox="0 0 112 112" style={{ flexShrink:0, overflow:"visible" }}>
          <defs>
            {cats.map((s,i) => (
              <linearGradient key={i} id={`tpg${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={s.c} stopOpacity="1"/>
                <stop offset="100%" stopColor={s.c} stopOpacity="0.6"/>
              </linearGradient>
            ))}
            <radialGradient id="tpctr" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1C2438"/>
              <stop offset="100%" stopColor="#0D1117"/>
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#13192A" strokeWidth={SW}/>
          {cats.map((s,i) => {
            const len = Math.max(0,(s.pct/100)*C - 1.5);
            const off = cats.slice(0,i).reduce((a,x)=>a+x.pct,0)/100*C;
            return (
              <circle key={i} cx={CX} cy={CY} r={R} fill="none"
                stroke={`url(#tpg${i})`} strokeWidth={SW}
                strokeDasharray={`${len} ${C}`} strokeDashoffset={-off}
                transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="butt"/>
            );
          })}
          <circle cx={CX} cy={CY} r={R-SW/2-1} fill="url(#tpctr)"/>
          <text x={CX} y={CY-3} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="Space Grotesk, sans-serif">$1,240</text>
          <text x={CX} y={CY+12} textAnchor="middle" fill="#8A94A6" fontSize="8" fontWeight="600" letterSpacing="0.06em">TOTAL</text>
        </svg>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:7 }}>
          {cats.map((c,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ fontSize:12 }}>{c.em}</span>
              <span style={{ flex:1, fontSize:11, fontWeight:600 }}>{c.name}</span>
              <span style={{ fontSize:10, color:"#8A94A6", marginRight:4 }}>{c.pct}%</span>
              <span style={{ fontSize:12, fontWeight:700, color:c.c, fontFamily:"Space Grotesk, sans-serif" }}>${c.amt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category progress bars */}
      <div style={{ padding:"4px 18px 10px", display:"flex", flexDirection:"column", gap:8, borderTop:"1px solid #1E264022" }}>
        {cats.map((c,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", gap:3 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:11, color:"#8A94A6" }}>{c.em} {c.name}</span>
              <span style={{ fontSize:11, fontWeight:700, color:c.c, fontFamily:"Space Grotesk, sans-serif" }}>${c.amt}</span>
            </div>
            <div style={{ height:4, background:"#1E2640", borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${c.pct*2.4}%`, background:c.c, borderRadius:2 }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent entries */}
      <div style={{ borderTop:"1px solid #1E2640", padding:"8px 0 0", flex:1 }}>
        <div style={{ padding:"0 18px 6px", fontSize:9, color:"#3A4258", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Recent</div>
        {[
          { em:"🍽️", name:"Ramen dinner",    date:"May 4", amt:"−$28" },
          { em:"🚇", name:"Shinkansen pass", date:"May 3", amt:"−$84" },
          { em:"🎌", name:"TeamLab tickets", date:"May 2", amt:"−$36" },
        ].map((r,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", padding:"8px 18px", borderBottom:"1px solid #1E264022" }}>
            <div style={{ width:28, height:28, borderRadius:100, background:"#161B2C", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, marginRight:10 }}>{r.em}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:600 }}>{r.name}</div>
              <div style={{ fontSize:10, color:"#8A94A6", marginTop:1 }}>{r.date}</div>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:"#FF5C5C" }}>{r.amt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Las Vegas 2026 Trip Wallet Detail screen (mirrors WalletSettingsScreen trip detail)
function LasVegasTripScreen() {
  const S = { fontFamily: "system-ui, -apple-system, sans-serif" };
  const cats = [
    { dot: "#00B4D8", em: "🍽️", name: "Food & Drinks",  pct: 30, amt: "$254.19" },
    { dot: "#00D4AA", em: "🏨", name: "Lodging",         pct: 26, amt: "$220.30" },
    { dot: "#FF7A35", em: "🎭", name: "Entertainment",   pct: 20, amt: "$169.46" },
    { dot: "#FF5C5C", em: "✈️", name: "Transportation",  pct: 12, amt: "$101.68" },
    { dot: "#FFB547", em: "🛍️", name: "Shopping",        pct:  8, amt: "$67.78"  },
    { dot: "#A78BFA", em: "🎁", name: "Gifts",           pct:  4, amt: "$33.89"  },
  ];

  return (
    <div style={{ ...S, width:"100%", height:"100%", background:"#0D1117", color:"#fff", overflow:"hidden", position:"relative", display:"flex", flexDirection:"column" }}>
      <StatusBar />

      {/* Tab header: Main Wallets / Trip Wallets */}
      <div style={{ display:"flex", alignItems:"center", padding:"6px 16px 0", gap:4, borderBottom:"1px solid #1E2640" }}>
        <span style={{ color:"#6C63FF", fontSize:20, fontWeight:300, marginRight:6, lineHeight:1 }}>‹</span>
        <button style={{ flex:1, background:"none", border:"none", padding:"7px 4px", fontSize:13, fontWeight:600, color:"#8A94A6", textAlign:"center", cursor:"pointer" }}>Main Wallets</button>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0 }}>
          <button style={{ background:"none", border:"none", padding:"7px 4px", fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer" }}>Trip Wallets</button>
          <div style={{ height:2, width:"80%", background:"#6C63FF", borderRadius:2 }}></div>
        </div>
      </div>

      {/* Trip identity */}
      <div style={{ padding:"14px 16px 10px", display:"flex", alignItems:"flex-start", gap:12, borderBottom:"1px solid #1E264044" }}>
        <div style={{ width:44, height:44, borderRadius:12, background:"#1E2640", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>🎰</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:17, fontWeight:800, lineHeight:1.2 }}>Las Vegas 2026</div>
          <div style={{ fontSize:11, color:"#8A94A6", marginTop:3 }}>2026-05-08 — 2026-05-12</div>
        </div>
        <div style={{ padding:"4px 12px", borderRadius:8, background:"#1E2640", color:"#8A94A6", fontSize:11, fontWeight:700, flexShrink:0, alignSelf:"center" }}>Edit</div>
      </div>

      {/* Total spent */}
      <div style={{ padding:"10px 16px 6px" }}>
        <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.1em", color:"#8A94A6", marginBottom:4 }}>TOTAL SPENT</div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:"Space Grotesk, sans-serif", fontSize:30, fontWeight:800, letterSpacing:"-0.02em" }}>$847.30</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" opacity="0.4">
            <path d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z" stroke="#8A94A6" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="3" stroke="#8A94A6" strokeWidth="1.8"/>
          </svg>
        </div>
      </div>

      {/* Stats card */}
      <div style={{ margin:"4px 16px 10px", borderRadius:14, background:"#13192A", display:"flex" }}>
        {[
          { val:"5",    lbl:"days"      },
          { val:"24",   lbl:"entries"   },
          { val:"$169", lbl:"avg / day" },
        ].map((s,i) => (
          <div key={i} style={{
            flex:1, display:"flex", flexDirection:"column", alignItems:"center",
            padding:"12px 4px 10px",
            borderLeft: i > 0 ? "1px solid #1E2640" : "none",
          }}>
            <span style={{ fontFamily:"Space Grotesk, sans-serif", fontSize:20, fontWeight:800, color:"#fff", lineHeight:1 }}>{s.val}</span>
            <span style={{ fontSize:10, color:"#8A94A6", marginTop:4, fontWeight:500 }}>{s.lbl}</span>
          </div>
        ))}
      </div>

      {/* Categories card */}
      <div style={{ margin:"0 16px", borderRadius:14, background:"#13192A", flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"10px 14px 6px", fontSize:9, fontWeight:800, letterSpacing:"0.1em", color:"#8A94A6" }}>CATEGORIES</div>
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column", gap:0 }}>
          {cats.map((c,i) => (
            <div key={i} style={{ padding:"5px 14px 7px", borderTop: i > 0 ? "1px solid #1E264033" : "none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:c.dot, display:"block", flexShrink:0 }}></span>
                <span style={{ fontSize:13 }}>{c.em}</span>
                <span style={{ flex:1, fontSize:13, fontWeight:600 }}>{c.name}</span>
                <span style={{ fontSize:11, color:"#8A94A6", marginRight:6 }}>{c.pct}%</span>
                <span style={{ fontSize:12, fontWeight:700, color:"#fff", fontFamily:"Space Grotesk, sans-serif" }}>{c.amt}</span>
              </div>
              <div style={{ height:3, background:"#1E2640", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${c.pct * 3.2}%`, background:c.dot, borderRadius:2 }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{ padding:"10px 16px 14px", display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
        <button style={{
          width:"100%", padding:"10px 0", borderRadius:50,
          background:"linear-gradient(135deg,#7C73FF,#6C63FF)",
          border:"none", color:"#fff", fontSize:15, fontWeight:800,
          display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer",
          fontFamily:"Space Grotesk, sans-serif",
          boxShadow:"0 4px 20px rgba(108,99,255,0.4)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 7v10M7 12h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> Add Expense
        </button>
        <button style={{
          width:"100%", padding:"11px 0", borderRadius:50,
          background:"transparent", border:"1.5px solid #6C63FF66",
          color:"#A78BFA", fontSize:14, fontWeight:700,
          display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer",
          fontFamily:"Space Grotesk, sans-serif",
        }}>
          <svg width="16" height="14" viewBox="0 0 20 16" fill="none"><rect x="1" y="8" width="3" height="7" rx="1" fill="#A78BFA"/><rect x="6" y="5" width="3" height="10" rx="1" fill="#A78BFA"/><rect x="11" y="2" width="3" height="13" rx="1" fill="#A78BFA"/><rect x="16" y="0" width="3" height="15" rx="1" fill="#A78BFA"/></svg>
          View Statistics
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { BabilHex, HomeScreen, StatsScreen, DailyLogScreen, WalletScreen, TripWalletScreen, LasVegasTripScreen, Phone });
