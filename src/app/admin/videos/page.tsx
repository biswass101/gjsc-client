"use client";

import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";
import {
  useVideoManagement,
  useVideoModalForm,
  VideoHeader,
  VideoStats,
  VideoToolbar,
  VideoGrid,
  VideoTable,
  VideoFormModal,
  VideoPlayerModal,
  VideoDeleteDialog,
} from "@/features/admin-videos";

export default function AdminVideosPage() {
  const {
    featuredVideos = [],
    products = [],
    addFeaturedVideo,
    updateFeaturedVideo,
    deleteFeaturedVideo,
    toggleFeaturedVideo,
  } = useAdmin();

  const mgmt = useVideoManagement(
    featuredVideos,
    updateFeaturedVideo,
    deleteFeaturedVideo,
    toggleFeaturedVideo,
  );

  const form = useVideoModalForm(products, addFeaturedVideo, updateFeaturedVideo);

  const handleToggle = (id: string, currentlyActive: boolean, title: string) => {
    mgmt.toggleFeaturedVideo(id);
    toast.success(
      currentlyActive ? `Hidden "${title}" from homepage.` : `Activated "${title}" on homepage.`,
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Header */}
      <VideoHeader onOpenCreate={() => form.openCreateModal(mgmt.totalCount)} />

      {/* KPI Statistic Cards */}
      <VideoStats
        totalCount={mgmt.totalCount}
        liveCount={mgmt.liveCount}
        totalEstimatedViews={mgmt.totalEstimatedViews}
        taggedProductsCount={mgmt.taggedProductsCount}
      />

      {/* Toolbar: Search, Filters & View Toggle */}
      <VideoToolbar
        searchQuery={mgmt.searchQuery}
        onSearchQueryChange={mgmt.setSearchQuery}
        statusFilter={mgmt.statusFilter}
        onStatusFilterChange={mgmt.setStatusFilter}
        sortBy={mgmt.sortBy}
        onSortByChange={mgmt.setSortBy}
        viewMode={mgmt.viewMode}
        onViewModeChange={mgmt.setViewMode}
      />

      {/* Videos List / Grid */}
      {mgmt.viewMode === "grid" ? (
        <VideoGrid
          videos={mgmt.filteredVideos}
          searchQuery={mgmt.searchQuery}
          statusFilter={mgmt.statusFilter}
          onOpenCreate={() => form.openCreateModal(mgmt.totalCount)}
          onPreview={(v) => {
            mgmt.setPreviewingVideo(v);
            mgmt.setPreviewPlaying(true);
          }}
          onToggle={handleToggle}
          onMove={mgmt.handleMoveOrder}
          onEdit={form.openEditModal}
          onDelete={(v) => mgmt.setVideoToDelete(v)}
        />
      ) : (
        <VideoTable
          videos={mgmt.filteredVideos}
          onPreview={(v) => {
            mgmt.setPreviewingVideo(v);
            mgmt.setPreviewPlaying(true);
          }}
          onToggle={handleToggle}
          onMove={mgmt.handleMoveOrder}
          onEdit={form.openEditModal}
          onDelete={(v) => mgmt.setVideoToDelete(v)}
        />
      )}

      {/* Create / Edit Dialog */}
      <VideoFormModal
        isOpen={form.isModalOpen}
        onOpenChange={form.setIsModalOpen}
        editingVideo={form.editingVideo}
        products={products}
        onSubmit={form.handleSave}
        title={form.title}
        setTitle={form.setTitle}
        caption={form.caption}
        setCaption={form.setCaption}
        duration={form.duration}
        setDuration={form.setDuration}
        views={form.views}
        setViews={form.setViews}
        thumbnail={form.thumbnail}
        setThumbnail={form.setThumbnail}
        videoUrl={form.videoUrl}
        setVideoUrl={form.setVideoUrl}
        creatorName={form.creatorName}
        setCreatorName={form.setCreatorName}
        creatorHandle={form.creatorHandle}
        setCreatorHandle={form.setCreatorHandle}
        creatorAvatar={form.creatorAvatar}
        setCreatorAvatar={form.setCreatorAvatar}
        selectedProductSlug={form.selectedProductSlug}
        onSelectProduct={form.handleSelectProduct}
        productName={form.productName}
        setProductName={form.setProductName}
        productBrand={form.productBrand}
        setProductBrand={form.setProductBrand}
        productPrice={form.productPrice}
        setProductPrice={form.setProductPrice}
        productCompareAt={form.productCompareAt}
        setProductCompareAt={form.setProductCompareAt}
        active={form.active}
        setActive={form.setActive}
        featured={form.featured}
        setFeatured={form.setFeatured}
        order={form.order}
        setOrder={form.setOrder}
      />

      {/* Video Player Preview Modal */}
      <VideoPlayerModal
        video={mgmt.previewingVideo}
        isPlaying={mgmt.previewPlaying}
        isMuted={mgmt.previewMuted}
        videoPlayerRef={mgmt.videoPlayerRef}
        onClose={() => mgmt.setPreviewingVideo(null)}
        onTogglePlay={() => mgmt.setPreviewPlaying(!mgmt.previewPlaying)}
        onToggleMute={() => mgmt.setPreviewMuted(!mgmt.previewMuted)}
      />

      {/* Delete Confirmation Alert */}
      <VideoDeleteDialog
        video={mgmt.videoToDelete}
        onClose={() => mgmt.setVideoToDelete(null)}
        onConfirm={mgmt.handleDeleteConfirm}
      />
    </div>
  );
}
