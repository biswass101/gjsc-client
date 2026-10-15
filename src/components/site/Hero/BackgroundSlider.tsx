"use client";
import { useState } from "react";
import pujaSale from "@/assets/hero/puja-sale.png";
import hero1 from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import hero2 from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";
import hero3 from "@/assets/hero/japanese-inspired-foaming-skincare-ritual.png";

const HERO_IMAGES = [pujaSale, hero1, hero2];

interface BackgroundSliderProps {
  currentIndex: number;
}

const SLIDE_DURATION_MS = 1000;

export function BackgroundSlider({ currentIndex }: BackgroundSliderProps) {
  // Track the previously active slide so it can slide out to the left
  // while the new one slides in from the right.
  const [indexes, setIndexes] = useState({
    current: currentIndex,
    prev: currentIndex,
  });

  if (indexes.current !== currentIndex) {
    setIndexes({ current: currentIndex, prev: indexes.current });
  }

  return (
    <div className="isolate absolute inset-0 z-0 overflow-hidden rounded">
      {HERO_IMAGES.map((img, index) => {
        const isCurrent = index === indexes.current;
        const isPrev = index === indexes.prev && !isCurrent;

        // current -> centered, previous -> exits left, others wait on the right
        const translateX = isCurrent ? 0 : isPrev ? -100 : 100;

        return (
          <div
            key={img.src}
            aria-hidden={!isCurrent}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateX(${translateX}%)`,
              // Only animate the entering and leaving slides; the rest are
              // off-screen and must reposition instantly (no sweep-through).
              transition:
                isCurrent || isPrev ? `transform ${SLIDE_DURATION_MS}ms ease-in-out` : "none",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${img.src}")` }}
            />

            {/* <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent" /> */}
          </div>
        );
      })}
    </div>
  );
}

export { HERO_IMAGES };
