import { AdminBrand } from "@/context/admin-context";

export interface BrandFilterState {
  searchQuery: string;
  selectedOrigin: string;
}

export interface BrandFormData {
  name: string;
  slug: string;
  kanji: string;
  origin: string;
  established: string;
  category: string;
  tagline: string;
  description: string;
  logo: string;
  bannerImage: string;
  featured: boolean;
  itemCount: string;
}

