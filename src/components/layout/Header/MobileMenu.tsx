"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import {
  Baby,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Gem,
  Gift,
  Globe,
  Grid,
  Heart,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Menu,
  Phone,
  Scissors,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Tag,
  Truck,
  User,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { CATEGORIES, PRODUCT_IMAGES, slugify } from "@/lib/catalog";
import bGlorious from "@/assets/brands/glorious-japan.jpg";
import bSakura from "@/assets/brands/sakura-lab.jpg";
import bKyoto from "@/assets/brands/kyoto-botanicals.jpg";
import bYuzu from "@/assets/brands/yuzu-no-mori.jpg";
import bHikari from "@/assets/brands/hikari-beauty.jpg";
import bShiseido from "@/assets/brands/shiseido.jpg";
import bSkii from "@/assets/brands/sk-ii.jpg";
import bHada from "@/assets/brands/hada-labo.jpg";
import { cn } from "@/lib/utils";

interface UserProfile {
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface MobileMenuProps {
  user: UserProfile | null;
  wishlistCount: number;
  onLogout: () => void;
  onNavigate: (to: string) => void;
  className?: string;
}

const COLLECTIONS_ITEMS = [
  {
    href: "/collections/bestsellers",
    icon: Star,
    label: "Bestsellers",
    color: "text-amber-500",
  },
  {
    href: "/collections/new-arrivals",
    icon: Sparkles,
    label: "New Arrivals",
    color: "text-purple-500",
  },
  {
    href: "/collections/combo-gift-sets",
    icon: Gift,
    label: "Combo & Gift Sets",
    color: "text-pink-500",
  },
  {
    href: "/collections/skin-concern",
    icon: Search,
    label: "Shop by Skin Concern",
    color: "text-blue-500",
  },
  {
    href: "/collections/shein",
    icon: Shield,
    label: "SHEIN Products",
    color: "text-emerald-500",
  },
  {
    href: "/collections/pre-order-japan",
    icon: Globe,
    label: "Pre-Order from Japan",
    color: "text-rose-500",
  },
] as const;

const BRANDS_ITEMS = [
  { name: "Glorious Japan", origin: "Tokyo", image: bGlorious.src },
  { name: "Sakura Lab", origin: "Yokohama", image: bSakura.src },
  { name: "Kyoto Botanicals", origin: "Kyoto", image: bKyoto.src },
  { name: "Yuzu No Mori", origin: "Kochi", image: bYuzu.src },
  { name: "Hikari Beauty", origin: "Osaka", image: bHikari.src },
  { name: "Shiseido", origin: "Ginza, Tokyo", image: bShiseido.src },
  { name: "SK-II", origin: "Shiga", image: bSkii.src },
  { name: "Hada Labo", origin: "Osaka", image: bHada.src },
];

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

        <SheetContent side="right" className="w-[90vw] max-w-sm sm:max-w-md overflow-y-auto bg-background p-0 border-l border-border">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 bg-cream/50">
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <img
                  src="/glorious-japan-skin-care-logo.jpeg"
                  alt="Glorious Japan"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover border border-primary/30"
                />
                <span className="absolute -bottom-1 -right-1 rounded-full bg-primary px-1 py-0.2 text-[6.5px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                  Beta
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <SheetTitle className="font-display text-base font-bold leading-tight block">
                    Glorious Japan
                  </SheetTitle>
                  <span className="rounded-full bg-primary/15 border border-primary/35 px-1 py-0.2 text-[7.5px] font-bold uppercase tracking-wider text-primary">
                    Beta
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-primary uppercase">
                  栄光日本 · 美の儀式
                </span>
              </div>
            </div>
          </div>

          <nav className="divide-y divide-border/50 text-sm">
            {/* 1. Main Navigation - Consistent with Desktop Nav */}
            <div className="p-3 space-y-1">
              {/* Home */}
              <Link
                to="/"
                onClick={() => handleLinkClick("/")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors font-medium text-foreground text-[14px]"
              >
                <Home className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <span>Home</span>
              </Link>

              {/* Shop All */}
              <Link
                to="/shop"
                onClick={() => handleLinkClick("/shop")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors font-medium text-foreground text-[14px]"
              >
                <Store className="h-4 w-4 text-primary" strokeWidth={1.75} />
                <span>Shop All</span>
              </Link>

              {/* Categories Accordion with Rounded Thumbnails */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("categories")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium text-[14px]",
                    openSection === "categories" ? "bg-muted/70 text-primary" : "hover:bg-muted/60 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Grid className="h-4 w-4 text-primary" strokeWidth={1.75} />
                    <span>Categories</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200",
                      openSection === "categories" && "rotate-180 text-primary"
                    )}
                  />
                </button>

                {openSection === "categories" && (
                  <div className="mt-1.5 mb-2 ml-4 mr-2 rounded-xl bg-muted/40 p-2.5 border border-border/40 grid grid-cols-2 gap-2 animate-in fade-in duration-200">
                    {CATEGORIES.map((cat, idx) => {
                      const img = PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]!;
                      return (
                        <Link
                          key={cat}
                          to={`/category/${slugify(cat)}`}
                          onClick={() => handleLinkClick(`/category/${slugify(cat)}`)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-background transition-colors group"
                        >
                          <img
                            src={img}
                            alt={cat}
                            className="h-7 w-7 rounded-full object-cover border border-border/80 shrink-0"
                          />
                          <span className="text-xs font-medium text-foreground group-hover:text-primary truncate">
                            {cat}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Collections Accordion with Icons */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("collections")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium text-[14px]",
                    openSection === "collections" ? "bg-muted/70 text-primary" : "hover:bg-muted/60 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.75} />
                    <span>Collections</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200",
                      openSection === "collections" && "rotate-180 text-primary"
                    )}
                  />
                </button>

                {openSection === "collections" && (
                  <div className="mt-1.5 mb-2 ml-4 mr-2 rounded-xl bg-muted/40 p-2 border border-border/40 space-y-1 animate-in fade-in duration-200">
                    {COLLECTIONS_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-background transition-colors"
                      >
                        <item.icon className={cn("h-4 w-4 shrink-0", item.color)} strokeWidth={2} />
                        <span className="text-xs font-medium text-foreground truncate">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands Accordion with Brand Pictures */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("brands")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium text-[14px]",
                    openSection === "brands" ? "bg-muted/70 text-primary" : "hover:bg-muted/60 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Gem className="h-4 w-4 text-primary" strokeWidth={1.75} />
                    <span>Brands</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200",
                      openSection === "brands" && "rotate-180 text-primary"
                    )}
                  />
                </button>

                {openSection === "brands" && (
                  <div className="mt-1.5 mb-2 ml-4 mr-2 rounded-xl bg-muted/40 p-2.5 border border-border/40 grid grid-cols-2 gap-2 animate-in fade-in duration-200">
                    {BRANDS_ITEMS.map((brand) => (
                      <Link
                        key={brand.name}
                        to="/shop"
                        search={{ brand: brand.name }}
                        onClick={() => handleLinkClick("/shop")}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-background transition-colors group"
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="h-7 w-7 rounded-full object-cover border border-border/80 shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-xs font-medium text-foreground group-hover:text-primary truncate block leading-tight">
                            {brand.name}
                          </span>
                          <span className="text-[9px] text-muted-foreground truncate block">
                            {brand.origin}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Offers */}
              <Link
                to="/shop"
                search={{ onSale: true }}
                onClick={() => handleLinkClick("/shop")}
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

              {/* Pre-Order from Japan */}
              <Link
                to="/shop"
                search={{ type: "pre-order-japan" }}
                onClick={() => handleLinkClick("/shop")}
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

            {/* 2. Information Section */}
            <div className="p-3">
              <p className="px-3 pt-2 pb-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                Editorial & Support
              </p>
              <div className="space-y-0.5">
                {[
                  ["/blog", "Beauty Notes (Journal)", BookOpen],
                  ["/about", "Our Story & Philosophy", Info],
                  ["/track", "Track Order", ShoppingBag],
                  ["/faq", "Frequently Asked Questions", HelpCircle],
                  ["/contact", "Contact & Advisory", Phone],
                ].map(([to, label, IconComponent]: any) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => handleLinkClick(to)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-xs text-muted-foreground hover:text-foreground"
                  >
                    <IconComponent className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Account Section */}
            <div className="p-4 bg-muted/20">
              {user ? (
                <div className="space-y-2">
                  <div className="pb-2 border-b border-border/50">
                    <p className="text-xs font-semibold text-foreground">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => handleLinkClick("/account")}
                    className="flex items-center gap-2.5 py-1.5 text-xs text-foreground hover:text-primary transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => handleLinkClick("/wishlist")}
                    className="flex items-center justify-between py-1.5 text-xs text-foreground hover:text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="h-3.5 w-3.5 text-rose" />
                      <span>My Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-primary/10 text-primary px-2 py-0.2 text-[10px] font-semibold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => handleLinkClick("/admin")}
                      className="flex items-center gap-2.5 py-1.5 text-xs text-foreground hover:text-primary transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5 text-primary" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      handleLinkClick("/");
                    }}
                    className="flex w-full items-center gap-2.5 pt-2 text-xs text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <Link
                    to="/auth"
                    onClick={() => handleLinkClick("/auth")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all text-center"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Sign In / Register</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => handleLinkClick("/wishlist")}
                    className="flex items-center justify-between px-3 py-2 rounded-lg border border-border/60 bg-card text-xs text-foreground hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="h-3.5 w-3.5 text-rose" />
                      <span>Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="rounded-full bg-primary/10 text-primary px-2 py-0.2 text-[10px] font-semibold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}