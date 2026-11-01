"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAdmin, AdminBrand } from "@/context/admin-context";
import {
  BrandsHeader,
  BrandsKpiCards,
  BrandsSearchBar,
  BrandsGrid,
  BrandFormModal,
  BrandDeleteDialog,
  useBrandsFilter,
  useBrandModalForm,
} from "@/features/admin-brands";

export default function AdminBrandsPage() {
  const { brands, updateBrand, deleteBrand } = useAdmin();
  const [brandToDelete, setBrandToDelete] = useState<AdminBrand | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    selectedOrigin,
    setSelectedOrigin,
    filteredBrands,
    featuredCount,
    tokyoBrandsCount,
    totalProducts,
  } = useBrandsFilter(brands);

  const {
    isModalOpen,
    setIsModalOpen,
    editingBrand,
    name,
    slug,
    setSlug,
    kanji,
    setKanji,
    origin,
    setOrigin,
    established,
    setEstablished,
    category,
    setCategory,
    tagline,
    setTagline,
    description,
    setDescription,
    logo,
    setLogo,
    featured,
    setFeatured,
    itemCount,
    setItemCount,
    openCreateModal,
    openEditModal,
    handleNameChange,
    handleSave,
  } = useBrandModalForm();

  const handleToggleFeatured = (brand: AdminBrand) => {
    updateBrand(brand.id, { featured: !brand.featured });
    toast.success(
      `Brand "${brand.name}" ${!brand.featured ? "highlighted as Featured" : "removed from Featured"}.`,
    );
  };

  const handleConfirmDelete = () => {
    if (!brandToDelete) return;
    deleteBrand(brandToDelete.id);
    toast.success(`Brand "${brandToDelete.name}" deleted.`);
    setBrandToDelete(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <BrandsHeader onAddBrand={openCreateModal} />

      <BrandsKpiCards
        totalCount={brands.length}
        tokyoCount={tokyoBrandsCount}
        featuredCount={featuredCount}
        totalProducts={totalProducts}
      />

      <BrandsSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrigin={selectedOrigin}
        setSelectedOrigin={setSelectedOrigin}
        brands={brands}
      />

      <BrandsGrid
        brands={filteredBrands}
        onOpenCreate={openCreateModal}
        onEdit={openEditModal}
        onDelete={(brand) => setBrandToDelete(brand)}
        onToggleFeatured={handleToggleFeatured}
      />

      <BrandFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingBrand={editingBrand}
        name={name}
        onNameChange={handleNameChange}
        kanji={kanji}
        setKanji={setKanji}
        slug={slug}
        setSlug={setSlug}
        origin={origin}
        setOrigin={setOrigin}
        category={category}
        setCategory={setCategory}
        established={established}
        setEstablished={setEstablished}
        tagline={tagline}
        setTagline={setTagline}
        description={description}
        setDescription={setDescription}
        logo={logo}
        setLogo={setLogo}
        featured={featured}
        setFeatured={setFeatured}
        itemCount={itemCount}
        setItemCount={setItemCount}
        onSubmit={handleSave}
      />

      <BrandDeleteDialog
        brandToDelete={brandToDelete}
        onClose={() => setBrandToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
