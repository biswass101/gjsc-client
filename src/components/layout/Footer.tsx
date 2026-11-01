"use client";

import { Link } from "@/lib/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FooterTrustStrip } from "./footer/FooterTrustStrip";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterBottomStrip } from "./footer/FooterBottomStrip";
import { SHOP_LINKS, CONCERN_LINKS, CARE_LINKS } from "./footer/footerData";

export function Footer() {
  return (
    <footer className="mt-12 sm:mt-20 border-t border-border/80 bg-cream/70 text-foreground">
      {/* 1. Top Trust Pillars Strip */}
      <FooterTrustStrip />

      {/* 2. Newsletter / VIP Circle Section */}
      <FooterNewsletter />

      {/* 3. Main Navigation Mega-Columns */}
      <div className="py-8 sm:py-14">
        <div className="container-lux grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Contact Info */}
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
              Curating authentic Japanese fermented botanicals and dermatological skincare for
              radiant, healthy skin in Bangladesh.
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
                <a
                  href="mailto:hello@gloriousjapanskincare.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@gloriousjapanskincare.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Daily: 10:00 AM – 10:00 PM</span>
              </p>
            </div>
          </div>

          {/* Column 2: Skincare Categories */}
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

          {/* Column 3: Skin Concerns */}
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

          {/* Column 4: Customer Care & Info */}
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

      {/* 4. Payment Methods & Copyright */}
      <FooterBottomStrip />
    </footer>
  );
}
