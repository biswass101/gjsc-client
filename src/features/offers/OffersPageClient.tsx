"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { PRODUCTS, formatBDT } from "@/lib/catalog";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import {
  Tag,
  Sparkles,
  Percent,
  Truck,
  Copy,
  Check,
  Flame,
  ArrowRight,
  ShieldCheck,
  Grid,
  List,
  Gift,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PROMO_CODES = [
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

export function OffersPageClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDealType, setSelectedDealType] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("discount");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  // Extract all discounted products (compareAt > price or badge === "Flash Sale")
  const offerProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => (p.compareAt && p.compareAt > p.price) || p.badge === "Flash Sale"
    );
  }, []);

  // Available categories with discounts
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    offerProducts.forEach((p) => cats.add(p.category));
    return ["All", ...Array.from(cats)];
  }, [offerProducts]);

  // Filter products by selected category and deal type
  const filteredProducts = useMemo(() => {
    return offerProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Deal type filter
      if (selectedDealType === "flash" && product.badge !== "Flash Sale") {
        return false;
      }
      if (selectedDealType === "under2000" && product.price >= 2000) {
        return false;
      }
      if (selectedDealType === "under4000" && product.price >= 4000) {
        return false;
      }
      if (selectedDealType === "bigsavings") {
        const off = product.compareAt ? product.compareAt - product.price : 0;
        if (off < 500) return false;
      }

      return true;
    });
  }, [offerProducts, selectedCategory, selectedDealType]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "discount":
      default:
        return list.sort((a, b) => {
          const discountA = a.compareAt ? (a.compareAt - a.price) / a.compareAt : 0;
          const discountB = b.compareAt ? (b.compareAt - b.price) / b.compareAt : 0;
          return discountB - discountA;
        });
    }
  }, [filteredProducts, sortBy]);

  return (
    <Layout>
      {/* 1. Page Header */}
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

          {/* 2. Active Promo Codes Carousel / Grid */}
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
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
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
                  <p className="mt-2 text-[10px] font-medium text-primary">
                    {promo.minSpend}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Deal Type Filter Pills */}
      <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-2xs py-3">
        <div className="container-lux">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
              {[
                { id: "all", label: "All Deals", count: offerProducts.length },
                { id: "flash", label: "⚡ Flash Sales" },
                { id: "bigsavings", label: "🔥 Save ৳500+" },
                { id: "under2000", label: "Under ৳2,000" },
                { id: "under4000", label: "Under ৳4,000" },
              ].map((tab) => {
                const active = selectedDealType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedDealType(tab.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                      active
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    {tab.label}
                    {tab.count !== undefined && ` (${tab.count})`}
                  </button>
                );
              })}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-8 rounded-full border border-border bg-background px-3 text-xs font-medium cursor-pointer"
              >
                <option value="discount">Biggest Discount</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors cursor-pointer",
                    view === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={cn(
                    "p-1.5 rounded-md transition-colors cursor-pointer",
                    view === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Subcategories Scroll */}
          {availableCategories.length > 2 && (
            <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase mr-1">
                Category:
              </span>
              {availableCategories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer",
                      active
                        ? "bg-primary/15 text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Products Catalog */}
      <main className="container-lux py-10 sm:py-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span>{" "}
            promotional items
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <span>View All Regular Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border p-8">
            <Percent className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-4 font-display text-xl font-semibold">No Deals In This Filter</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try selecting another category or clearing your deal filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDealType("all");
              }}
              className="mt-4 rounded-full text-xs"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-3 sm:gap-4 lg:gap-5",
              view === "grid"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                : "grid-cols-1 max-w-2xl"
            )}
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <GoToTop />
    </Layout>
  );
}
