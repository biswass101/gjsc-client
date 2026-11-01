export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  japaneseName?: string | undefined;
  brand: string;
  category: string;
  productType?: "in-stock" | "pre-order-japan" | "shein" | undefined;
  price: number;
  compareAt?: number | undefined;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  sku: string;
  barcode?: string | undefined;
  badge?: "Best Seller" | "Flash Sale" | "Trending" | "New" | "Exclusive" | null | undefined;
  status: "active" | "draft" | "archived";
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  short: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  howTo: string;
  skinTypes: string[];
  concerns: string[];
  sizes: string[];
  origin?: string | undefined;
  texture?: string | undefined;
  pao?: string | undefined;
  spf?: string | undefined;
  createdAt: string;
  salesCount: number;
}

export interface AdminCategory {
  id: string;
  slug: string;
  title: string;
  japaneseTitle?: string | undefined;
  tagline: string;
  description: string;
  image: string;
  bannerImage?: string | undefined;
  parentCategory: string; // e.g. "Skincare", "Hair", "Body", "Makeup"
  subcategories: string[];
  featured: boolean;
  itemCount: number;
}

export interface AdminCollection {
  id: string;
  slug: string;
  title: string;
  japaneseTitle?: string | undefined;
  tagline: string;
  description: string;
  badgeText?: string | undefined;
  bannerImage: string;
  themeColor: string;
  frequentlySearched: string[];
  featured: boolean;
  itemCount: number;
}

export interface AdminBrand {
  id: string;
  slug: string;
  name: string;
  kanji?: string | undefined;
  origin: string;
  tagline: string;
  description: string;
  category: string;
  logo: string;
  bannerImage?: string | undefined;
  established?: string | undefined;
  featured: boolean;
  itemCount: number;
}

export interface AdminPreOrder {
  id: string;
  productName: string;
  japaneseName?: string | undefined;
  brand: string;
  category: string;
  price: number;
  depositPercent: number;
  estimatedArrival: string;
  slotsTotal: number;
  slotsBooked: number;
  batchStatus:
    | "Booking Open"
    | "Tokyo Sourcing"
    | "Air-Freight"
    | "Customs Cleared"
    | "Ready for Delivery";
  image: string;
  active: boolean;
  notes?: string | undefined;
}

