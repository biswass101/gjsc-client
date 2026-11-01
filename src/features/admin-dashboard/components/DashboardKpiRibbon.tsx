import React from "react";
import {
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  CreditCard,
  Plane,
  ShoppingBag,
  Users,
  Activity,
  Star,
} from "lucide-react";

interface DashboardKpiRibbonProps {
  totalGrossRevenue: number;
  deliveredRevenue: number;
  estimatedProfit: number;
  grossMarginPercent: number;
  avgOrderValue: number;
  preOrderRevenue: number;
  preOrdersCount: number;
  totalOrdersCount: number;
  activeOrdersCount: number;
  customersCount: number;
  avgStoreRating: string;
  reviewsCount: number;
}

export function DashboardKpiRibbon({
  totalGrossRevenue,
  deliveredRevenue,
  estimatedProfit,
  grossMarginPercent,
  avgOrderValue,
  preOrderRevenue,
  preOrdersCount,
  totalOrdersCount,
  activeOrdersCount,
  customersCount,
  avgStoreRating,
  reviewsCount,
}: DashboardKpiRibbonProps) {
  return (
    <div className="space-y-4">
      {/* Executive 4-Card Financial Ribbon */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Gross Sales */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative overflow-hidden shadow-xs hover:border-primary/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Gross Sales (GMV)
              </p>
              <p className="mt-1.5 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                ৳{totalGrossRevenue.toLocaleString("en-BD")}
              </p>
            </div>
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 shrink-0">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
            <span className="flex items-center gap-0.5 font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" /> +18.4%
            </span>
            <span>৳{deliveredRevenue.toLocaleString("en-BD")} settled</span>
          </div>
        </div>

        {/* Metric 2: Net Gross Profit */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative overflow-hidden shadow-xs hover:border-primary/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Gross Margin & Profit
              </p>
              <p className="mt-1.5 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                ৳{Math.round(estimatedProfit).toLocaleString("en-BD")}
              </p>
            </div>
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
            <span className="font-semibold text-indigo-600">
              {grossMarginPercent}% Profit Margin
            </span>
            <span>Tokyo import yield</span>
          </div>
        </div>

        {/* Metric 3: Average Order Value */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative overflow-hidden shadow-xs hover:border-primary/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Average Basket (AOV)
              </p>
              <p className="mt-1.5 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                ৳{avgOrderValue.toLocaleString("en-BD")}
              </p>
            </div>
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
            <span className="flex items-center gap-0.5 font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" /> +6.5%
            </span>
            <span>Avg 2.4 items / cart</span>
          </div>
        </div>

        {/* Metric 4: Pre-Order Cargo Pipeline */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative overflow-hidden shadow-xs hover:border-primary/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Air-Freight Pre-Orders
              </p>
              <p className="mt-1.5 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                ৳{preOrderRevenue.toLocaleString("en-BD")}
              </p>
            </div>
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 shrink-0">
              <Plane className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
            <span className="font-semibold text-sky-600">{preOrdersCount} Flight Batches</span>
            <span>Advance deposits</span>
          </div>
        </div>
      </div>

      {/* Second Row of KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Total Orders */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Total Orders</span>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
            {totalOrdersCount} Orders
          </p>
          <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between pt-1.5 border-t border-border/50">
            <span>{activeOrdersCount} active dispatches</span>
            <span className="text-emerald-600 font-medium">96.8% Success</span>
          </div>
        </div>

        {/* Customer Base & Repeat Rate */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Customer LTV Base</span>
            <Users className="h-4 w-4 text-violet-600" />
          </div>
          <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
            {customersCount} Accounts
          </p>
          <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between pt-1.5 border-t border-border/50">
            <span className="text-emerald-600 font-semibold">48.6% Repeat Rate</span>
            <span>2.8 orders / buyer</span>
          </div>
        </div>

        {/* Storefront Conversion Rate */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Store Conversion</span>
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-1.5 font-display text-2xl font-bold text-foreground">3.42%</p>
          <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between pt-1.5 border-t border-border/50">
            <span>28.4k visits / 30d</span>
            <span className="text-emerald-600 font-medium">+0.8% MoM</span>
          </div>
        </div>

        {/* Product Trust & Reviews */}
        <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 relative shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Customer Rating</span>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
            {avgStoreRating}{" "}
            <span className="text-sm font-normal text-muted-foreground">/ 5.0</span>
          </p>
          <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between pt-1.5 border-t border-border/50">
            <span>{reviewsCount} Verified reviews</span>
            <span className="text-emerald-600 font-medium">98% positive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
