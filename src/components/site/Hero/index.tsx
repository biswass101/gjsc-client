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
    <section className="container-lux relative min-h-[25vh] sm:min-h-[40vh] lg:min-h-[55vh] flex items-center overflow-hidden">
      <BackgroundSlider currentIndex={currentIndex} />
      
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <Sakura />
      </div>

      <div className="relative z-20 w-full pt-1 sm:pt-2 lg:pt-4 pb-2 sm:pb-4 lg:pb-6">
        <Content />
      </div>

      <CarouselIndicators
        currentIndex={currentIndex}
        total={HERO_IMAGES.length}
        onSelect={setCurrentIndex}
      />
    </section>
  );
}