"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRANDS, CATEGORIES, CONCERNS, PRODUCTS, SKIN_TYPES } from "@/lib/catalog";
import { useSearchParams } from "next/navigation";

const PER_PAGE = 12;

type ShopSearch = {
  category?: string | undefined;
  skinType?: string | undefined;
  concern?: string | undefined;
  badge?: string | undefined;
  type?: string | undefined;
};

const SORTS = [
  { value: "popular", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "best", label: "Best Sellers" },
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ShopClient() {
  const searchParams = useSearchParams();
  const search: ShopSearch = {
    category: searchParams.get("category") ?? undefined,
    skinType: searchParams.get("skinType") ?? undefined,
    concern: searchParams.get("concern") ?? undefined,
    badge: searchParams.get("badge") ?? undefined,
    type: searchParams.get("type") ?? undefined,
  };
  const [cats, setCats] = useState<string[]>(search.category ? [search.category] : []);
  const [types, setTypes] = useState<string[]>(search.skinType ? [search.skinType] : []);
  const [concerns, setConcerns] = useState<string[]>(search.concern ? [search.concern] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(16000);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [cats, types, concerns, brands, maxPrice, inStock, onSale, sort, search.badge, search.type]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const results = useMemo(() => {
    let out = PRODUCTS.filter((p) => {
      if (search.badge && p.badge !== search.badge) return false;
      if (search.type && p.type !== search.type) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (types.length && !p.skinTypes.some((t) => types.includes(t))) return false;
      if (concerns.length && !p.concerns.some((c) => concerns.includes(c))) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (inStock && p.stock === 0) return false;
      if (onSale && !p.compareAt) return false;
      return true;
    });
    out = [...out].sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      if (sort === "best") return b.reviews - a.reviews;
      if (sort === "newest") return Number(b.id) - Number(a.id);
      if (sort === "rating") return b.rating - a.rating;
      return b.rating - a.rating;
    });
    return out;
  }, [cats, types, concerns, brands, maxPrice, inStock, onSale, sort, search.badge, search.type]);

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * PER_PAGE;
  const paged = results.slice(startIdx, startIdx + PER_PAGE);

  const clearAll = () => {
    setCats([]); setTypes([]); setConcerns([]); setBrands([]);
    setMaxPrice(16000); setInStock(false); setOnSale(false);
  };

  const FilterGroup = ({ title, items, list, set }: { title: string; items: readonly string[]; list: string[]; set: (v: string[]) => void }) => (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-4 space-y-2.5">
        {items.map((i) => (
          <label key={i} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <Checkbox checked={list.includes(i)} onCheckedChange={() => toggle(list, set, i)} />
            {i}
          </label>
        ))}
      </div>
    </div>
  );

  const Filters = () => (
    <div className="space-y-8">
      <FilterGroup title="Category" items={CATEGORIES} list={cats} set={setCats} />
      <FilterGroup title="Skin Type" items={SKIN_TYPES} list={types} set={setTypes} />
      <FilterGroup title="Concern" items={CONCERNS} list={concerns} set={setConcerns} />
      <FilterGroup title="Brand" items={BRANDS} list={brands} set={setBrands} />
      <div>
        <p className="eyebrow">Max Price</p>
        <Slider className="mt-5" value={[maxPrice]} min={500} max={16000} step={100} onValueChange={(v) => setMaxPrice(v[0] ?? 16000)} />
        <p className="mt-3 text-sm text-muted-foreground">Up to ৳{maxPrice.toLocaleString()}</p>
      </div>
      <div className="space-y-2.5">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
          <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(Boolean(v))} /> In stock only
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
          <Checkbox checked={onSale} onCheckedChange={(v) => setOnSale(Boolean(v))} /> Discounted
        </label>
      </div>
      <Button variant="ghost" onClick={clearAll} className="w-full rounded-full text-xs uppercase tracking-[0.18em]">
        <X className="mr-2 h-3.5 w-3.5" /> Clear filters
      </Button>
    </div>
  );

  // Pagination page numbers to show (show up to 5 around current page)
  const pageNumbers = (() => {
    const nums: number[] = [];
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, safePage + 2);
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  })();

  const headerTitle = search.badge ?? search.category ?? "All Products";

  return (
    <Layout>
      <div className="border-b border-border bg-cream py-12">
        <div className="container-lux">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a> <span className="mx-2">/</span> Shop
          </nav>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{headerTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{results.length} product{results.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="container-lux grid gap-10 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <Filters />
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Sheet>
              <SheetTrigger className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.18em] lg:hidden">
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filters
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto bg-background">
                <SheetTitle className="font-display text-2xl font-normal">Filters</SheetTitle>
                <div className="mt-6"><Filters /></div>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-3">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-52 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SORTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="hidden rounded-full border border-border p-1 sm:flex">
                <button aria-label="Grid view" onClick={() => setView("grid")} className={`grid h-8 w-8 place-items-center rounded-full ${view === "grid" ? "bg-secondary" : ""}`}>
                  <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button aria-label="List view" onClick={() => setView("list")} className={`grid h-8 w-8 place-items-center rounded-full ${view === "list" ? "bg-secondary" : ""}`}>
                  <List className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Showing count */}
          {results.length > 0 && (
            <p className="mb-5 text-xs text-muted-foreground">
              Showing {startIdx + 1}–{Math.min(startIdx + PER_PAGE, results.length)} of {results.length} products
            </p>
          )}

          {/* Results */}
          {results.length === 0 ? (
            <div className="surface-card flex flex-col items-center gap-4 py-24 text-center">
              <p className="font-display text-3xl">Nothing matches yet</p>
              <p className="text-sm text-muted-foreground">Try relaxing a filter or two.</p>
              <Button onClick={clearAll} className="rounded-full px-8">Clear filters</Button>
            </div>
          ) : (
            <div className={view === "grid" ? "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4 sm:space-y-6"}>
              {paged.map((p) => <ProductCard key={p.id} product={p} view={view} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-secondary disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {pageNumbers[0]! > 1 && (
                <>
                  <button onClick={() => setPage(1)} className="grid h-10 min-w-10 place-items-center rounded-full border border-border px-2 text-sm transition-colors hover:bg-secondary">1</button>
                  {pageNumbers[0]! > 2 && <span className="text-muted-foreground">…</span>}
                </>
              )}

              {pageNumbers.map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`grid h-10 min-w-10 place-items-center rounded-full border px-2 text-sm transition-colors ${
                    n === safePage ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  {n}
                </button>
              ))}

              {pageNumbers[pageNumbers.length - 1]! < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1]! < totalPages - 1 && <span className="text-muted-foreground">…</span>}
                  <button onClick={() => setPage(totalPages)} className="grid h-10 min-w-10 place-items-center rounded-full border border-border px-2 text-sm transition-colors hover:bg-secondary">{totalPages}</button>
                </>
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-secondary disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Page {safePage} of {totalPages}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}