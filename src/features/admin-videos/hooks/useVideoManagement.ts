"use client";

import { useState, useMemo, useRef } from "react";
import { toast } from "sonner";
import type { AdminFeaturedVideo } from "@/context/admin-context";
import type { VideoViewMode, VideoStatusFilter } from "../types";

export function useVideoManagement(
  featuredVideos: AdminFeaturedVideo[],
  updateFeaturedVideo: (id: string, updates: Partial<AdminFeaturedVideo>) => void,
  deleteFeaturedVideo: (id: string) => void,
  toggleFeaturedVideo: (id: string) => void,
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<VideoStatusFilter>("all");
  const [sortBy, setSortBy] = useState<"order" | "views" | "newest">("order");
  const [viewMode, setViewMode] = useState<VideoViewMode>("grid");

  // Delete Alert
  const [videoToDelete, setVideoToDelete] = useState<AdminFeaturedVideo | null>(null);

  // Video Preview Dialog in Admin
  const [previewingVideo, setPreviewingVideo] = useState<AdminFeaturedVideo | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(true);
  const [previewMuted, setPreviewMuted] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  // Filtered & sorted videos
  const filteredVideos = useMemo(() => {
    return (featuredVideos || [])
      .filter((v) => {
        const matchesStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
              ? v.active !== false
              : v.active === false;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          v.title.toLowerCase().includes(q) ||
          v.creatorName.toLowerCase().includes(q) ||
          v.creatorHandle.toLowerCase().includes(q) ||
          v.product.name.toLowerCase().includes(q) ||
          v.product.brand.toLowerCase().includes(q);

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "order") return (a.order ?? 0) - (b.order ?? 0);
        if (sortBy === "views") {
          const vA = parseFloat(a.views.replace(/[^0-9.]/g, "")) || 0;
          const vB = parseFloat(b.views.replace(/[^0-9.]/g, "")) || 0;
          return vB - vA;
        }
        if (sortBy === "newest") {
          return (b.createdAt || "").localeCompare(a.createdAt || "");
        }
        return 0;
      });
  }, [featuredVideos, statusFilter, searchQuery, sortBy]);

  // Statistics
  const totalCount = (featuredVideos || []).length;
  const liveCount = (featuredVideos || []).filter((v) => v.active !== false).length;
  const totalEstimatedViews = useMemo(() => {
    return (featuredVideos || []).reduce((acc, curr) => {
      const num = parseFloat(curr.views.replace(/[^0-9.]/g, "")) || 0;
      return acc + (curr.views.includes("K") ? num * 1000 : num);
    }, 0);
  }, [featuredVideos]);

  const taggedProductsCount = useMemo(() => {
    const slugs = new Set((featuredVideos || []).map((v) => v.product.slug));
    return slugs.size;
  }, [featuredVideos]);

  const handleMoveOrder = (video: AdminFeaturedVideo, direction: "up" | "down") => {
    const list = [...(featuredVideos || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const index = list.findIndex((v) => v.id === video.id);
    if (index === -1) return;

    if (direction === "up" && index > 0) {
      const prev = list[index - 1];
      if (!prev) return;
      const currentOrder = video.order;
      updateFeaturedVideo(video.id, { order: prev.order });
      updateFeaturedVideo(prev.id, { order: currentOrder });
      toast.success(`Moved "${video.title}" up in carousel.`);
    } else if (direction === "down" && index < list.length - 1) {
      const next = list[index + 1];
      if (!next) return;
      const currentOrder = video.order;
      updateFeaturedVideo(video.id, { order: next.order });
      updateFeaturedVideo(next.id, { order: currentOrder });
      toast.success(`Moved "${video.title}" down in carousel.`);
    }
  };

  const handleDeleteConfirm = () => {
    if (!videoToDelete) return;
    deleteFeaturedVideo(videoToDelete.id);
    toast.success(`Deleted video "${videoToDelete.title}".`);
    setVideoToDelete(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredVideos,
    totalCount,
    liveCount,
    totalEstimatedViews,
    taggedProductsCount,
    videoToDelete,
    setVideoToDelete,
    handleDeleteConfirm,
    previewingVideo,
    setPreviewingVideo,
    previewPlaying,
    setPreviewPlaying,
    previewMuted,
    setPreviewMuted,
    videoPlayerRef,
    handleMoveOrder,
    toggleFeaturedVideo,
  };
}

