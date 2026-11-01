import type { Product } from "@/types";

export interface CollectionMeta {
  slug: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  description: string;
  metaDescription: string;
  badgeText: string;
  themeColor: string;
  gradientClass: string;
  bannerImage: string;
  frequentlySearched: string[];
  aliases: string[];
  filterPredicate: (product: Product) => boolean;
}

