import { Instagram, Facebook, Youtube } from "lucide-react";

export function FooterBottomStrip() {
  return (
    <>
      {/* Payment Methods & Social */}
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

      {/* Copyright */}
      <div className="border-t border-border/60 py-3.5 bg-background/60">
        <div className="container-lux flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-muted-foreground text-center sm:text-left">
          <p>© 2026 Glorious Japan Skin Care. All rights reserved.</p>
          <p className="text-[9px] sm:text-[10px]">
            Direct Tokyo Import · Guaranteed 100% Authentic Japanese Formulations
          </p>
        </div>
      </div>
    </>
  );
}

