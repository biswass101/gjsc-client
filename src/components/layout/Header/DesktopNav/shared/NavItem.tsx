
"use client";

import { ChevronDown } from "lucide-react";
import { Link } from "@/lib/navigation";
import type { ReactNode } from "react";

interface NavItemProps {
  to: string;
  label: string;
  hasDropdown?: boolean;
  icon?: ReactNode;
  fallbackRoute?: string;
}

export function NavItem({
  to,
  label,
  hasDropdown = false,
  icon,
  fallbackRoute,
}: NavItemProps) {
  const target = fallbackRoute ?? to;

  return (
    <Link
      to={target}
      className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors hover:text-primary cursor-pointer"
    >
      {icon && <span className="flex h-4 w-4">{icon}</span>}

      {label}

      {hasDropdown && (
        <ChevronDown className="ml-1 h-3.5 w-3.5" strokeWidth={2} />
      )}
    </Link>
  );
}
