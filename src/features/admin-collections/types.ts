export interface CollectionFormData {
  title: string;
  slug: string;
  japaneseTitle: string;
  tagline: string;
  description: string;
  badgeText: string;
  bannerImage: string;
  themeColor: string;
  featured: boolean;
  itemCount: string;
  frequentlySearched: string[];
  newTagInput: string;
}

export interface ThemeColorOption {
  name: string;
  hex: string;
}

