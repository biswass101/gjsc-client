"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show button when user is near the bottom of the page
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      // Show when user has scrolled past 60% of the page or near bottom
      const nearBottom = scrolled + viewHeight > docHeight * 0.6;
      setVisible(nearBottom && scrolled > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={scrollToTop}
      className={`fixed bottom-17 sm:bottom-24 right-3 sm:right-7.5 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-background shadow-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-xl ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

