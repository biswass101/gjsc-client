"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Facebook,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TRUST_PERKS = [
  {
    icon: Truck,
    title: "Free Nationwide Delivery",
    desc: "Complimentary shipping on orders above ৳5,000 across all 64 districts.",
  },
  {
    icon: ShieldCheck,
    title: "100% Tokyo Authentic",
    desc: "Imported directly from certified Japanese laboratories with batch seals.",
  },
  {
    icon: CheckCircle2,
    title: "Cash On Delivery (COD)",
    desc: "Safe doorstep inspection and payment anywhere in Bangladesh.",
  },
  {
    icon: Headphones,
    title: "Skincare Advisory",
    desc: "Personalized routine consultation via WhatsApp daily from 10 AM – 10 PM.",
  },
];

const SHOP_LINKS = [
  { label: "Cleansers & Face Wash", to: "/shop", search: { category: "Cleanser" } },
  { label: "Hydrating Essences & Toners", to: "/shop", search: { category: "Essence" } },
  { label: "Ferment Active Serums", to: "/shop", search: { category: "Serum" } },
  { label: "Barrier Moisture Creams", to: "/shop", search: { category: "Moisturizer" } },
  { label: "Japanese Sunscreens SPF50+", to: "/shop", search: { category: "Sunscreen" } },
  { label: "Curated Routine Bundles", to: "/shop", search: { category: "Gift Sets" } },
];

const CONCERN_LINKS = [
  { label: "Glass Skin & Radiance", to: "/shop", search: { concern: "Brightening" } },
  { label: "Acne & Pore Clarifying", to: "/shop", search: { concern: "Acne" } },
  { label: "Deep Hyaluronic Hydration", to: "/shop", search: { concern: "Hydration" } },
  { label: "Sensitive & Barrier Repair", to: "/shop", search: { skinType: "Sensitive" } },
  { label: "Anti-Aging & Firming", to: "/shop", search: { concern: "Anti Aging" } },
  { label: "Pre-Order from Tokyo", to: "/shop", search: { type: "pre-order-japan" } },
];

const CARE_LINKS = [
  { label: "Track Your Order", to: "/track" },
  { label: "Frequently Asked Questions", to: "/faq" },
  { label: "Authenticity Guarantee", to: "/about" },
  { label: "Contact Us & Advisory", to: "/contact" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmail("");
    toast.success("Welcome to the Glorious Japan Beauty Circle!", {
      description: "Check your inbox for your 10% welcome privilege code.",
    });
  };

  return (
    <footer className="mt-12 sm:mt-20 border-t border-border/80 bg-cream/70 text-foreground">
      {/* 1. Top Trust Pillars Strip */}
      <div className="border-b border-border/60 bg-cream/90 py-6 sm:py-9">
        <div className="container-lux">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_PERKS.map((perk) => (
              <div key={perk.title} className="flex items-start gap-2.5 sm:gap-3.5">
                <div className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <perk.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-display text-xs sm:text-sm font-bold tracking-tight text-foreground">
                    {perk.title}
                  </h4>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Newsletter / VIP Circle Section */}
      <div className="border-b border-border/60 py-8 sm:py-12 bg-background/50">
        <div className="container-lux">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-8 rounded-2xl sm:rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-cream to-primary/5 p-5 sm:p-8 lg:p-10 shadow-xs">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-primary text-[9px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>MEMBERSHIP PRIVILEGE</span>
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                Join the Glorious Japan Circle
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Receive private ritual guides, early access to Tokyo pre-orders, and enjoy <strong className="text-foreground font-semibold">10% off</strong> your first order.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col sm:flex-row gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="h-10 sm:h-11 rounded-xl bg-background px-3.5 text-xs sm:text-sm shadow-xs border-border/80 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                className="h-10 sm:h-11 w-full sm:w-auto rounded-xl bg-primary px-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-xs transition-all hover:bg-primary/90 shrink-0 active:scale-98"
              >
                Join Circle
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Mega-Columns */}
      <div className="py-8 sm:py-14">
        <div className="container-lux grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <img
                src="/glorious-japan-skin-care-logo.jpeg"
                alt="Glorious Japan Skin Care"
                width={56}
                height={56}
                loading="lazy"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover shadow-sm border border-primary/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-base sm:text-lg font-bold tracking-tight block">
                    Glorious Japan
                  </span>
                  <span className="rounded-full bg-primary/15 border border-primary/30 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-primary">
                    Beta
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-primary uppercase">
                  栄光日本 · 美の儀式
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Curating authentic Japanese fermented botanicals and dermatological skincare for radiant, healthy skin in Bangladesh.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 pt-1 text-[11px] sm:text-xs text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>House 14, Road 11, Block D, Banani, Dhaka 1213</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-primary transition-colors">
                  +880 1700 000000 (Hotline & WhatsApp)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <a href="mailto:hello@gloriousjapanskincare.com" className="hover:text-primary transition-colors">
                  hello@gloriousjapanskincare.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Daily: 10:00 AM – 10:00 PM</span>
              </p>
            </div>
          </div>

          {/* Column 2: Skincare Categories (3 cols) */}
          <div className="lg:col-span-3">
            <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground pb-1.5 border-b border-border/60">
              Japanese Skincare
            </p>
            <ul className="mt-3 grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs">
              {SHOP_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to as "/shop"}
                    search={item.search}
                    className="text-muted-foreground transition-colors hover:text-primary inline-block text-[11px] sm:text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Skin Concerns (3 cols) */}
          <div className="lg:col-span-3">
            <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground pb-1.5 border-b border-border/60">
              Target Solutions
            </p>
            <ul className="mt-3 grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs">
              {CONCERN_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to as "/shop"}
                    search={item.search}
                    className="text-muted-foreground transition-colors hover:text-primary inline-block text-[11px] sm:text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Care & Info (2 cols) */}
          <div className="lg:col-span-2">
            <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground pb-1.5 border-b border-border/60">
              Customer Care
            </p>
            <ul className="mt-3 grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs">
              {CARE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to as "/shop"}
                    className="text-muted-foreground transition-colors hover:text-primary inline-block text-[11px] sm:text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Payment Methods & Trust Badges Strip */}
      <div className="border-t border-border/60 py-4 sm:py-5 bg-background/40">
        <div className="container-lux flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
            <span className="font-semibold text-foreground uppercase tracking-wider mr-1">
              Accepted:
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-0.5 font-medium">
              COD
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-0.5 font-medium text-pink-600 font-semibold">
              bKash
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-0.5 font-medium text-orange-600 font-semibold">
              Nagad
            </span>
            <span className="rounded-md border border-border bg-card px-2 py-0.5 font-medium">
              Visa & Mastercard
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. Copyright & Legal Disclaimer */}
      <div className="border-t border-border/60 py-3.5 bg-background/60">
        <div className="container-lux flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-muted-foreground text-center sm:text-left">
          <p>© 2026 Glorious Japan Skin Care. All rights reserved.</p>
          <p className="text-[9px] sm:text-[10px]">
            Direct Tokyo Import · Guaranteed 100% Authentic Japanese Formulations
          </p>
        </div>
      </div>
    </footer>
  );
}
