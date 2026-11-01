import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminSidebarBrandHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigateMobile?: (() => void) | undefined;
}

export function AdminSidebarBrandHeader({
  collapsed,
  onToggleCollapse,
  onNavigateMobile,
}: AdminSidebarBrandHeaderProps) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/70 px-4">
      {!collapsed ? (
        <Link
          href="/admin"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => onNavigateMobile?.()}
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground font-display text-lg font-bold shadow-xs">
            🌸
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-semibold tracking-tight text-foreground">
                Glorious Japan
              </span>
              <span className="rounded-sm bg-primary/10 px-1 py-0.2 text-[9px] font-bold text-primary">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate">Admin Console • v2.6</p>
          </div>
        </Link>
      ) : (
        <Link
          href="/admin"
          className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-xs"
          title="Glorious Japan Admin"
          onClick={() => onNavigateMobile?.()}
        >
          🌸
        </Link>
      )}

      {/* Desktop Collapse Toggle */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden lg:grid h-7 w-7 place-items-center rounded-lg border border-border/60 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  );
}
