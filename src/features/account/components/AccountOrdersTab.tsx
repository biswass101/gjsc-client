"use client";

import { Eye, Package, RotateCcw, Truck } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { BuyerOrder } from "../types";

export interface AccountOrdersTabProps {
  orders: BuyerOrder[];
  orderFilter: "all" | "In Transit" | "Delivered";
  onOrderFilterChange: (filter: "all" | "In Transit" | "Delivered") => void;
  onViewReceipt: (order: BuyerOrder) => void;
  onBuyAgain: (order: BuyerOrder) => void;
}

export function AccountOrdersTab({
  orders,
  orderFilter,
  onOrderFilterChange,
  onViewReceipt,
  onBuyAgain,
}: AccountOrdersTabProps) {
  const filteredOrders =
    orderFilter === "all" ? orders : orders.filter((o) => o.status === orderFilter);

  return (
    <div className="space-y-5">
      {/* Top Filter Chips & Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">
            Order History
          </h2>
          <p className="text-xs text-muted-foreground">
            View order details, download VAT invoices, or track dispatch.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border/60 p-1 bg-secondary/30">
          {(["all", "In Transit", "Delivered"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onOrderFilterChange(filter)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all cursor-pointer",
                orderFilter === filter
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === "all" ? "All Orders" : filter}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-border/80 bg-card p-12 text-center max-w-md mx-auto space-y-3">
          <Package className="h-8 w-8 text-muted-foreground mx-auto" />
          <h4 className="font-display text-lg font-medium">No Orders Found</h4>
          <p className="text-xs text-muted-foreground">
            You don't have any orders matching the "{orderFilter}" filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-sm text-foreground">
                    #{order.id}
                  </span>
                  <span className="text-muted-foreground">• {order.date}</span>
                  <span className="text-muted-foreground hidden md:inline">• {order.courier}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                      order.status === "Delivered"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List inside order */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-11 rounded-md border border-border bg-cream overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.brand}
                        </span>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.size} • Qty: {item.qty}
                        </p>
                      </div>
                    </div>

                    <span className="font-semibold text-foreground text-sm">
                      {formatBDT(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs">
                <div>
                  <span className="text-muted-foreground">Total: </span>
                  <strong className="text-foreground font-display text-base">
                    {formatBDT(order.total)}
                  </strong>
                  <span className="text-[11px] text-muted-foreground ml-1.5">
                    ({order.paymentMethod})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onBuyAgain(order)}
                    className="rounded-full text-xs gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Buy Again
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewReceipt(order)}
                    className="rounded-full text-xs gap-1.5 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Receipt
                  </Button>

                  <Button size="sm" asChild className="rounded-full text-xs gap-1.5 cursor-pointer">
                    <Link to="/track">
                      <Truck className="h-3.5 w-3.5" />
                      Track
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

