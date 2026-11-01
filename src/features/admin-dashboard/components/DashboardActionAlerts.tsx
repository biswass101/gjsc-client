import React from "react";
import Link from "next/link";
import { Clock, AlertTriangle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminProduct } from "@/context/admin-context";

interface DashboardActionAlertsProps {
  pendingOrdersCount: number;
  lowStockProducts: AdminProduct[];
  pendingReviewsCount: number;
}

export function DashboardActionAlerts({
  pendingOrdersCount,
  lowStockProducts,
  pendingReviewsCount,
}: DashboardActionAlertsProps) {
  if (pendingOrdersCount === 0 && lowStockProducts.length === 0 && pendingReviewsCount === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
      {pendingOrdersCount > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              <strong>{pendingOrdersCount} orders</strong> awaiting dispatch
            </span>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-6 text-[11px] px-2.5 rounded-full shrink-0"
          >
            <Link href="/admin/orders">Fulfill</Link>
          </Button>
        </div>
      )}

      {lowStockProducts.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-900 dark:text-rose-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>
              <strong>{lowStockProducts.length} items</strong> critically low (≤ 5 units)
            </span>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-6 text-[11px] px-2.5 rounded-full shrink-0"
          >
            <Link href="/admin/products">Restock</Link>
          </Button>
        </div>
      )}

      {pendingReviewsCount > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-900 dark:text-blue-200">
          <div className="flex items-center gap-2.5">
            <Star className="h-4 w-4 text-blue-600 shrink-0" />
            <span>
              <strong>{pendingReviewsCount} customer reviews</strong> awaiting approval
            </span>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-6 text-[11px] px-2.5 rounded-full shrink-0"
          >
            <Link href="/admin/reviews">Moderate</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
