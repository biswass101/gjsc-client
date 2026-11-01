"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import { Home, Menu, Store, Tag, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { User as UserProfile } from "@/types";
import { MobileMenuHeader } from "./mobile/MobileMenuHeader";
import { MobileNavAccordions } from "./mobile/MobileNavAccordions";
import { MobileEditorialLinks } from "./mobile/MobileEditorialLinks";
import { MobileAccountSection } from "./mobile/MobileAccountSection";

interface MobileMenuProps {
  user: UserProfile | null;
  wishlistCount: number;
  onLogout: () => void;
  onNavigate: (to: string) => void;
  className?: string;
}

export function MobileMenu({
  user,
  wishlistCount,
  onLogout,
  onNavigate,
  className,
}: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleLinkClick = (to: string) => {
    setIsOpen(false);
    onNavigate(to);
  };

  return (
    <div className={className}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition-colors"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[90vw] max-w-sm sm:max-w-md overflow-y-auto bg-background p-0 border-l border-border"
        >
          <MobileMenuHeader />

          <nav className="divide-y divide-border/50 text-sm">
            {/* 1. Main Navigation */}
            <div className="p-3 space-y-1">
              <Link
                to="/"
                onClick={() => handleLinkClick("/")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors font-medium text-foreground text-[14px]"
              >
                <Home className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <span>Home</span>
              </Link>

              <Link
                to="/shop"
                onClick={() => handleLinkClick("/shop")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors font-medium text-foreground text-[14px]"
              >
                <Store className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <span>Shop All</span>
              </Link>

              <MobileNavAccordions
                openSection={openSection}
                toggleSection={toggleSection}
                onLinkClick={handleLinkClick}
              />

              <Link
                to="/offers"
                onClick={() => handleLinkClick("/offers")}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors font-medium text-foreground text-[14px]"
              >
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-rose-500" strokeWidth={1.75} />
                  <span>Offers & Discounts</span>
                </div>
                <span className="rounded-full bg-rose-500/10 text-rose-600 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                  Sale
                </span>
              </Link>

              <Link
                to="/pre-order"
                onClick={() => handleLinkClick("/pre-order")}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors font-medium text-foreground text-[14px]"
              >
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  <span>Pre-Order from Tokyo</span>
                </div>
                <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                  Tokyo Direct
                </span>
              </Link>
            </div>

            <MobileEditorialLinks onLinkClick={handleLinkClick} />

            <MobileAccountSection
              user={user}
              wishlistCount={wishlistCount}
              onLogout={onLogout}
              onLinkClick={handleLinkClick}
            />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
