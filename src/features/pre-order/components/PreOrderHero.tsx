"use client";

import { Link } from "@/lib/navigation";
import {
  Globe,
  Plane,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Package,
  Calendar,
} from "lucide-react";

export const PRE_ORDER_STEPS = [
  {
    step: "01",
    title: "Reserve Your Item",
    desc: "Lock in rare, limited-edition Japanese cosmetics before Tokyo domestic retail sellouts.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Tokyo Direct Sourcing",
    desc: "Freshly manufactured batches collected from authorized flagship laboratories in Ginza and Osaka.",
    icon: Package,
  },
  {
    step: "03",
    title: "Express Air-Freight",
    desc: "Temperature-controlled air transit directly to Dhaka to preserve active ingredient potency.",
    icon: Plane,
  },
  {
    step: "04",
    title: "Delivered in 10–14 Days",
    desc: "Safe doorstep delivery across Bangladesh with zero customs delays or hidden fees.",
    icon: CheckCircle2,
  },
];

export function PreOrderHero() {
  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/10 via-cream/40 to-background py-10 sm:py-16">
      <div className="container-lux">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground font-medium">Pre-Order from Japan</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>Direct Tokyo Vault · 予約注文</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Pre-Order Direct From Japan
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Reserve rare, ultra-fresh Japanese skincare and luxury prestige editions directly from
            official Tokyo brand houses. Freshly bottled, 100% authentic, and delivered directly to
            your doorstep in Bangladesh in 10–14 days.
          </p>
        </div>

        {/* 2. Four-Step Pre-Order Process */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRE_ORDER_STEPS.map((item) => (
            <div
              key={item.step}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary tracking-wider">
                  STEP {item.step}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
              </div>

              <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Guarantees */}
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>100% Guaranteed Fresh Batches & Verification Codes</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Air-Courier Dispatch in 10–14 Business Days</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-rose-500" />
            <span>Weekly Flight Sourcing from Haneda & Narita</span>
          </div>
        </div>
      </div>
    </div>
  );
}

