"use client";

import { Link } from "@/lib/navigation";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CatalogBreadcrumbProps {
  items?: BreadcrumbItem[];
  title?: string;
  parent?: { label: string; href: string };
  className?: string;
}

export function CatalogBreadcrumb({
  items,
  title,
  parent,
  className = "flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap py-3",
}: CatalogBreadcrumbProps) {
  // If items array is explicitly provided, render from that
  if (items && items.length > 0) {
    return (
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link
              to="/"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                {isLast || !item.href ? (
                  <span className="font-semibold text-foreground truncate max-w-[220px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href as "/categories"}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // Otherwise render using title + parent shorthand
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        <li className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
        </li>

        {parent ? (
          <>
            <li>
              <Link
                to={parent.href as "/categories"}
                className="hover:text-primary transition-colors font-medium"
              >
                {parent.label}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
            </li>
          </>
        ) : null}

        <li className="font-semibold text-foreground truncate max-w-[220px] sm:max-w-none">
          {title}
        </li>
      </ol>
    </nav>
  );
}

