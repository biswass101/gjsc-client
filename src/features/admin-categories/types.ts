import type { AdminCategory } from "@/types";

export interface CategoryFormData {
  title: string;
  slug: string;
  japaneseTitle: string;
  parentCategory: string;
  tagline: string;
  description: string;
  image: string;
  bannerImage: string;
  featured: boolean;
  itemCount: string;
  subcategories: string[];
  newSubcatInput: string;
}

