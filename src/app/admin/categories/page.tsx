"use client";

import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAdmin, AdminCategory } from "@/context/admin-context";
import {
  useCategoriesFilter,
  useCategoryModalForm,
  CategoriesHeader,
  CategoriesKpiCards,
  CategoriesFiltersBar,
  CategoriesGrid,
  CategoryFormModal,
  CategoryDeleteDialog,
} from "@/features/admin-categories";

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();

  const filterState = useCategoriesFilter(categories);
  const modalForm = useCategoryModalForm({ addCategory, updateCategory });

  const [categoryToDelete, setCategoryToDelete] = useState<AdminCategory | null>(null);

  const handleConfirmDelete = useCallback(() => {
    if (!categoryToDelete) return;
    deleteCategory(categoryToDelete.id);
    toast.success(`Category "${categoryToDelete.title}" removed.`);
    setCategoryToDelete(null);
  }, [categoryToDelete, deleteCategory]);

  const handleToggleFeatured = useCallback(
    (cat: AdminCategory) => {
      updateCategory(cat.id, { featured: !cat.featured });
      toast.success(
        `Category "${cat.title}" ${!cat.featured ? "marked as Featured" : "removed from Featured"}.`,
      );
    },
    [updateCategory],
  );

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <CategoriesHeader onOpenCreate={modalForm.openCreateModal} />

      <CategoriesKpiCards
        totalCategories={categories.length}
        totalSubcategories={filterState.totalSubcats}
        featuredCount={filterState.featuredCount}
        avgProductsPerCat={filterState.avgProductsPerCat}
      />

      <CategoriesFiltersBar
        searchQuery={filterState.searchQuery}
        onSearchChange={filterState.setSearchQuery}
        selectedParent={filterState.selectedParent}
        onSelectParent={filterState.setSelectedParent}
        allCategories={categories}
      />

      <CategoriesGrid
        categories={filterState.filteredCategories}
        onEdit={modalForm.openEditModal}
        onDeleteRequest={setCategoryToDelete}
        onToggleFeatured={handleToggleFeatured}
        onOpenCreate={modalForm.openCreateModal}
      />

      <CategoryFormModal
        isOpen={modalForm.isModalOpen}
        onOpenChange={modalForm.setIsModalOpen}
        editingCategory={modalForm.editingCategory}
        onSubmit={modalForm.handleSave}
        title={modalForm.title}
        onTitleChange={modalForm.handleTitleChange}
        slug={modalForm.slug}
        setSlug={modalForm.setSlug}
        japaneseTitle={modalForm.japaneseTitle}
        setJapaneseTitle={modalForm.setJapaneseTitle}
        parentCategory={modalForm.parentCategory}
        setParentCategory={modalForm.setParentCategory}
        tagline={modalForm.tagline}
        setTagline={modalForm.setTagline}
        description={modalForm.description}
        setDescription={modalForm.setDescription}
        image={modalForm.image}
        setImage={modalForm.setImage}
        featured={modalForm.featured}
        setFeatured={modalForm.setFeatured}
        itemCount={modalForm.itemCount}
        setItemCount={modalForm.setItemCount}
        subcategories={modalForm.subcategories}
        newSubcatInput={modalForm.newSubcatInput}
        setNewSubcatInput={modalForm.setNewSubcatInput}
        onAddSubcat={modalForm.handleAddSubcat}
        onRemoveSubcat={modalForm.handleRemoveSubcat}
      />

      <CategoryDeleteDialog
        categoryToDelete={categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
