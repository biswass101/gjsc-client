
import { DropdownLink } from "./DropdownLink";
import type { LucideIcon } from "lucide-react";

export interface DropdownItem {
  label: string;
  category: string;
  icon: LucideIcon;
  iconClassName?: string;
}

interface DropdownColumnProps {
  title: string;
  items: DropdownItem[];
  to: "/shop" | "/collections";
  searchParam: "category" | "type";
  getHref?: (item: DropdownItem) => string;
}

export function DropdownColumn({
  title,
  items,
  to,
  searchParam,
  getHref,
}: DropdownColumnProps) {
  return (
    <div className="col-span-12 px-4 lg:col-span-6">
      <p className="eyebrow mb-2">{title}</p>

      <div className="space-y-1 text-[13px] normal-case tracking-normal">
        {items.map((item) => (
          <DropdownLink
            key={item.category}
            {...item}
            to={to}
            searchParam={searchParam}
            {...(getHref ? { href: getHref(item) } : {})}
          />
        ))}
      </div>
    </div>
  );
}
