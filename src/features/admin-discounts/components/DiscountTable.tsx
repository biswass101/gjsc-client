"use client";

import { Check, Copy, Trash2 } from "lucide-react";
import type { AdminDiscount } from "@/context/admin-context";

export interface DiscountTableProps {
  discounts: AdminDiscount[];
  copiedId: string | null;
  onCopy: (discount: AdminDiscount) => void;
  onToggleStatus: (id: string, code: string) => void;
  onDelete: (id: string, code: string) => void;
}

export function DiscountTable({
  discounts,
  copiedId,
  onCopy,
  onToggleStatus,
  onDelete,
}: DiscountTableProps) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Discount Type & Benefit</th>
              <th className="py-3 px-4">Min Order Threshold</th>
              <th className="py-3 px-4 text-center">Usage Progress</th>
              <th className="py-3 px-4">Validity</th>
              <th className="py-3 px-4 text-center">Active Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {discounts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  No promotional coupons created yet. Click "Create Coupon" to launch your first
                  offer.
                </td>
              </tr>
            ) : (
              discounts.map((d) => {
                const percentUsed = Math.min(100, Math.round((d.usageCount / d.usageLimit) * 100));

                return (
                  <tr key={d.id} className="hover:bg-secondary/20 transition-colors">
                    {/* Code */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-foreground bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                          {d.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => onCopy(d)}
                          className="text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Copy code"
                        >
                          {copiedId === d.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Type & Value */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-foreground text-xs">
                        {d.type === "percentage"
                          ? `${d.value}% Off Entire Order`
                          : d.type === "fixed"
                            ? `৳${d.value.toLocaleString()} Direct Discount`
                            : "Free Delivery in Bangladesh"}
                      </p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {d.type}
                      </p>
                    </td>

                    {/* Min Spend */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-foreground">
                      {d.minSpend > 0 ? `৳${d.minSpend.toLocaleString()}` : "No Minimum"}
                    </td>

                    {/* Usage */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="space-y-1 max-w-[120px] mx-auto">
                        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                          <span>{d.usageCount} used</span>
                          <span>{d.usageLimit} max</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${percentUsed}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Validity */}
                    <td className="py-3.5 px-4 text-muted-foreground font-mono text-[11px]">
                      Until {d.endDate}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          d.status === "active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300"
                            : "bg-secondary text-muted-foreground border-border/80"
                        }`}
                      >
                        {d.status === "active" ? "Active" : "Paused"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleStatus(d.id, d.code)}
                          className="rounded-md border border-border px-2 py-1 text-[11px] font-medium hover:bg-secondary cursor-pointer"
                        >
                          {d.status === "active" ? "Pause" : "Enable"}
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(d.id, d.code)}
                          className="text-muted-foreground hover:text-rose p-1 cursor-pointer"
                          title="Delete"
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
    </div>
  );
}
