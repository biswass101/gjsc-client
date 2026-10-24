"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { PRODUCTS, formatBDT } from "@/lib/catalog";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Plane,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Package,
  Calendar,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRE_ORDER_STEPS = [
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

export function PreOrderPageClient() {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Select all pre-order products + premium prestige Japanese imports
  const preOrderProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        p.type === "pre-order-japan" ||
        p.price >= 8000 ||
        p.brand === "SK-II" ||
        p.brand === "Shiseido" ||
        p.badge === "Best Seller"
    );
  }, []);

  // Unique brands
  const brands = useMemo(() => {
    const list = new Set<string>();
    preOrderProducts.forEach((p) => list.add(p.brand));
    return ["All", ...Array.from(list)];
  }, [preOrderProducts]);

  // Unique categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    preOrderProducts.forEach((p) => list.add(p.category));
    return ["All", ...Array.from(list)];
  }, [preOrderProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return preOrderProducts.filter((product) => {
      if (selectedBrand !== "All" && product.brand !== selectedBrand) return false;
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      return true;
    });
  }, [preOrderProducts, selectedBrand, selectedCategory]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "popular":
      default:
        return list.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredProducts, sortBy]);

  return (
    <Layout>
      {/* 1. Pre-Order Hero */}
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
              Reserve rare, ultra-fresh Japanese skincare and luxury prestige editions
              directly from official Tokyo brand houses. Freshly bottled, 100% authentic,
              and delivered directly to your doorstep in Bangladesh in 10–14 days.
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
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
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

      {/* 3. Toolbar & Filters */}
      <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-2xs py-3">
        <div className="container-lux">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Brand Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase mr-1 hidden sm:inline">
                Brand:
              </span>
              {brands.map((b) => {
                const active = selectedBrand === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                      active
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    {b}
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
                <option value="popular">Most In-Demand</option>
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

          {/* Category Filter */}
          {categories.length > 2 && (
            <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase mr-1">
                Category:
              </span>
              {categories.map((cat) => {
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

      {/* 4. Pre-Order Catalog */}
      <main className="container-lux py-10 sm:py-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span>{" "}
            Japanese pre-order formulations available for reservation
          </p>

          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            Next Tokyo Shipment Departs in 3 Days
          </span>
        </div>

        <div
          className={cn(
            "grid gap-3 sm:gap-4 lg:gap-5",
            view === "grid"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1 max-w-2xl"
          )}
        >
          {sortedProducts.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>

      <GoToTop />
    </Layout>
  );
}

