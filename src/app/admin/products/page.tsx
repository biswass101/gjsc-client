"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Edit2, Plus, Search, SlidersHorizontal, Trash2, X,
} from "lucide-react";
import { toast } from "sonner";
import { BRANDS, CATEGORIES, CONCERNS, formatBDT, PRODUCTS, SKIN_TYPES } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 8;

const STATUS_BADGE = {
  in: "bg-emerald-100 text-emerald-700",
  low: "bg-amber-100 text-amber-700",
  out: "bg-red-100 text-red-600",
};
function stockStatus(stock: number) {
  if (stock === 0) return { label: "Out of stock", cls: STATUS_BADGE.out };
  if (stock <= 5) return { label: "Low stock", cls: STATUS_BADGE.low };
  return { label: "In stock", cls: STATUS_BADGE.in };
}

const BADGES = ["All", "Best Seller", "Trending", "New", "Flash Sale", "No Badge"] as const;
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low–High", value: "price_asc" },
  { label: "Price: High–Low", value: "price_desc" },
  { label: "Name A–Z", value: "name_asc" },
  { label: "Rating", value: "rating" },
  { label: "Stock", value: "stock" },
];

type ProductForm = {
  name: string;
  brand: string;
  category: string;
  price: string;
  compareAt: string;
  stock: string;
  badge: Product["badge"] | "";
  short: string;
  description: string;
  howTo: string;
  skinType: string;
  concern: string;
  sizes: string;
};

const EMPTY_FORM: ProductForm = {
  name: "", brand: BRANDS[0], category: CATEGORIES[0], price: "", compareAt: "",
  stock: "", badge: "" as Product["badge"] | "", short: "", description: "", howTo: "",
  skinType: SKIN_TYPES[0], concern: CONCERNS[0], sizes: "30ml, 50ml, 100ml",
};

function ProductModal({ product, onClose, onSave }: {
  product?: Product | null;
  onClose: () => void;
  onSave: (data: ProductForm) => void;
}) {
  const [form, setForm] = useState(product ? {
    name: product.name, brand: product.brand, category: product.category,
    price: String(product.price), compareAt: String(product.compareAt ?? ""),
    stock: String(product.stock), badge: product.badge ?? "" as Product["badge"] | "",
    short: product.short, description: product.description, howTo: product.howTo,
    skinType: product.skinTypes[0] ?? SKIN_TYPES[0],
    concern: product.concerns[0] ?? CONCERNS[0],
    sizes: product.sizes.join(", "),
  } : { ...EMPTY_FORM });

  const set = (k: keyof typeof EMPTY_FORM, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 backdrop-blur-sm px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-background shadow-[var(--shadow-lift)] animate-rise">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-xl">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground"><X className="h-4 w-4" /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 space-y-5">
          {/* Name + Brand */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="p-name" className="text-xs uppercase tracking-[0.12em]">Product Name *</Label>
              <Input id="p-name" required className="mt-1.5 rounded-full" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Sakura Radiance Serum" />
            </div>
            <div>
              <Label htmlFor="p-brand" className="text-xs uppercase tracking-[0.12em]">Brand *</Label>
              <select id="p-brand" className="mt-1.5 w-full rounded-full border border-input bg-background px-4 py-2 text-sm" value={form.brand} onChange={(e) => set("brand", e.target.value)}>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Category + Badge */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="p-cat" className="text-xs uppercase tracking-[0.12em]">Category *</Label>
              <select id="p-cat" className="mt-1.5 w-full rounded-full border border-input bg-background px-4 py-2 text-sm" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="p-badge" className="text-xs uppercase tracking-[0.12em]">Badge</Label>
              <select id="p-badge" className="mt-1.5 w-full rounded-full border border-input bg-background px-4 py-2 text-sm" value={form.badge} onChange={(e) => set("badge", e.target.value as Exclude<Product["badge"], undefined> | "")}>
                <option value="">No Badge</option>
                {(["New", "Best Seller", "Trending", "Flash Sale"] as const).map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Compare + Stock */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="p-price" className="text-xs uppercase tracking-[0.12em]">Price (৳) *</Label>
              <Input id="p-price" required type="number" min="0" className="mt-1.5 rounded-full" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="4850" />
            </div>
            <div>
              <Label htmlFor="p-compare" className="text-xs uppercase tracking-[0.12em]">Compare At (৳)</Label>
              <Input id="p-compare" type="number" min="0" className="mt-1.5 rounded-full" value={form.compareAt} onChange={(e) => set("compareAt", e.target.value)} placeholder="5900" />
            </div>
            <div>
              <Label htmlFor="p-stock" className="text-xs uppercase tracking-[0.12em]">Stock *</Label>
              <Input id="p-stock" required type="number" min="0" className="mt-1.5 rounded-full" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="50" />
            </div>
          </div>

          {/* Skin Type + Concern + Sizes */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="p-skin" className="text-xs uppercase tracking-[0.12em]">Skin Type</Label>
              <select id="p-skin" className="mt-1.5 w-full rounded-full border border-input bg-background px-4 py-2 text-sm" value={form.skinType} onChange={(e) => set("skinType", e.target.value)}>
                {SKIN_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="p-concern" className="text-xs uppercase tracking-[0.12em]">Concern</Label>
              <select id="p-concern" className="mt-1.5 w-full rounded-full border border-input bg-background px-4 py-2 text-sm" value={form.concern} onChange={(e) => set("concern", e.target.value)}>
                {CONCERNS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="p-sizes" className="text-xs uppercase tracking-[0.12em]">Sizes</Label>
              <Input id="p-sizes" className="mt-1.5 rounded-full" value={form.sizes} onChange={(e) => set("sizes", e.target.value)} placeholder="30ml, 50ml, 100ml" />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <Label htmlFor="p-short" className="text-xs uppercase tracking-[0.12em]">Short Description</Label>
            <Input id="p-short" className="mt-1.5 rounded-full" value={form.short} onChange={(e) => set("short", e.target.value)} placeholder="One-line product summary" />
          </div>

          {/* Full Description */}
          <div>
            <Label htmlFor="p-desc" className="text-xs uppercase tracking-[0.12em]">Full Description</Label>
            <textarea id="p-desc" rows={3} className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-2.5 text-sm resize-none outline-none focus:ring-2 focus:ring-primary/20" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Detailed product description..." />
          </div>

          {/* How To Use */}
          <div>
            <Label htmlFor="p-howto" className="text-xs uppercase tracking-[0.12em]">How To Use</Label>
            <textarea id="p-howto" rows={2} className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-2.5 text-sm resize-none outline-none focus:ring-2 focus:ring-primary/20" value={form.howTo} onChange={(e) => set("howTo", e.target.value)} placeholder="Application instructions..." />
          </div>

          <div className="flex gap-3 border-t border-border pt-4">
            <button type="button" onClick={onClose} className="flex-1 rounded-full border border-border py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-secondary">
              Cancel
            </button>
            <Button type="submit" className="flex-1 rounded-full text-[11px] uppercase tracking-[0.2em]">
              {product ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-lift)] animate-rise">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" strokeWidth={1.5} />
        </div>
        <h3 className="mt-4 text-center font-display text-xl">Delete Product?</h3>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Are you sure you want to delete <strong className="text-foreground">"{name}"</strong>? This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-full border border-border py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-full bg-destructive py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState(PRODUCTS);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [badge, setBadge] = useState("All");
  const [sort, setSort] = useState("newest");
  const [stockFilter, setStockFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  // Filter
  let filtered = products.filter((p) => {
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchBadge = badge === "All" || (badge === "No Badge" ? !p.badge : p.badge === badge);
    const matchStock = stockFilter === "All" || (stockFilter === "In Stock" && p.stock > 5) || (stockFilter === "Low Stock" && p.stock > 0 && p.stock <= 5) || (stockFilter === "Out of Stock" && p.stock === 0);
    return matchQ && matchCat && matchBadge && matchStock;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "name_asc") return a.name.localeCompare(b.name);
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "stock") return b.stock - a.stock;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const paged = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  const handleDelete = (p: Product) => {
    setProducts((ps) => ps.filter((x) => x.id !== p.id));
    toast.error(`"${p.name}" deleted`);
    setDeleteProduct(null);
  };

  const handleSave = (form: ProductForm) => {
    toast.success(editProduct ? `"${form.name}" updated (demo)` : `"${form.name}" added (demo)`);
    setAddOpen(false);
    setEditProduct(null);
  };

  const clearFilters = () => { setQ(""); setCategory("All"); setBadge("All"); setStockFilter("All"); setSort("newest"); setPage(1); };
  const hasFilters = q || category !== "All" || badge !== "All" || stockFilter !== "All" || sort !== "newest";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} of {products.length} products shown</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" /> Add Product
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input placeholder="Search name or brand…" className="rounded-full pl-10" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <select className="rounded-full border border-border bg-background px-4 py-2 text-sm" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] transition-colors ${showFilters ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-secondary"}`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {hasFilters ? "(Active)" : ""}
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 rounded-full border border-border px-3 py-2 text-[11px] text-muted-foreground transition-colors hover:bg-secondary">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="surface-card p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label className="text-[10px] uppercase tracking-[0.15em]">Category</Label>
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-[0.15em]">Badge</Label>
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={badge} onChange={(e) => { setBadge(e.target.value); setPage(1); }}>
              {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-[0.15em]">Stock Status</Label>
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={stockFilter} onChange={(e) => { setStockFilter(e.target.value); setPage(1); }}>
              {["All", "In Stock", "Low Stock", "Out of Stock"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-5 py-3.5 min-w-[200px]">Product</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Category</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Brand</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Price</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Stock</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Badge</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paged.map((p) => {
                const st = stockStatus(p.stock);
                return (
                  <tr key={p.id} className="transition-colors hover:bg-secondary/20">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
                        <div>
                          <p className="max-w-[180px] truncate font-medium text-[13px]">{p.name}</p>
                          <p className="text-[11px] text-muted-foreground">⭐ {p.rating} · {p.reviews} reviews</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap text-[12px]">{p.category}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap text-[12px]">{p.brand}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="font-semibold text-[13px]">{formatBDT(p.price)}</p>
                      {p.compareAt && <p className="text-[11px] text-muted-foreground line-through">{formatBDT(p.compareAt)}</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${st.cls}`}>{st.label} ({p.stock})</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.badge
                        ? <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">{p.badge}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditProduct(p)}
                          className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteProduct(p)}
                          className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No products match your filters.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">Page {safeP} of {totalPages} · {filtered.length} results</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <button disabled={safeP <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-border disabled:opacity-40 hover:bg-secondary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`grid h-8 w-8 place-items-center rounded-full text-[12px] transition-colors ${n === safeP ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>{n}</button>
            ))}
            <button disabled={safeP >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="grid h-8 w-8 place-items-center rounded-full border border-border disabled:opacity-40 hover:bg-secondary transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {(addOpen || editProduct) && (
        <ProductModal product={editProduct} onClose={() => { setAddOpen(false); setEditProduct(null); }} onSave={handleSave} />
      )}
      {deleteProduct && (
        <DeleteModal name={deleteProduct.name} onConfirm={() => handleDelete(deleteProduct)} onClose={() => setDeleteProduct(null)} />
      )}
    </div>
  );
}