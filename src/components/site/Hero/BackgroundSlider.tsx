
"use client";

import hero1 from "@/assets/hero/sakura-spa-skincare-trio.png";
import hero2 from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import hero3 from "@/assets/hero/japanese-inspired-foaming-skincare-ritual.png";

const HERO_IMAGES = [hero1, hero2, hero3];

interface BackgroundSliderProps {
  currentIndex: number;
}

export function BackgroundSlider({
  currentIndex,
}: BackgroundSliderProps) {
  return (
    <div className="isolate absolute inset-0 z-0 overflow-hidden rounded-xl">
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img.src}
          className=" transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-linear"
            style={{
              backgroundImage: `url("${img.src}")`,
              transform:
                index === currentIndex
                  ? "scale(1.1) translateX(-2%)"
                  : "scale(1) translateX(0)",
            }}
          />

          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent" />
        </div>
      ))}
    </div>
  );
}

export { HERO_IMAGES };
