"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Layout, GoToTop } from "@/components/layout";
import { ProductCard } from "@/features/products";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { PRODUCTS } from "@/lib/catalog";
import { useSearchParams } from "next/navigation";
import {
  ShopFilterSidebar,
  ShopFilterDrawer,
  ShopActiveFilters,
  type ShopFilterState,
  type ShopSortOption,
} from "@/features/shop";

const PER_PAGE = 12;

export function ShopClient() {
  const searchParams = useSearchParams();

  // Price bounds across full catalog
  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min: Math.max(0, min), max: Math.max(min + 1000, max) };
  }, []);

  // Compute facet item counts
  const availableCategories = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableBrands = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableConcerns = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      p.concerns?.forEach((c) => {
        counts.set(c, (counts.get(c) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableSkinTypes = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      p.skinTypes?.forEach((st) => {
        counts.set(st, (counts.get(st) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const availableBadges = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => {
      if (p.badge) {
        counts.set(p.badge, (counts.get(p.badge) ?? 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Initialize filters from URL parameters or defaults
  const [filters, setFilters] = useState<ShopFilterState>(() => {
    const paramCategory = searchParams?.get("category");
    const paramBrand = searchParams?.get("brand");
    const paramConcern = searchParams?.get("concern");
    const paramSkinType = searchParams?.get("skinType");
    const paramBadge = searchParams?.get("badge");
    const paramQ = searchParams?.get("q") ?? "";
    const paramOnSale = searchParams?.get("onSale") === "true";

    return {
      searchQuery: paramQ,
      selectedCategories: paramCategory ? [paramCategory] : [],
      selectedBrands: paramBrand ? [paramBrand] : [],
      selectedConcerns: paramConcern ? [paramConcern] : [],
      selectedSkinTypes: paramSkinType ? [paramSkinType] : [],
      selectedBadges: paramBadge ? [paramBadge] : [],
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: paramOnSale,
    };
  });

  // Re-sync if URL params change externally
  useEffect(() => {
    const paramCategory = searchParams?.get("category");
    const paramBrand = searchParams?.get("brand");
    const paramConcern = searchParams?.get("concern");
    const paramSkinType = searchParams?.get("skinType");
    const paramBadge = searchParams?.get("badge");
    const paramQ = searchParams?.get("q");
    const paramOnSale = searchParams?.get("onSale");

    if (
      paramCategory ||
      paramBrand ||
      paramConcern ||
      paramSkinType ||
      paramBadge ||
      paramQ !== null ||
      paramOnSale !== null
    ) {
      setFilters((prev) => ({
        ...prev,
        ...(paramCategory ? { selectedCategories: [paramCategory] } : {}),
        ...(paramBrand ? { selectedBrands: [paramBrand] } : {}),
        ...(paramConcern ? { selectedConcerns: [paramConcern] } : {}),
        ...(paramSkinType ? { selectedSkinTypes: [paramSkinType] } : {}),
        ...(paramBadge ? { selectedBadges: [paramBadge] } : {}),
        ...(paramQ !== null ? { searchQuery: paramQ ?? "" } : {}),
        ...(paramOnSale !== null ? { onSaleOnly: paramOnSale === "true" } : {}),
      }));
    }
  }, [searchParams]);

  const [sortBy, setSortBy] = useState<ShopSortOption>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  // Filter change handlers
  const handleFilterChange = (updates: Partial<ShopFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategories: [],
      selectedBrands: [],
      selectedConcerns: [],
      selectedSkinTypes: [],
      selectedBadges: [],
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
    });
    setPage(1);
  };

  // Active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    count += filters.selectedCategories.length;
    count += filters.selectedBrands.length;
    count += filters.selectedConcerns.length;
    count += filters.selectedSkinTypes.length;
    count += filters.selectedBadges.length;
    if (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters, priceBounds]);

  // Filter products pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Keyword search (checks name, brand, category, ingredients, concerns, short)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesShort = product.short?.toLowerCase().includes(q) ?? false;
        const matchesIngredients =
          product.ingredients?.some((ing) => ing.toLowerCase().includes(q)) ?? false;
        const matchesConcerns =
          product.concerns?.some((c) => c.toLowerCase().includes(q)) ?? false;

        if (
          !matchesName &&
          !matchesBrand &&
          !matchesCategory &&
          !matchesShort &&
          !matchesIngredients &&
          !matchesConcerns
        ) {
          return false;
        }
      }

      // 2. Categories
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // 3. Brands
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 4. Concerns
      if (
        filters.selectedConcerns.length > 0 &&
        !product.concerns?.some((c) => filters.selectedConcerns.includes(c))
      ) {
        return false;
      }

      // 5. Skin Types
      if (
        filters.selectedSkinTypes.length > 0 &&
        !product.skinTypes?.some((st) => filters.selectedSkinTypes.includes(st))
      ) {
        return false;
      }

      // 6. Badges
      if (
        filters.selectedBadges.length > 0 &&
        (!product.badge || !filters.selectedBadges.includes(product.badge))
      ) {
        return false;
      }

      // 7. Price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 8. Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // 9. In Stock
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      // 10. On Sale
      if (
        filters.onSaleOnly &&
        (!product.compareAt || product.compareAt <= product.price)
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sorting pipeline
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "popular":
        return list.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
      case "bestselling":
        return list.sort((a, b) => b.reviews - a.reviews);
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => Number(b.id) - Number(a.id));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * PER_PAGE;
  const pagedProducts = sortedProducts.slice(startIdx, startIdx + PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  // Pagination visible page numbers (around current)
  const pageNumbers = useMemo(() => {
    const nums: number[] = [];
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, safePage + 2);
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  }, [safePage, totalPages]);

  // Header Title
  const headerTitle = useMemo(() => {
    if (filters.selectedBadges.length === 1) {
      return `${filters.selectedBadges[0]} Formulations`;
    }
    if (filters.selectedCategories.length === 1) {
      return `${filters.selectedCategories[0]} Collection`;
    }
    if (filters.selectedBrands.length === 1) {
      return `${filters.selectedBrands[0]} Apothecary`;
    }
    return "All Japanese Beauty Formulations";
  }, [filters.selectedBadges, filters.selectedCategories, filters.selectedBrands]);

  const filterProps = {
    filters,
    onFilterChange: handleFilterChange,
    onResetFilters: handleResetFilters,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    availableBadges,
    priceBounds,
    activeFilterCount,
    filteredCount: sortedProducts.length,
  };

  return (
    <Layout>
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/10 via-cream/40 to-background py-8 sm:py-12">
        <div className="container-lux">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-3">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground font-medium">Shop</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>100% Authentic Tokyo Imports</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {headerTitle}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Slow-fermented rice essences, camellia barrier elixirs, and dermatologically
                verified J-Beauty formulations delivered across Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Catalog Body with Filter Sidebar and Active Filter Toolbar */}
      <div className="container-lux py-8 sm:py-12">
        <div className="flex items-start gap-8">
          {/* Desktop Filter Sidebar */}
          <ShopFilterSidebar {...filterProps} />

          {/* Main Product Catalog Area */}
          <main className="flex-1 min-w-0">
            {/* Active Filters Toolbar & Drawer Trigger */}
            <ShopActiveFilters
              totalResults={PRODUCTS.length}
              filteredCount={sortedProducts.length}
              startIdx={startIdx}
              perPage={PER_PAGE}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              view={view}
              onViewChange={setView}
              priceBounds={priceBounds}
              drawerTriggerSlot={<ShopFilterDrawer {...filterProps} />}
            />

            {/* Results Grid / List */}
            {sortedProducts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-10 sm:p-16 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  No matching formulas found
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                  We could not find any products matching your specific combination of filters.
                  Try clearing a few filters or broadening your search.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="mt-5 rounded-full px-6 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "space-y-4 sm:space-y-6"
                }
              >
                {pagedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {/* Previous page button */}
                  <button
                    onClick={() => handlePageChange(Math.max(1, safePage - 1))}
                    disabled={safePage === 1}
                    className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary disabled:opacity-30 cursor-pointer shadow-2xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* First page link if far */}
                  {pageNumbers[0]! > 1 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="grid h-9 min-w-9 sm:h-10 sm:min-w-10 place-items-center rounded-full border border-border bg-card px-2 text-xs sm:text-sm transition-colors hover:bg-secondary cursor-pointer shadow-2xs"
                      >
                        1
                      </button>
                      {pageNumbers[0]! > 2 && (
                        <span className="text-muted-foreground px-1">…</span>
                      )}
                    </>
                  )}

                  {/* Middle page numbers */}
                  {pageNumbers.map((n) => (
                    <button
                      key={n}
                      onClick={() => handlePageChange(n)}
                      className={`grid h-9 min-w-9 sm:h-10 sm:min-w-10 place-items-center rounded-full border px-2 text-xs sm:text-sm transition-colors font-medium cursor-pointer shadow-2xs ${
                        n === safePage
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card hover:bg-secondary"
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                  {/* Last page link if far */}
                  {pageNumbers[pageNumbers.length - 1]! < totalPages && (
                    <>
                      {pageNumbers[pageNumbers.length - 1]! < totalPages - 1 && (
                        <span className="text-muted-foreground px-1">…</span>
                      )}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="grid h-9 min-w-9 sm:h-10 sm:min-w-10 place-items-center rounded-full border border-border bg-card px-2 text-xs sm:text-sm transition-colors hover:bg-secondary cursor-pointer shadow-2xs"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* Next page button */}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, safePage + 1))}
                    disabled={safePage === totalPages}
                    className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary disabled:opacity-30 cursor-pointer shadow-2xs"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-center text-xs text-muted-foreground font-medium">
                  Page {safePage} of {totalPages}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <GoToTop />
    </Layout>
  );
}
