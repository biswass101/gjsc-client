import React from "react";

interface CustomersKpiCardsProps {
  totalLTV: number;
  vipCount: number;
  avgLtv: number;
}

export function CustomersKpiCards({ totalLTV, vipCount, avgLtv }: CustomersKpiCardsProps) {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Total Customer LTV
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">
          ৳{totalLTV.toLocaleString()}
        </p>
        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+18.4% YoY spend growth</p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          VIP & Platinum Ritualists
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-purple-600">{vipCount}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Top tier Japanese skincare devotees
        </p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Average LTV per Buyer
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">
          ৳{avgLtv.toLocaleString()}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Across Dhaka & divisions</p>
      </div>

      <div className="surface-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Active Repeat Rate
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-emerald-600">46.8%</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Highest in serums & cleansers</p>
      </div>
    </div>
  );
}
