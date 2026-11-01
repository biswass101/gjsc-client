import { Link } from "@/lib/navigation";
import {
  ChevronDown,
  ChevronRight,
  Gem,
  Gift,
  Globe,
  Grid,
  Search,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
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

interface MobileNavAccordionsProps {
  openSection: string | null;
  toggleSection: (section: string) => void;
  onLinkClick: (to: string) => void;
}

export function MobileNavAccordions({
  openSection,
  toggleSection,
  onLinkClick,
}: MobileNavAccordionsProps) {
  return (
    <>
      {/* Categories Accordion */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("categories")}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium text-[14px]",
            openSection === "categories"
              ? "bg-muted/70 text-primary"
              : "hover:bg-muted/60 text-foreground"
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
                  onClick={() => onLinkClick(`/category/${slugify(cat)}`)}
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

      {/* Collections Accordion */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("collections")}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium text-[14px]",
            openSection === "collections"
              ? "bg-muted/70 text-primary"
              : "hover:bg-muted/60 text-foreground"
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
                onClick={() => onLinkClick(item.href)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-background transition-colors"
              >
                <item.icon className={cn("h-4 w-4 shrink-0", item.color)} strokeWidth={2} />
                <span className="text-xs font-medium text-foreground truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Brands Accordion */}
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
          <div className="mt-1.5 mb-2 ml-4 mr-2 rounded-xl bg-muted/40 p-2.5 border border-border/40 animate-in fade-in duration-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {BRANDS_ITEMS.map((brand) => {
                const brandHref = `/brands/${slugify(brand.name)}`;
                return (
                  <Link
                    key={brand.name}
                    to={brandHref}
                    onClick={() => onLinkClick(brandHref)}
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
                );
              })}
            </div>

            <div className="pt-2 border-t border-border/40">
              <Link
                to="/brands"
                onClick={() => onLinkClick("/brands")}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-background/80 hover:bg-background border border-border/60 text-xs font-semibold text-primary transition-colors"
              >
                <span>View All Brands Directory</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

