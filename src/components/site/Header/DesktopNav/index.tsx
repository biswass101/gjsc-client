"use client";

import { useRef, useState } from "react";
import NavScrollButton from "./NavScrollButton";
import { NavItem } from "./shared/NavItem";
import { navItems, type NavItemData } from "./data";

interface DesktopNavProps {
  openDropdown: string | null;
  onOpenDropdown: (label: string | null) => void;
}

export function DesktopNav({ openDropdown, onOpenDropdown }: DesktopNavProps) {
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <nav
      className="hidden items-center gap-1 text-[13px] font-medium lg:flex min-w-0"
      aria-label="Main navigation"
    >
      <NavScrollButton direction="left" navScrollRef={navScrollRef} />
      <div
        ref={navScrollRef}
        className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide"
      >
        {navItems.map(({ to, label, icon: Icon, iconClassName, dropdown: Dropdown, fallbackRoute }) => {
          const item = { to, label, icon: Icon, iconClassName, dropdown: Dropdown, fallbackRoute } as NavItemData;
          const isOpen = openItem === label;
          return (
            <div
              key={label}
              className="relative shrink-0"
              onMouseEnter={() => {
                if (item.dropdown) {
                  setOpenItem(label);
                  onOpenDropdown(label);
                }
              }}
              onMouseLeave={() => {
                setOpenItem(null);
                onOpenDropdown(null);
              }}
            >
              <NavItem
                to={to}
                label={label}
                hasDropdown={!!Dropdown}
                {...(fallbackRoute ? { fallbackRoute } : {})}
                icon={<Icon className={`h-4 w-4 ${iconClassName ?? ""}`} strokeWidth={2} />}
              />
            </div>
          );
        })}
      </div>
      <NavScrollButton direction="right" navScrollRef={navScrollRef} />
    </nav>
  );
}
