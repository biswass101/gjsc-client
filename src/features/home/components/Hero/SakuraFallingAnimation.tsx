const PETALS = Array.from({ length: 9 }, (_, i) => ({
  left: `${(i * 11 + 5) % 100}%`,
  size: 8 + (i % 4) * 3,
  duration: 16 + (i % 5) * 4,
  delay: i * 2.4,
}));

export function Sakura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
