"use client";

import { Copy, Edit2, ExternalLink, Trash2 } from "lucide-react";
import type { AdminProduct } from "@/context/admin-context";
import { stockBadge } from "../data/productConstants";

export interface ProductTableProps {
  products: AdminProduct[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onToggleSelect: (id: string) => void;
  onAdjustStock: (id: string, delta: number) => void;
  onEdit: (product: AdminProduct) => void;
  onDuplicate: (id: string, name: string) => void;
  onDelete: (id: string, name: string) => void;
}

export function ProductTable({
  products,
  selectedIds,
  onSelectAll,
  onToggleSelect,
  onAdjustStock,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={products.length > 0 && selectedIds.length === products.length}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-border cursor-pointer"
              />
            </th>
            <th className="py-3 px-4">Product Formulation</th>
            <th className="py-3 px-4">Brand & Category</th>
            <th className="py-3 px-4">SKU</th>
            <th className="py-3 px-4 text-right">Retail (BDT)</th>
            <th className="py-3 px-4 text-center">Profit Margin</th>
            <th className="py-3 px-4 text-center">Inventory Stock</th>
            <th className="py-3 px-4 text-center">Badge</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {products.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-12 text-center text-muted-foreground">
                No Japanese skincare products found matching your filter criteria.
              </td>
            </tr>
          ) : (
            products.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              const st = stockBadge(p.stock, p.lowStockThreshold);
              const marginPct = Math.round(((p.price - p.costPrice) / p.price) * 100);

              return (
                <tr
                  key={p.id}
                  className={`hover:bg-secondary/20 transition-colors ${
                    isSelected ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(p.id)}
                      className="rounded border-border cursor-pointer"
                    />
                  </td>

                  {/* Product Formulation & Image */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-11 w-11 rounded-lg object-cover border border-border/70 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-semibold text-foreground text-xs line-clamp-1">
                            {p.name}
                          </p>
                          {p.productType === "pre-order-japan" && (
                            <span className="rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-1.5 py-0.2 text-[9px] font-bold">
                              Tokyo Pre-Order
                            </span>
                          )}
                        </div>
                        {p.japaneseName && (
                          <p className="text-[10px] text-muted-foreground/75 font-medium line-clamp-1">
                            {p.japaneseName}
                          </p>
                        )}
                        <p className="text-[11px] text-muted-foreground">
                          {p.sizes?.join(", ") || "50ml"} • ★ {p.rating.toFixed(1)} (
                          {p.reviewsCount})
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Brand & Category */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{p.brand}</p>
                    <p className="text-[11px] text-muted-foreground">{p.category}</p>
                  </td>

                  {/* SKU & Barcode */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground/90">{p.sku}</span>
                    {p.barcode && (
                      <span className="block text-[10px] text-muted-foreground/60">
                        {p.barcode}
                      </span>
                    )}
                  </td>

                  {/* Retail Price */}
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-foreground">
                    ৳{p.price.toLocaleString()}
                    {p.compareAt && (
                      <span className="block text-[10px] text-muted-foreground/70 line-through">
                        ৳{p.compareAt.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* Profit Margin */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      +{marginPct}%
                    </span>
                  </td>

                  {/* Stock Level with Quick Adjust Controls */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onAdjustStock(p.id, -1)}
                        className="h-5 w-5 rounded bg-secondary grid place-items-center text-muted-foreground hover:text-foreground font-bold cursor-pointer"
                        title="Decrement 1"
                      >
                        -
                      </button>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${st.cls}`}
                      >
                        {st.label}
                      </span>

                      <button
                        type="button"
                        onClick={() => onAdjustStock(p.id, 1)}
                        className="h-5 w-5 rounded bg-secondary grid place-items-center text-muted-foreground hover:text-foreground font-bold cursor-pointer"
                        title="Increment 1"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Badge */}
                  <td className="py-3.5 px-4 text-center">
                    {p.badge ? (
                      <span className="rounded-full bg-primary/15 text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-bold">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground/60">—</span>
                    )}
                  </td>

                  {/* Actions Menu */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(p)}
                        title="Edit Product"
                        className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDuplicate(p.id, p.name)}
                        title="Duplicate SKU"
                        className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>

                      <a
                        href={`/product/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview on Store"
                        className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onDelete(p.id, p.name)}
                        title="Delete"
                        className="h-7 w-7 rounded-lg grid place-items-center text-muted-foreground hover:bg-rose/10 hover:text-rose transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
