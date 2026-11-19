"use client";

import { ShieldCheck, Truck, Flame } from "lucide-react";
import { Link } from "@/lib/navigation";
import { slugify } from "@/lib/catalog";
import type { Product } from "@/types";

interface ProductBreadcrumbProps {
  product: Product;
  isFlashSale?: boolean | undefined;
}

export function ProductBreadcrumb({ product, isFlashSale }: ProductBreadcrumbProps) {
  return (
    <div className="border-b border-border/40 bg-secondary/30">
      <div className="container-lux flex flex-wrap items-center justify-between gap-3 py-3 text-xs text-muted-foreground">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <Link
            to={`/category/${slugify(product.category)}`}
            className="hover:text-primary transition-colors font-medium text-foreground/80"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground/60">/</span>
          <span className="truncate max-w-[200px] sm:max-w-xs text-foreground font-medium">
            {product.name}
          </span>
        </nav>

        <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium tracking-wide">
          {isFlashSale && (
            <Link
              to="/flash-sale"
              className="inline-flex items-center gap-1.5 rounded-full bg-red-600 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-xs animate-pulse"
            >
              <Flame className="h-3 w-3 fill-white" />
              <span>⚡ Active Flash Sale</span>
            </Link>
          )}
          <span className="flex items-center gap-1.5 text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% Genuine Tokyo Import
          </span>
          <span className="text-muted-foreground/40">|</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Truck className="h-3.5 w-3.5" />
            Direct from Tokyo & Dhaka Hub
          </span>
        </div>
      </div>
    </div>
  );
}

