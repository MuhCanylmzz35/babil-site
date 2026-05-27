import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
    >
      {/* radial glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(46,229,168,0.35) 0%, rgba(46,229,168,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative">
        {/* left: copy */}
        <div className="max-w-xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
            Spending <span className="text-[#ff8c42]">smart</span>
            <br />
            is the
            <br />
            real way of
            <br />
            earning.
          </h1>

          <p className="mt-8 text-lg text-[#9ba6b3] leading-relaxed max-w-md">
            Run yourself like a one-person company. Babil pulls every account,
            every work day, and every spending pattern into one clear view, so
            you can see what&apos;s earning, what&apos;s draining, and what to
            change next.
          </p>

          <div id="download" className="mt-10 flex flex-wrap gap-4">
            <StoreCard
              caption="DOWNLOAD ON THE"
              name="App Store"
              icon={<AppleIcon />}
            />
            <StoreCard
              caption="GET IT ON"
              name="Google Play"
              icon={<PlayIcon />}
            />
          </div>
        </div>

        {/* right: phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function StoreCard({
  caption,
  name,
  icon,
}: {
  caption: string;
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center gap-3 rounded-2xl bg-[#1a2029]/80 border border-[#222a35] px-5 py-4 min-w-[180px] cursor-not-allowed">
      <div className="text-white">{icon}</div>
      <div className="leading-tight">
        <div className="text-[10px] tracking-wider text-[#8b95a5]">
          {caption}
        </div>
        <div className="text-lg font-semibold text-white">{name}</div>
        <div className="text-[10px] tracking-wider text-[#8b95a5] mt-1">
          COMING SOON
        </div>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.45 2.23-1.19 3.04-.79.87-2.07 1.55-3.13 1.46-.13-1.11.42-2.27 1.13-3.01.79-.83 2.13-1.45 3.19-1.49zM20.5 17.5c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.39 3.51-4.12 3.52-1.54.01-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07 1-1.73-.01-3.06-1.77-4.05-3.33-2.77-4.37-3.06-9.5-1.35-12.23 1.21-1.94 3.13-3.08 4.93-3.08 1.84 0 2.99 1.01 4.51 1.01 1.48 0 2.38-1.01 4.51-1.01 1.6 0 3.3.87 4.51 2.37-3.97 2.18-3.32 7.85.69 9.78z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M3.6 1.5C3.2 1.8 3 2.3 3 2.9v18.2c0 .6.2 1.1.6 1.4l10.4-10.5L3.6 1.5zm12 10.7l2.7 2.7-12.5 7.2L15.6 12.2zm4.9-2.8l-3 1.7-3-3 3-3 3 1.7c1 .6 1 2 0 2.6zM5.8.6l12.5 7.2-2.7 2.7L5.8.6z" />
    </svg>
  );
}
