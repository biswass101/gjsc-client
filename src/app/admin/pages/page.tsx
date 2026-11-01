"use client";

import React from "react";
import { useAdmin } from "@/context/admin-context";
import {
  PagesHeader,
  PagesKpiCards,
  PagesSearchBar,
  PagesGrid,
  PageEditModal,
  usePagesFilter,
  usePageModalForm,
} from "@/features/admin-pages";

export default function AdminPagesContentPage() {
  const { pageMetas } = useAdmin();

  const { searchQuery, setSearchQuery, filteredPages } = usePagesFilter(pageMetas);

  const {
    editingPage,
    isModalOpen,
    setIsModalOpen,
    title,
    setTitle,
    metaDescription,
    setMetaDescription,
    heroHeading,
    setHeroHeading,
    heroSubheading,
    setHeroSubheading,
    badgeText,
    setBadgeText,
    openEditModal,
    handleSave,
  } = usePageModalForm();

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <PagesHeader />

      <PagesKpiCards pageMetas={pageMetas} />

      <PagesSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCount={filteredPages.length}
      />

      <PagesGrid pages={filteredPages} onEdit={openEditModal} />

      <PageEditModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingPage={editingPage}
        title={title}
        setTitle={setTitle}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
        heroHeading={heroHeading}
        setHeroHeading={setHeroHeading}
        heroSubheading={heroSubheading}
        setHeroSubheading={setHeroSubheading}
        badgeText={badgeText}
        setBadgeText={setBadgeText}
        onSubmit={handleSave}
      />
    </div>
  );
}
