import React from "react";
import { Store, ArrowUpRight } from "lucide-react";

interface AdminSidebarFooterProps {
  collapsed: boolean;
}

export function AdminSidebarFooter({ collapsed }: AdminSidebarFooterProps) {
  return (
    <div className="shrink-0 border-t border-border/70 p-3 space-y-2 bg-secondary/10">
      {!collapsed ? (
        <>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Store className="h-3.5 w-3.5 text-primary" />
              <span>View Storefront</span>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="relative">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                SA
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-foreground truncate">Super Admin</p>
              <p className="text-[10px] text-muted-foreground truncate">Tokyo Hub • Online</p>
            </div>
          </div>
        </>
      ) : (
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View Storefront"
          className="grid h-9 w-9 mx-auto place-items-center rounded-xl border border-border hover:bg-secondary text-primary transition-colors"
        >
          <Store className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
