"use client";

import React from "react";
import { Sparkles, ArrowRight, Tag, ShoppingBag } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

export function FlashSaleEmptyState() {
  return (
    <div className="container-lux py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-rose-500/10 text-rose-600 mx-auto border border-rose-500/20">
        <Sparkles className="h-8 w-8 text-rose-500" />
      </div>

      <div className="space-y-2">
        <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-500/20">
          Drop Concluded
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Next Tokyo Flash Drop Coming Soon
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
          All limited-quantity quotas for this flash festival have been claimed. Our Ginza and Tokyo procurement team is curating the next batch of authentic Japanese skincare drops.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to="/shop">
          <Button className="w-full sm:w-auto rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold px-6 gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Explore Skincare Catalog</span>
          </Button>
        </Link>

        <Link to="/offers">
          <Button variant="outline" className="w-full sm:w-auto rounded-full text-xs font-semibold px-6 gap-2 border-border/80">
            <Tag className="h-4 w-4" />
            <span>View Ongoing Offers & Vouchers</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

