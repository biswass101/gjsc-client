"use client";

import { ChevronRight, Lock, ShieldCheck } from "lucide-react";
import { Link } from "@/lib/navigation";

export function CheckoutHeader() {
  return (
    <div className="border-b border-border/50 bg-secondary/30">
      <div className="container-lux py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          {/* Progress breadcrumbs */}
          <nav aria-label="Checkout steps" className="flex items-center gap-2 font-medium">
            <Link to="/cart" className="hover:text-primary transition-colors">
              Shopping Bag
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <span className="text-primary font-semibold flex items-center gap-1.5">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                2
              </span>
              Shipping & Payment
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <span className="text-muted-foreground/50">Order Complete</span>
          </nav>

          {/* Trust badges */}
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <span className="flex items-center gap-1.5 text-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" />
              256-Bit SSL Encrypted
            </span>
            <span className="hidden md:inline text-muted-foreground/40">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              100% Genuine Japanese Formulas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

