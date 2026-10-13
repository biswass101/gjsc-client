import { useEffect, useRef, useState } from "react";

export function useHeaderVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          // Only show header when at the top
          if (currentScrollY < 50) {
            setIsVisible(true);
            scrollThreshold.current = 0;
          } else if (scrollDelta > 10 && scrollThreshold.current > 0) {
            // Scrolling down significantly
            setIsVisible(false);
            scrollThreshold.current = 0;
          } else if (scrollDelta < -10) {
            // Scrolling up
            setIsVisible(true);
            scrollThreshold.current = 0;
          } else {
            scrollThreshold.current += Math.abs(scrollDelta);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
}
