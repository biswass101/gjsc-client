"use client";

import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAdmin, AdminCollection } from "@/context/admin-context";
import {
  useCollectionsFilter,
  useCollectionModalForm,
  CollectionsHeader,
  CollectionsKpiCards,
  CollectionsSearchBar,
  CollectionsGrid,
  CollectionFormModal,
  CollectionDeleteDialog,
} from "@/features/admin-collections";

export default function AdminCollectionsPage() {
  const { collections, addCollection, updateCollection, deleteCollection } = useAdmin();

  const filterState = useCollectionsFilter(collections);
  const modalForm = useCollectionModalForm({ addCollection, updateCollection });

  const [collectionToDelete, setCollectionToDelete] = useState<AdminCollection | null>(null);

  const handleConfirmDelete = useCallback(() => {
    if (!collectionToDelete) return;
    deleteCollection(collectionToDelete.id);
    toast.success(`Collection "${collectionToDelete.title}" deleted.`);
    setCollectionToDelete(null);
  }, [collectionToDelete, deleteCollection]);

  const handleToggleFeatured = useCallback(
    (col: AdminCollection) => {
      updateCollection(col.id, { featured: !col.featured });
      toast.success(
        `Collection "${col.title}" ${!col.featured ? "highlighted as Featured" : "removed from Featured"}.`,
      );
    },
    [updateCollection],
  );

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <CollectionsHeader onOpenCreate={modalForm.openCreateModal} />

      <CollectionsKpiCards
        totalCollections={collections.length}
        featuredCount={filterState.featuredCount}
        totalKeywords={filterState.totalKeywords}
        totalBundledSkus={filterState.totalBundledSkus}
      />

      <CollectionsSearchBar
        searchQuery={filterState.searchQuery}
        onSearchChange={filterState.setSearchQuery}
        filteredCount={filterState.filteredCollections.length}
        totalCount={collections.length}
      />

      <CollectionsGrid
        collections={filterState.filteredCollections}
        onEdit={modalForm.openEditModal}
        onDeleteRequest={setCollectionToDelete}
        onToggleFeatured={handleToggleFeatured}
        onOpenCreate={modalForm.openCreateModal}
      />

      <CollectionFormModal
        isOpen={modalForm.isModalOpen}
        onOpenChange={modalForm.setIsModalOpen}
        editingCollection={modalForm.editingCollection}
        onSubmit={modalForm.handleSave}
        title={modalForm.title}
        onTitleChange={modalForm.handleTitleChange}
        slug={modalForm.slug}
        setSlug={modalForm.setSlug}
        japaneseTitle={modalForm.japaneseTitle}
        setJapaneseTitle={modalForm.setJapaneseTitle}
        tagline={modalForm.tagline}
        setTagline={modalForm.setTagline}
        description={modalForm.description}
        setDescription={modalForm.setDescription}
        badgeText={modalForm.badgeText}
        setBadgeText={modalForm.setBadgeText}
        bannerImage={modalForm.bannerImage}
        setBannerImage={modalForm.setBannerImage}
        themeColor={modalForm.themeColor}
        setThemeColor={modalForm.setThemeColor}
        featured={modalForm.featured}
        setFeatured={modalForm.setFeatured}
        itemCount={modalForm.itemCount}
        setItemCount={modalForm.setItemCount}
        frequentlySearched={modalForm.frequentlySearched}
        newTagInput={modalForm.newTagInput}
        setNewTagInput={modalForm.setNewTagInput}
        onAddTag={modalForm.handleAddTag}
        onRemoveTag={modalForm.handleRemoveTag}
      />

      <CollectionDeleteDialog
        collectionToDelete={collectionToDelete}
        onOpenChange={(open) => !open && setCollectionToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
