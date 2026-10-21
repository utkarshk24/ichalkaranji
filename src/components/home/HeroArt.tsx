/**
 * Original illustration used until a licensed photograph of the mills or the Panchganga ghat is added
 * to data/media.json: warp threads in gold, weft bands, and the river line in emerald.
 */
export function HeroArt() {
  const warp = Array.from({ length: 48 }, (_, i) => i);
  const weft = [0.18, 0.34, 0.5, 0.66];
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14275f" />
          <stop offset="0.6" stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#24459e" />
        </linearGradient>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14275f" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#14275f" stopOpacity="0.55" />
          <stop offset="1" stopColor="#14275f" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#hero-sky)" />

      {/* Warp threads */}
      <g stroke="#d97706" strokeOpacity="0.28" strokeWidth="2">
        {warp.map((i) => (
          <line key={i} x1={520 + i * 14} y1="0" x2={520 + i * 14} y2="620" />
        ))}
      </g>
      {/* Weft bands, interlaced over alternate threads */}
      {weft.map((y, row) => (
        <g key={y} fill="#fbd38d" fillOpacity={0.18 + row * 0.04}>
          {warp.map((i) =>
            (i + row) % 2 === 0 ? <rect key={i} x={514 + i * 14} y={y * 800} width="12" height="10" rx="2" /> : null,
          )}
        </g>
      ))}

      {/* Panchganga river */}
      <path d="M0 650 C 220 600, 380 700, 620 640 S 980 590, 1200 640 L1200 800 L0 800 Z" fill="#0f2c25" fillOpacity="0.55" />
      <path d="M0 650 C 220 600, 380 700, 620 640 S 980 590, 1200 640" stroke="#34d399" strokeOpacity="0.7" strokeWidth="3" fill="none" />
      <path d="M0 690 C 240 650, 420 735, 640 680 S 1000 640, 1200 690" stroke="#34d399" strokeOpacity="0.3" strokeWidth="2" fill="none" />

      <rect width="1200" height="800" fill="url(#hero-fade)" />
    </svg>
  );
}
