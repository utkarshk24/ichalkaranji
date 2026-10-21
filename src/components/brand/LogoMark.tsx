/**
 * The portal's own mark: a 4×4 woven square (blue warp, gold weft) with an emerald river line.
 * Deliberately NOT the municipal emblem — this is an independent portal.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const cells = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="36" height="36" rx="8" fill="var(--brand-blue)" />
      {cells.map((row) =>
        cells.map((col) =>
          (row + col) % 2 === 0 ? (
            <rect key={`${row}-${col}`} x={5 + col * 6.5} y={5 + row * 6.5} width="6.5" height="6.5" fill="var(--brand-gold)" opacity="0.95" />
          ) : null,
        ),
      )}
      <path d="M4 29 C 11 25, 17 33, 24 28 S 32 27, 33 26" stroke="var(--brand-emerald)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
