export type BadgeType = "New" | "Best Seller" | "Trending" | "Flash Sale";

export type ProductType = "pre-order-japan" | "shein";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number | undefined;
  rating: number;
  reviews: number;
  image: string;
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
}

export interface CategoryGroup {
  label: string;
  categories: string[];
}

