"use client";

import { useState, useEffect } from "react";

import { Sakura } from "./SakuraFallingAnimation";
import { Content } from "./Content";
import { BackgroundSlider } from "./BackgroundSlider";
import { CarouselIndicators } from "./CarouselIndicators";
import { HERO_IMAGES } from "./BackgroundSlider";

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container-lux pt-3">
      <div className="relative flex h-52 items-center overflow-hidden rounded-md sm:rounded-xl sm:h-95 lg:h-115">
        <BackgroundSlider currentIndex={currentIndex} />

        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <Sakura />
        </div>

        {/* <div className="relative z-20 w-full pt-1 sm:pt-2 lg:pt-4 pb-2 sm:pb-4 lg:pb-6">
          <Content />
        </div> */}

        <CarouselIndicators
          currentIndex={currentIndex}
          total={HERO_IMAGES.length}
          onSelect={setCurrentIndex}
        />
      </div>
    </section>
  );
}
