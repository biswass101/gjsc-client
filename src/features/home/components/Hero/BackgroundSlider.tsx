"use client";
import { useState } from "react";
import pujaSale from "@/assets/hero/puja-sale.png";
import hero1 from "@/assets/hero/Glorious Japan Skincare Spring Glow.png";
import hero2 from "@/assets/hero/Perfect Whip Fresh Beauty Ritual.png";

const HERO_IMAGES = [pujaSale, hero1, hero2];

interface BackgroundSliderProps {
  currentIndex: number;
}

const SLIDE_DURATION_MS = 1000;

export function BackgroundSlider({ currentIndex }: BackgroundSliderProps) {
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

        const translateX = isCurrent ? 0 : isPrev ? -100 : 100;

        return (
          <div
            key={img.src}
            aria-hidden={!isCurrent}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateX(${translateX}%)`,
              transition:
                isCurrent || isPrev ? `transform ${SLIDE_DURATION_MS}ms ease-in-out` : "none",
            }}
          >
            {/* Using <img> instead of background-image so the browser can
                prioritise the first slide and avoid layout shift */}
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              /* First slide loads eagerly to avoid LCP delay; others are lazy */
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding={index === 0 ? "sync" : "async"}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        );
      })}
    </div>
  );
}

export { HERO_IMAGES };
