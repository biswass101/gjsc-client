import type { AdminFeaturedVideo, AdminProduct } from "@/context/admin-context";

export type VideoViewMode = "grid" | "table";
export type VideoStatusFilter = "all" | "active" | "inactive";
export type VideoSortOption = "order" | "views" | "title" | "recent";

export interface VideoFormValues {
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  creatorName: string;
  creatorHandle: string;
  creatorRole: string;
  creatorAvatar: string;
  taggedProductId?: string | undefined;
  discountBadge?: string | undefined;
  isActive: boolean;
  order: number;
}

