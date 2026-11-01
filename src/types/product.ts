export type BadgeType = "New" | "Best Seller" | "Trending" | "Flash Sale" | "Exclusive";

export type ProductType = "in-stock" | "pre-order-japan" | "shein";

export interface Product {
  id: string;
  slug: string;
  name: string;
  japaneseName?: string | undefined;
  brand: string;
  category: string;
  price: number;
  compareAt?: number | undefined;
  rating: number;
  reviews: number;
  image: string;
  images?: string[] | undefined;
  short: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  howTo: string;
  skinTypes: string[];
  concerns: string[];
  stock: number;
  badge?: BadgeType | undefined;
  sizes: string[];
  type?: ProductType | undefined;
  origin?: string | undefined;
  texture?: string | undefined;
  pao?: string | undefined;
  spf?: string | undefined;
  barcode?: string | undefined;
  sku?: string | undefined;
}

export interface CategoryGroup {
  label: string;
  categories: string[];
}
