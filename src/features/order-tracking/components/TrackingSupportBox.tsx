"use client";

import { MessageSquare, Phone, ShieldCheck } from "lucide-react";

export interface TrackingSupportBoxProps {
  whatsappUrl: string;
}

export function TrackingSupportBox({ whatsappUrl }: TrackingSupportBoxProps) {
  return (
    <>
      {/* Priority WhatsApp Support Box */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-cream via-background to-cream p-6 shadow-xs space-y-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366] shrink-0">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Need Help With Delivery?</h4>
            <p className="text-[11px] text-muted-foreground">
              Live representative available 9 AM – 11 PM
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Have questions about timing, address changes, or rider coordination? Contact our Dhaka
          dispatch team on WhatsApp.
        </p>

        <div className="space-y-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#20ba59] transition-all shadow-xs"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Chat on WhatsApp
          </a>

          <a
            href="tel:+8801700000000"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-all"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            Hotline: +880 1700-000000
          </a>
        </div>
      </div>

      {/* Authenticity Guarantee Callout */}
      <div className="rounded-xl border border-border/70 bg-card p-4 text-xs text-muted-foreground flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">Authentic Tokyo Seal</p>
          <p className="text-[11px] leading-relaxed mt-0.5">
            Your package includes a tamper-evident holographic seal with Japanese batch
            verification. Check seal integrity upon delivery.
          </p>
        </div>
      </div>
    </>
  );
}
