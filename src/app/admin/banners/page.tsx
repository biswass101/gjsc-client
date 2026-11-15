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
    ctaLink,
    setCtaLink,
    active,
    setActive,
    order,
    setOrder,
    gradient,
    setGradient,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
    customOpacity,
    setCustomOpacity,
    openCreateModal,
    openEditModal,
    handleSave,
  } = useBannerModalForm();

  const handleConfirmDelete = async () => {
    if (!bannerToDelete) return;
    await deleteBanner(bannerToDelete.id);
    toast.success(`Banner "${bannerToDelete.title || bannerToDelete.pageTitle}" removed.`);
    setBannerToDelete(null);
  };

  const handleToggleActive = async (banner: AdminBanner) => {
    await updateBanner(banner.id, { active: !banner.active });
    toast.success(
      `Banner "${banner.title || banner.pageTitle}" is now ${!banner.active ? "LIVE on storefront" : "hidden/inactive"}.`,
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
        ctaLink={ctaLink}
        setCtaLink={setCtaLink}
        order={order}
        setOrder={setOrder}
        active={active}
        setActive={setActive}
        gradient={gradient}
        setGradient={setGradient}
        customStart={customStart}
        setCustomStart={setCustomStart}
        customEnd={customEnd}
        setCustomEnd={setCustomEnd}
        customOpacity={customOpacity}
        setCustomOpacity={setCustomOpacity}
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
