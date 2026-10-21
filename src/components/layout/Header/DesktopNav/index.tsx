"use client";

import { useRef, useState, useEffect } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = navScrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5
    );
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  return (
    <nav
      className="relative hidden items-center text-[13px] font-medium lg:flex min-w-0 w-full"
      aria-label="Main navigation"
    >
      <NavScrollButton
        direction="left"
        navScrollRef={navScrollRef}
        visible={canScrollLeft}
      />

      <div
        ref={navScrollRef}
        onScroll={checkScrollability}
        className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide scroll-smooth py-1"
      >
        {navItems.map(({ to, label, icon: Icon, iconClassName, dropdown: Dropdown, fallbackRoute }) => {
          const item = { to, label, icon: Icon, iconClassName, dropdown: Dropdown, fallbackRoute } as NavItemData;
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

      <NavScrollButton
        direction="right"
        navScrollRef={navScrollRef}
        visible={canScrollRight}
      />
    </nav>
  );
}
