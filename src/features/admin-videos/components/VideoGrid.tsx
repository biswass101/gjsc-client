"use client";

import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminFeaturedVideo } from "@/context/admin-context";
import { VideoCard } from "./VideoCard";

interface VideoGridProps {
  videos: AdminFeaturedVideo[];
  searchQuery: string;
  statusFilter: string;
  onOpenCreate: () => void;
  onPreview: (video: AdminFeaturedVideo) => void;
  onToggle: (id: string, currentlyActive: boolean, title: string) => void;
  onMove: (video: AdminFeaturedVideo, direction: "up" | "down") => void;
  onEdit: (video: AdminFeaturedVideo) => void;
  onDelete: (video: AdminFeaturedVideo) => void;
}

export function VideoGrid({
  videos,
  searchQuery,
  statusFilter,
  onOpenCreate,
  onPreview,
  onToggle,
  onMove,
  onEdit,
  onDelete,
}: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border/80 rounded-2xl bg-card/20 p-8">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-muted mx-auto text-muted-foreground mb-3">
          <Video className="h-6 w-6" />
        </div>
        <h3 className="font-display font-semibold text-base text-foreground">
          No featured videos found
        </h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
          {searchQuery || statusFilter !== "all"
            ? "Try adjusting your search terms or filters."
            : "Create your first featured creator video reel to showcase routines on the homepage."}
        </p>
        <Button onClick={onOpenCreate} className="mt-4 text-xs">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Featured Video
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onPreview={onPreview}
          onToggle={onToggle}
          onMove={onMove}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
