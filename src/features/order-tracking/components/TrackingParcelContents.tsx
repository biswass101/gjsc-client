"use client";

import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import type { TrackingParcelItem } from "../types";

export interface TrackingParcelContentsProps {
  items: TrackingParcelItem[];
}

export function TrackingParcelContents({ items }: TrackingParcelContentsProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
        <h3 className="font-display text-lg font-medium">Parcel Contents</h3>
        <span className="text-xs text-muted-foreground">
          {items.length} item{items.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs">
            {item.image && (
              <Link
                to="/product/$slug"
                params={{ slug: item.slug }}
                className="shrink-0 overflow-hidden rounded-md border border-border bg-cream"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={54}
                  height={54}
                  className="h-12 w-11 object-cover"
                />
              </Link>
            )}

            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.brand}
              </span>
              <Link
                to="/product/$slug"
                params={{ slug: item.slug }}
                className="font-display text-xs font-semibold text-foreground truncate block hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
              <p className="text-[11px] text-muted-foreground">
                {item.size} • Qty: {item.qty}
              </p>
            </div>

            <span className="font-semibold text-foreground text-xs shrink-0">
              {formatBDT(item.price * item.qty)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

