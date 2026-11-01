"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import { Sparkles, Truck, Gift, Flame, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const PROMO_CODES = [
  {
    code: "GLORIOUS10",
    discount: "10% OFF",
    minSpend: "No minimum spend",
    description: "Enjoy 10% off your first authentic Japanese beauty ritual order.",
    icon: Sparkles,
  },
  {
    code: "TOKYOFREE",
    discount: "FREE SHIPPING",
    minSpend: "On orders over ৳3,000",
    description: "Complimentary express delivery across Dhaka and all Bangladesh districts.",
    icon: Truck,
  },
  {
    code: "SAKURA500",
    discount: "৳500 OFF",
    minSpend: "On orders over ৳8,000",
    description: "Special seasonal discount on luxury Tokyo essence and serum collections.",
    icon: Gift,
  },
];

export function OffersPromoHeader() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-rose-500/10 via-cream/40 to-background py-10 sm:py-14">
      <div className="container-lux">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground font-medium">Offers & Discounts</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Flame className="w-3.5 h-3.5 fill-rose-500" />
            <span>Limited-Time Japanese Promotions</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Offers & Special Deals
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Explore authentic Tokyo skincare and beauty with exclusive promotional pricing,
            seasonal bundles, and active coupon codes. Every bottle is 100% guaranteed authentic.
          </p>
        </div>

        {/* Active Promo Codes Carousel / Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {PROMO_CODES.map((promo) => {
            const isCopied = copiedCode === promo.code;
            return (
              <div
                key={promo.code}
                className="group relative overflow-hidden rounded-xl border border-dashed border-primary/40 bg-card p-4 shadow-xs transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full">
                      {promo.discount}
                    </span>
                    <p className="mt-1 font-mono text-base font-bold text-foreground tracking-wider">
                      {promo.code}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyCode(promo.code)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer",
                      isCopied
                        ? "bg-emerald-600 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-muted-foreground leading-snug">
                  {promo.description}
                </p>
                <p className="mt-2 text-[10px] font-medium text-primary">{promo.minSpend}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

