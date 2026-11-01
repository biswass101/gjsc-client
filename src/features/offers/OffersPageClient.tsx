"use client";

import { Layout, GoToTop } from "@/components/layout";
import { OffersPromoHeader } from "./components/OffersPromoHeader";
import { OffersFilterBar } from "./components/OffersFilterBar";
import { OffersProductCatalog } from "./components/OffersProductCatalog";
import { useOffersProducts } from "./hooks/useOffersProducts";

export function OffersPageClient() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDealType,
    setSelectedDealType,
    view,
    setView,
    sortBy,
    setSortBy,
    offerProducts,
    availableCategories,
    sortedProducts,
  } = useOffersProducts();

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedDealType("all");
  };

  return (
    <Layout>
      {/* 1. Page Header & Active Promo Codes Carousel */}
      <OffersPromoHeader />

      {/* 2. Deal Type Filter Pills & View Controls */}
      <OffersFilterBar
        selectedDealType={selectedDealType}
        onSelectDealType={setSelectedDealType}
        dealCount={offerProducts.length}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        view={view}
        onViewChange={setView}
        availableCategories={availableCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Products Catalog Grid / Empty State */}
      <OffersProductCatalog
        products={sortedProducts}
        view={view}
        onResetFilters={handleResetFilters}
      />

      <GoToTop />
    </Layout>
  );
}
