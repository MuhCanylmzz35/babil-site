export default function PhoneMockup() {
  return (
    <div className="relative w-[300px] sm:w-[340px] aspect-[300/620]">
      {/* phone frame */}
      <div className="absolute inset-0 rounded-[44px] bg-[#0a0e13] border border-[#1f2630] shadow-[0_30px_80px_-20px_rgba(46,229,168,0.18)] overflow-hidden">
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-black z-10" />

        {/* status bar */}
        <div className="flex items-center justify-between px-6 pt-3 text-[11px] text-white/80">
          <span>9:41</span>
          <span>● ● ●</span>
        </div>

        {/* app content */}
        <div className="px-5 pt-8">
          {/* brand */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <div className="h-4 w-4 rounded-sm bg-[#ff8c42]" />
            <span className="text-[#ff8c42] text-sm font-semibold">Babil</span>
          </div>

          {/* Main/Trip pill */}
          <div className="mx-auto w-fit bg-[#161b22] rounded-full p-1 flex gap-1 mb-5">
            <span className="px-4 py-1 rounded-full bg-[#0d1117] text-[11px] text-white">
              Main
            </span>
            <span className="px-4 py-1 rounded-full text-[11px] text-[#8b95a5]">
              Trip
            </span>
          </div>

          {/* balance */}
          <div className="text-[10px] text-[#8b95a5] tracking-wider">
            NET TOTAL BALANCE
          </div>
          <div className="text-3xl font-semibold text-white mt-0.5">
            $35,064<span className="text-base text-[#8b95a5]">.50</span>
          </div>
          <div className="flex gap-3 mt-1.5 text-[10px]">
            <span className="text-[#ff8c42]">+ $4,210 Income</span>
            <span className="text-[#ff5c5c]">− $2,045 Expense</span>
          </div>

          {/* action buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 text-[10px] bg-[#161b22] rounded-lg py-2 text-[#ff8c42]">
              + Expense
            </button>
            <button className="flex-1 text-[10px] bg-[#161b22] rounded-lg py-2 text-[#2ee5a8]">
              + Income
            </button>
            <button className="flex-1 text-[10px] bg-[#161b22] rounded-lg py-2 text-[#a78bfa]">
              Work Log
            </button>
          </div>

          {/* W M Y tabs */}
          <div className="flex justify-between items-center mt-5 text-[10px] text-[#8b95a5]">
            <div className="flex gap-3">
              <span>W</span>
              <span className="text-[#a78bfa] font-semibold">M</span>
              <span>Y</span>
            </div>
            <span>May 2026 ▾</span>
          </div>

          {/* donut placeholder */}
          <div className="flex items-center gap-3 mt-3">
            <div
              className="h-20 w-20 rounded-full shrink-0"
              style={{
                background:
                  "conic-gradient(#a78bfa 0 38%, #ff8c42 38% 62%, #2ee5a8 62% 80%, #60a5fa 80% 92%, #4b5563 92% 100%)",
                mask: "radial-gradient(circle, transparent 40%, #000 41%)",
                WebkitMask:
                  "radial-gradient(circle, transparent 40%, #000 41%)",
              }}
            />
            <div className="space-y-1 text-[10px] flex-1">
              <Legend color="#a78bfa" label="Rent" v="38%" />
              <Legend color="#ff8c42" label="Shopping" v="24%" />
              <Legend color="#2ee5a8" label="Food" v="18%" />
              <Legend color="#60a5fa" label="Transport" v="12%" />
              <Legend color="#4b5563" label="Other" v="8%" />
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 px-8 py-3 flex justify-between text-[9px] text-[#8b95a5] border-t border-[#1f2630] bg-[#0a0e13]">
          <span className="text-white">⌂ Home</span>
          <span>📊 Stats</span>
          <span>📝 Work Log</span>
        </div>
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  v,
}: {
  color: string;
  label: string;
  v: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-sm"
          style={{ background: color }}
        />
        <span className="text-white/90">{label}</span>
      </div>
      <span className="text-[#8b95a5]">{v}</span>
    </div>
  );
}
