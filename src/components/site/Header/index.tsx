"use client";

import { Link } from "@/lib/navigation";
import {
  Sparkles,
  Star,
  Gift,
  Search,
  Shield,
  Globe,
  Star as StarIcon,
  Sparkles as SparklesIcon,
  Gift as GiftIcon,
  Search as SearchIcon,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@/lib/navigation";
import { toast } from "sonner";
import { useShop } from "@/lib/store";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";
import { SearchDialog } from "../SearchDialog";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { SearchButton } from "./SearchButton";
import { WishlistButton } from "./WishlistButton";
import { CartButton } from "./CartButton";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";
import { MobileMenu } from "./MobileMenu";
import { CategoriesDropdown } from "./DesktopNav/DropDowns/CategoriesDropdown";
import { CollectionsDropdown } from "./DesktopNav/DropDowns/CollectionsDropdown";
import { BrandsDropdown } from "./DesktopNav/DropDowns/BrandsDropdown";

const collectionsItems = [
  {
    href: "/collections",
    search: { type: "bestsellers" },
    icon: StarIcon,
    label: "Bestsellers",
    color: "text-yellow-500",
  },
  {
    href: "/collections",
    search: { type: "new-arrivals" },
    icon: SparklesIcon,
    label: "New Arrivals",
    color: "text-purple-500",
  },
  {
    href: "/collections",
    search: { type: "combo-gift-sets" },
    icon: GiftIcon,
    label: "Combo & Gift Sets",
    color: "text-pink-500",
  },
  {
    href: "/collections",
    search: { type: "skin-concern" },
    icon: SearchIcon,
    label: "Shop by Skin Concern",
    color: "text-blue-500",
  },
  {
    href: "/collections",
    search: { type: "shein" },
    icon: ShieldIcon,
    label: "SHEIN Products",
    color: "text-indigo-500",
  },
  {
    href: "/collections",
    search: { type: "pre-order-japan" },
    icon: GlobeIcon,
    label: "Pre-Order from Japan",
    color: "text-red-500",
  },
] as const;

function CollectionsBar() {
  return (
    <div className="hidden lg:block border-t border-border/10 bg-background/50 backdrop-blur-sm">
      <div className="container-lux py-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <span className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            Collections
          </span>
          {collectionsItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              search={item.search}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap rounded-full bg-secondary/30 hover:bg-secondary/50"
            >
              <item.icon className={`h-3.5 w-3.5 ${item.color}`} strokeWidth={2} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DropdownRenderer({ label, onMouseEnter, onMouseLeave }: { label: string | null; onMouseEnter: () => void; onMouseLeave: () => void }) {
  if (!label) return null;

  const content = label === "Categories" ? (
    <CategoriesDropdown />
  ) : label === "Collections" ? (
    <CollectionsDropdown />
  ) : label === "Brands" ? (
    <BrandsDropdown />
  ) : null;

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </div>
  );
}

export function Header() {
  const { count, setCartOpen, wishlist, user, logout, notifications, markAllRead, markRead } =
    useShop();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isHeaderVisible = useHeaderVisibility();

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    toast("Signed out successfully.");
    navigate({ to: "/" });
  };

  const handleNavigate = (to: string) => {
    navigate({ to });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* <AnnouncementBar /> */}

      <div
        className={`border-b border-border/30 transition-all duration-300 ${
          scrolled ? "bg-background/40 backdrop-blur-xl" : "bg-transparent"
        } ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Row 1: Logo + Search bar (middle) + Icon Buttons */}
        <div className="container-lux flex h-14 lg:h-16 items-center justify-between gap-2 sm:gap-3 lg:gap-4">
          <Logo />

          <div className="flex-1 flex justify-center px-2 sm:px-4">
            <SearchButton onClick={() => setSearchOpen(true)} />
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <WishlistButton count={wishlist.length} />
            <NotificationsDropdown
              notifications={notifications}
              unreadCount={unread}
              markRead={markRead}
              markAllRead={markAllRead}
            />
            <CartButton count={count} onClick={() => setCartOpen(true)} />
            <UserDropdown user={user} onLogout={handleLogout} />

            <MobileMenu
              user={user}
              wishlistCount={wishlist.length}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              className="md:hidden"
            />
          </div>
        </div>

{/* Row 2: Desktop Navigation */}
        <div className="hidden lg:block border-t border-border/20 relative">
          <div className="container-lux relative">
            <DesktopNav
              openDropdown={openDropdown}
              onOpenDropdown={setOpenDropdown}
            />
          </div>
          <DropdownRenderer
            label={openDropdown}
            onMouseEnter={() => setOpenDropdown(openDropdown)}
            onMouseLeave={() => setOpenDropdown(null)}
          />
        </div>

        {/* Row 3: Collections Horizontal Scroll */}
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
