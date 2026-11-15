"use client";

import { useMemo } from "react";
import { Layout, GoToTop } from "@/components/layout";
import { useAdmin } from "@/context/admin-context";
import { getCollectionMeta, normalizeCollectionSlug } from "../data/collectionMetadata";
import { CollectionHero } from "./CollectionHero";
import { CollectionBreadcrumb } from "./CollectionBreadcrumb";
import { CollectionFrequentlySearched } from "./CollectionFrequentlySearched";
import { CollectionFilterSidebar, CollectionFilterDrawer } from "./CollectionFilters";
import { CollectionActiveFilters } from "./CollectionActiveFilters";
import { CollectionProductGrid } from "./CollectionProductGrid";
import { useCollectionProducts } from "../hooks/useCollectionProducts";

interface CollectionPageClientProps {
  slug: string;
}

export function CollectionPageClient({ slug }: CollectionPageClientProps) {
  const { collections: adminCollections } = useAdmin();

  const meta = useMemo(() => {
    const staticMeta = getCollectionMeta(slug);
    const normalized = normalizeCollectionSlug(slug);
    const adminCol = adminCollections.find(
      (c) =>
        c.slug === normalized ||
        c.slug === slug ||
        c.title.toLowerCase() === normalized.replace(/-/g, " ") ||
        c.title.toLowerCase() === slug.toLowerCase()
    );

    if (adminCol) {
      const frequentlySearched =
        adminCol.frequentlySearched && adminCol.frequentlySearched.length > 0
          ? adminCol.frequentlySearched
          : staticMeta.frequentlySearched;

      return {
        ...staticMeta,
        title: adminCol.title,
        japaneseTitle: adminCol.japaneseTitle || staticMeta.japaneseTitle,
        tagline: adminCol.tagline || staticMeta.tagline,
        description: adminCol.description || staticMeta.description,
        badgeText: adminCol.badgeText || staticMeta.badgeText,
        bannerImage: adminCol.bannerImage || staticMeta.bannerImage,
        frequentlySearched,
        aliases: Array.from(new Set([normalized, ...(staticMeta.aliases || [])])),
        filterPredicate: (p: any) => {
          if (staticMeta.filterPredicate && staticMeta.filterPredicate(p)) return true;
          const pName = (p.name || "").toLowerCase();
          const pCat = (p.category || "").toLowerCase();
          const pBrand = (p.brand || "").toLowerCase();
          const normTitle = adminCol.title.toLowerCase();
          if (pName.includes(normTitle) || pCat.includes(normTitle) || pBrand.includes(normTitle)) {
            return true;
          }
          return frequentlySearched.some(
            (tag) =>
              pName.includes(tag.toLowerCase()) ||
              pCat.includes(tag.toLowerCase()) ||
              pBrand.includes(tag.toLowerCase())
          );
        },
      };
    }

    return staticMeta;
  }, [slug, adminCollections]);
  const {
    priceBounds,
    filters,
    sortBy,
    setSortBy,
    view,
    setView,
    currentPage,
    handleFilterChange,
    handleResetFilters,
    availableCategories,
    availableBrands,
    availableConcerns,
    availableSkinTypes,
    activeFilterCount,
    sortedProducts,
    totalPages,
    paginatedProducts,
    handlePageChange,
  } = useCollectionProducts(meta);

  return (
    <Layout>
      {/* 1. Breadcrumb: Home > Collections > [Collection Title] */}
      <div className="container-lux pt-3">
        <CollectionBreadcrumb title={meta.title} />
      </div>

      {/* 2. Image Banner Section */}
      <CollectionHero meta={meta} />

      {/* 3. Main Collection Body */}
      <div className="container-lux py-4 sm:py-6">
        {/* 4. Filter & Product Section */}
        <div className="flex items-start gap-8">
          {/* Desktop Sidebar Filters */}
          <CollectionFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            availableCategories={availableCategories}
            availableBrands={availableBrands}
            availableConcerns={availableConcerns}
            availableSkinTypes={availableSkinTypes}
            priceBounds={priceBounds}
            activeFilterCount={activeFilterCount}
            filteredCount={sortedProducts.length}
          />

          {/* Product Listing Main Area */}
          <main className="flex-1 min-w-0">
            {/* Active Filters Toolbar with mobile drawer trigger */}
            <CollectionActiveFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              view={view}
              onViewChange={setView}
              totalResults={sortedProducts.length}
              priceBounds={priceBounds}
              drawerTriggerSlot={
                <CollectionFilterDrawer
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  availableCategories={availableCategories}
                  availableBrands={availableBrands}
                  availableConcerns={availableConcerns}
                  availableSkinTypes={availableSkinTypes}
                  priceBounds={priceBounds}
                  activeFilterCount={activeFilterCount}
                  filteredCount={sortedProducts.length}
                />
              }
            />

            {/* Products Grid / List */}
            <CollectionProductGrid
              products={paginatedProducts}
              view={view}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onResetFilters={handleResetFilters}
            />

            {/* Frequently Searched Section at bottom of the products */}
            <div className="mt-10">
              <CollectionFrequentlySearched
                collectionTitle={meta.title}
                items={meta.frequentlySearched}
                activeSearchQuery={filters.searchQuery}
                onSelectQuery={(query) => {
                  handleFilterChange({ searchQuery: query });
                  window.scrollTo({ top: 380, behavior: "smooth" });
                }}
                onClearQuery={() => handleFilterChange({ searchQuery: "" })}
              />
            </div>
          </main>
        </div>
      </div>

      <GoToTop />
    </Layout>
  );
}
