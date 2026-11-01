import { PageKeyConfig } from "./types";

export const PAGE_KEYS: PageKeyConfig[] = [
  { key: "home_hero", label: "Home Page (Hero Carousel)", route: "/" },
  { key: "home_middle", label: "Home Page (Mid-Page Promotion)", route: "/" },
  { key: "shop", label: "Shop Catalog Header", route: "/shop" },
  { key: "collections", label: "Collections Header", route: "/collections" },
  { key: "brands", label: "Brands Directory Banner", route: "/brands" },
  { key: "categories", label: "Categories Hub Header", route: "/categories" },
  { key: "offers", label: "Offers & Deals Header", route: "/offers" },
  { key: "pre_order", label: "Pre-Order Flight Banner", route: "/pre-order" },
  { key: "checkout", label: "Checkout Trust Strip", route: "/checkout" },
];

export const DEFAULT_BANNER_PRESETS = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1600&auto=format&fit=crop&q=80",
];

