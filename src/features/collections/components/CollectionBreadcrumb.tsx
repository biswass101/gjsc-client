"use client";

import { Link } from "@/lib/navigation";
import { ChevronRight, Home } from "lucide-react";

interface CollectionBreadcrumbProps {
  title: string;
}

export function CollectionBreadcrumb({ title }: CollectionBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap py-3"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />

      <Link
        to="/collections"
        className="hover:text-primary transition-colors font-medium"
      >
        Collections
      </Link>

      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />

      <span className="font-semibold text-foreground truncate max-w-[220px] sm:max-w-none">
        {title}
      </span>
    </nav>
  );
}

