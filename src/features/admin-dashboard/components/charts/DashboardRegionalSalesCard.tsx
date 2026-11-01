import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DashboardRegionalSalesCardProps {
  regionalSalesData: Array<{
    division: string;
    share: number;
    revenue: number;
    color: string;
  }>;
}

export function DashboardRegionalSalesCard({ regionalSalesData }: DashboardRegionalSalesCardProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
      <div className="border-b border-border/60 pb-3 flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-bold text-foreground">
            Geographic Delivery Distribution
          </h2>
          <p className="text-xs text-muted-foreground">Order volume by Bangladesh divisions</p>
        </div>
        <Badge variant="outline" className="text-[10px] font-semibold">
          64 Districts
        </Badge>
      </div>

      <div className="space-y-3">
        {regionalSalesData.map((reg) => (
          <div key={reg.division} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{reg.division}</span>
              <span className="text-muted-foreground">
                {reg.share}% (৳{reg.revenue.toLocaleString("en-BD")})
              </span>
            </div>
            <Progress value={reg.share} className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
