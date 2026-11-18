import type { AdminCategory } from "@/types";

export interface CategoryFormData {
  title: string;
  slug: string;
  japaneseTitle: string;
  parentCategory: string;
  tagline: string;
  description: string;
  metaDescription: string;
  image: string;
  bannerImage: string;
  icon: string;
  featured: boolean;
  itemCount: string;
  subcategories: string[];
  popularTags: string[];
  newSubcatInput: string;
  ritualStepNumber: string;
  ritualStepLabel: string;
}

