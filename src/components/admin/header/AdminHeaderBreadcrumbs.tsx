import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";

interface AdminHeaderBreadcrumbsProps {
  onOpenMobileMenu: () => void;
}

export function AdminHeaderBreadcrumbs({ onOpenMobileMenu }: AdminHeaderBreadcrumbsProps) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return [{ label: "Executive Dashboard", href: "/admin" }];

    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      const label =
        part === "admin" ? "Admin" : part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");
      return { label, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-border text-foreground hover:bg-secondary"
        aria-label="Open Admin Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <nav
        aria-label="Breadcrumb"
        className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/admin" className="hover:text-foreground font-medium">
          Admin
        </Link>
        {breadcrumbs.slice(1).map((crumb) => (
          <React.Fragment key={crumb.href}>
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            <span className="text-foreground font-semibold">{crumb.label}</span>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
