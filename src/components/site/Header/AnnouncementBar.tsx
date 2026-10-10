import { useEffect, useRef, useState } from "react";

const ANNOUNCEMENTS_TEXT = "Free nationwide delivery on orders over ৳5,000  ·  100% authentic Japanese formulas  ·  Cash on Delivery & bKash  ·  Stay Glorious, Shine with Confidence  ·  ";

export function AnnouncementBar() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="bg-foreground text-background overflow-hidden whitespace-nowrap py-1.5 text-[9px] sm:text-[10px] tracking-[0.16em] uppercase flex items-center h-7 select-none border-b border-background/10"
      role="status"
      aria-live="polite"
      aria-label="Announcements"
    >
      <div
        ref={marqueeRef}
        className={`flex animate-marquee whitespace-nowrap ${isPaused ? "animation-paused" : ""}`}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        <span className="px-2 shrink-0">{ANNOUNCEMENTS_TEXT}</span>
        <span className="px-2 shrink-0">{ANNOUNCEMENTS_TEXT}</span>
        <span className="px-2 shrink-0">{ANNOUNCEMENTS_TEXT}</span>
        <span className="px-2 shrink-0">{ANNOUNCEMENTS_TEXT}</span>
      </div>
    </div>
  );
}