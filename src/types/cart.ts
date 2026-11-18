import type { Product } from "./product";

export interface CartLine {
  id?: number | undefined;
  slug: string;
  qty: number;
  size: string;
  product?: Product | undefined;
}

export interface CartProductLine {
  id?: number | undefined;
  product: Product;
  qty: number;
  size: string;
}
