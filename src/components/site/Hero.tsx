import { useState, useEffect } from "react";
import { Link } from "@/lib/navigation";
import { PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sakura } from "./Sakura";

// import hero1 from "@/assets/hero/hero-with-japanese-girl.png";
import hero1 from "@/assets/hero/sakura-spa-skincare-trio.png";
import hero2 from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import hero3 from "@/assets/hero/japanese-inspired-foaming-skincare-ritual.png";
// import hero4 from "@/assets/hero/hero-sakura.png";

const HERO_IMAGES = [hero1, hero2, hero3];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[35vh] sm:min-h-[50vh] lg:min-h-[90vh] items-center overflow-hidden bg-background">
      {/* Background Slider */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-2000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          {/* We apply a slow scale and slide animation to the active image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-linear"
            style={{
              backgroundImage: `url(${img.src})`,
              transform: index === currentIndex ? "scale(1.1) translateX(-2%)" : "scale(1.0) translateX(0)",
            }}
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/60 to-transparent" />
        </div>
      ))}

      {/* Sakura Falling Animation */}
      <Sakura />

      {/* Content */}
      <div className="container-lux relative z-10 grid items-center gap-2 sm:gap-6 lg:gap-12 py-3 sm:py-8 lg:py-20 lg:grid-cols-2">
        <div className="animate-rise">
          <p className="eyebrow inline-block rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 sm:px-4 sm:py-1.5 backdrop-blur-md text-[8px] sm:text-xs">
            Est. 2025 · Made in Japan
          </p>
          <h1 className="mt-1.5 sm:mt-4 lg:mt-6 font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-7xl leading-[1.05]">
            Stay Glorious,
            <br />
            <span className="gold-text bg-clip-text text-transparent">Shine with Confidence</span>
          </h1>
          <p className="mt-1.5 sm:mt-4 lg:mt-6 max-w-lg text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed text-foreground/80 drop-shadow-sm">
            Slow-fermented Japanese formulas — sakura, rice ferment and camellia — for skin that looks quietly,
            unmistakably radiant.
          </p>
          <div className="mt-3 sm:mt-6 lg:mt-10 flex flex-wrap gap-1.5 sm:gap-3">
            <Button asChild className="rounded-full px-3 sm:px-8 lg:px-9 py-1 sm:py-4 lg:py-6 text-[8px] sm:text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-xl transition-transform hover:scale-105 active:scale-95">
              <Link to="/shop">Shop</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-primary/20 bg-background/50 px-3 sm:px-8 lg:px-9 py-1 sm:py-4 lg:py-6 text-[8px] sm:text-[10px] lg:text-xs uppercase tracking-[0.2em] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95">
              <Link to="/about">Story</Link>
            </Button>
          </div>

          <div className="mt-2.5 sm:mt-8 lg:mt-12 flex flex-wrap gap-x-1.5 sm:gap-x-6 lg:gap-x-8 gap-y-1 sm:gap-y-3 lg:gap-y-4 rounded-lg sm:rounded-2xl border border-border/50 bg-background/40 p-1.5 sm:p-4 lg:p-5 text-[7px] sm:text-[9px] lg:text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-md">
            <span className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
              <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <ShieldCheck className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-primary" strokeWidth={1.5} />
              </span>
              <span className="hidden sm:inline">100% Authentic</span>
              <span className="inline sm:hidden">Authentic</span>
            </span>
            <span className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
              <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <Truck className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-primary" strokeWidth={1.5} />
              </span>
              <span className="hidden sm:inline">Free delivery</span>
              <span className="inline sm:hidden">Free</span>
            </span>
            <span className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
              <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <PackageCheck className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-primary" strokeWidth={1.5} />
              </span>
              <span className="hidden sm:inline">COD & bKash</span>
              <span className="inline sm:hidden">Payment</span>
            </span>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="hidden lg:flex flex-col justify-end items-end h-full absolute right-8 bottom-12 space-y-3">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "w-10 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
