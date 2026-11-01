"use client";

import { Clock, Gift, Sparkles, Star } from "lucide-react";

export function AuthBrandingPanel() {
  return (
    <div className="lg:col-span-5 bg-gradient-to-br from-cream via-secondary/20 to-cream p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/60">
      <div className="space-y-6">
        {/* Brand Logo & Kanji Stamp */}
        <div className="flex items-center gap-3">
          <img
            src="/glorious-japan-skin-care-logo.jpeg"
            alt="Glorious Japan"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-contain border border-border/70 shadow-xs"
          />
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground block">
              Glorious Japan
            </span>
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-serif">
              東京 · Authentic J-Beauty
            </span>
          </div>
        </div>

        <div>
          <span className="eyebrow text-primary">Member Experience</span>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Elevate Your Daily Skincare Ritual
          </h2>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Join thousands of skincare connoisseurs across Bangladesh receiving authentic fermented
            Japanese formulations direct from Tokyo.
          </p>
        </div>

        {/* VIP Member Perks */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-start gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">500 Welcome Ritual Points</h4>
              <p className="text-[11px] text-muted-foreground">
                Instantly receive ৳200 voucher credit towards your first purchase.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
              <Gift className="h-3.5 w-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Complimentary Tokyo Samples</h4>
              <p className="text-[11px] text-muted-foreground">
                Deluxe essence and sunscreen minis included with every member parcel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
              <Clock className="h-3.5 w-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Priority 24h VIP Dispatch</h4>
              <p className="text-[11px] text-muted-foreground">
                Express Dhaka delivery and instant order tracking updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Testimonial Card */}
      <div className="mt-8 rounded-lg border border-border/70 bg-background/80 p-4 backdrop-blur-xs">
        <div className="flex items-center gap-1 text-amber-500 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground italic leading-relaxed">
          “The only authentic source in Dhaka where I can trust the Tokyo batch codes. My skin
          barrier has never been calmer.”
        </p>
        <p className="mt-2 text-[10px] font-bold text-foreground uppercase tracking-wider">
          — Mehjabin T. · Verified VIP Member
        </p>
      </div>
    </div>
  );
}
