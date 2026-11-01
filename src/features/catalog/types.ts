/**
 * Unified Catalog Types for Glorious Japan Skin Care Platform
 */

export interface CatalogFacetItem {
  name: string;
  count: number;
}

export interface CatalogFilterState {
  searchQuery?: string;
  selectedCategories?: string[];
  selectedBrands?: string[];
  selectedConcerns?: string[];
  selectedSkinTypes?: string[];
  selectedBadges?: string[];
  selectedSubcategory?: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

export type CatalogSortOption =
  | "popular"
  | "bestselling"
  | "price-low"
  | "price-high"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest"
  | "curated";

export interface CatalogFilterProps {
  filters: CatalogFilterState;
  onFilterChange: (updates: Partial<CatalogFilterState>) => void;
  onResetFilters: () => void;
  availableCategories?: CatalogFacetItem[];
  availableBrands?: CatalogFacetItem[];
  availableConcerns?: CatalogFacetItem[];
  availableSkinTypes?: CatalogFacetItem[];
  availableBadges?: CatalogFacetItem[];
  availableSubcategories?: string[];
  priceBounds: { min: number; max: number };
  activeFilterCount: number;
  filteredCount?: number;
  /** Custom title for drawer / heading */
  title?: string;
  /** Hide specific facets if already filtered at the page level */
  hideCategories?: boolean;
  hideBrands?: boolean;
  hideConcerns?: boolean;
  hideSkinTypes?: boolean;
  hideBadges?: boolean;
}
