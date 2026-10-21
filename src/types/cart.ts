import type { Product } from "./product";

export interface CartLine {
  slug: string;
  qty: number;
  size: string;
}

export interface CartProductLine {
  product: Product;
  qty: number;
  size: string;
}

