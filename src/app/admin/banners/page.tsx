"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAdmin, AdminBanner } from "@/context/admin-context";
import {
  BannersHeader,
  BannersKpiCards,
  BannersSearchBar,
  BannersGrid,
  BannerFormModal,
  BannerDeleteDialog,
  useBannersFilter,
  useBannerModalForm,
} from "@/features/admin-banners";

export default function AdminBannersPage() {
  const { banners, updateBanner, deleteBanner } = useAdmin();
  const [bannerToDelete, setBannerToDelete] = useState<AdminBanner | null>(null);

  const {
    selectedPageFilter,
    setSelectedPageFilter,
    searchQuery,
    setSearchQuery,
    filteredBanners,
    activeCount,
    coveredPagesCount,
  } = useBannersFilter(banners);

  const {
    isModalOpen,
    setIsModalOpen,
    editingBanner,
    pageKey,
    setPageKey,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    badge,
    setBadge,
    imageUrl,
    setImageUrl,
    mobileImageUrl,
    setMobileImageUrl,
    ctaText,
    setCtaText,
    ctaLink,
    setCtaLink,
    active,
    setActive,
    order,
    setOrder,
    openCreateModal,
    openEditModal,
    handleSave,
  } = useBannerModalForm();

  const handleConfirmDelete = () => {
    if (!bannerToDelete) return;
    deleteBanner(bannerToDelete.id);
    toast.success(`Banner "${bannerToDelete.title}" removed.`);
    setBannerToDelete(null);
  };

  const handleToggleActive = (banner: AdminBanner) => {
    updateBanner(banner.id, { active: !banner.active });
    toast.success(
      `Banner "${banner.title}" is now ${!banner.active ? "LIVE on storefront" : "hidden/inactive"}.`,
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <BannersHeader onCreateBanner={openCreateModal} />

      <BannersKpiCards
        totalBanners={banners.length}
        activeCount={activeCount}
        coveredPagesCount={coveredPagesCount}
        mobileReadyCount={banners.filter((b) => b.mobileImageUrl).length}
      />

      <BannersSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPageFilter={selectedPageFilter}
        setSelectedPageFilter={setSelectedPageFilter}
        banners={banners}
        filteredCount={filteredBanners.length}
      />

      <BannersGrid
        banners={filteredBanners}
        onOpenCreate={openCreateModal}
        onEdit={openEditModal}
        onDelete={(banner) => setBannerToDelete(banner)}
        onToggleActive={handleToggleActive}
      />

      <BannerFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingBanner={editingBanner}
        pageKey={pageKey}
        setPageKey={setPageKey}
        title={title}
        setTitle={setTitle}
        badge={badge}
        setBadge={setBadge}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        mobileImageUrl={mobileImageUrl}
        setMobileImageUrl={setMobileImageUrl}
        ctaText={ctaText}
        setCtaText={setCtaText}
        ctaLink={ctaLink}
        setCtaLink={setCtaLink}
        order={order}
        setOrder={setOrder}
        active={active}
        setActive={setActive}
        onSubmit={handleSave}
      />

      <BannerDeleteDialog
        bannerToDelete={bannerToDelete}
        onClose={() => setBannerToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
