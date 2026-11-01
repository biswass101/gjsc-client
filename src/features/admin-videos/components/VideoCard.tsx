"use client";

import { Play, Eye, Sparkles, CheckCircle2, MoveUp, MoveDown, Edit2, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { formatBDT, cn } from "@/lib/utils";
import type { AdminFeaturedVideo } from "@/context/admin-context";

interface VideoCardProps {
  video: AdminFeaturedVideo;
  onPreview: (video: AdminFeaturedVideo) => void;
  onToggle: (id: string, currentlyActive: boolean, title: string) => void;
  onMove: (video: AdminFeaturedVideo, direction: "up" | "down") => void;
  onEdit: (video: AdminFeaturedVideo) => void;
  onDelete: (video: AdminFeaturedVideo) => void;
}

export function VideoCard({
  video,
  onPreview,
  onToggle,
  onMove,
  onEdit,
  onDelete,
}: VideoCardProps) {
  const isActive = video.active !== false;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-300 bg-card hover:shadow-md",
        isActive
          ? "border-border/80 hover:border-primary/50"
          : "border-border/40 opacity-70 bg-muted/20",
      )}
    >
      {/* Compact Reel Preview Card (9:13.5 aspect ratio) */}
      <div className="relative aspect-[9/13.5] w-full overflow-hidden bg-black select-none">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-1">
            <span className="rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold backdrop-blur-md">
              #{video.order} · {video.duration}
            </span>
            {video.featured && (
              <span className="rounded-full bg-amber-500/90 text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-0.5">
                <Sparkles className="h-2 w-2" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-0.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-medium backdrop-blur-md">
            <Eye className="h-2.5 w-2.5" />
            <span>{video.views}</span>
          </span>
        </div>

        {/* Center Play Button (Click to Preview) */}
        <div className="absolute inset-0 grid place-items-center">
          <button
            type="button"
            onClick={() => onPreview(video)}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md shadow-md transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="Watch Video Preview"
          >
            <Play className="h-4 w-4 fill-current ml-0.5" />
          </button>
        </div>

        {/* Bottom Overlay: Creator & Tagged Product */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 text-white z-10 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <img
              src={video.creatorAvatar}
              alt={video.creatorName}
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover border border-white/60 shrink-0"
            />
            <div className="truncate">
              <p className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 text-white truncate">
                <span>{video.creatorName}</span>
                <CheckCircle2 className="h-2.5 w-2.5 text-primary shrink-0" />
              </p>
              <p className="text-[8px] sm:text-[9px] text-white/70 truncate">
                {video.creatorHandle}
              </p>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs font-semibold line-clamp-2 leading-tight text-white">
            {video.title}
          </p>

          {/* Tagged Product Pill */}
          <div className="flex items-center justify-between rounded-md bg-white/15 backdrop-blur-md border border-white/20 p-1.5 text-[9px]">
            <div className="flex items-center gap-1.5 truncate">
              <img
                src={video.product.image}
                alt={video.product.name}
                className="h-5 w-5 rounded object-cover bg-white shrink-0"
              />
              <div className="truncate leading-tight max-w-[85px] sm:max-w-[105px]">
                <span className="block font-medium text-white truncate text-[9px] sm:text-[10px]">
                  {video.product.name}
                </span>
                <span className="text-[8px] text-white/70 block truncate">
                  {video.product.brand}
                </span>
              </div>
            </div>
            <span className="font-bold text-white shrink-0 ml-1 text-[10px] sm:text-[11px]">
              {formatBDT(video.product.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Admin Actions */}
      <div className="p-2 bg-card border-t border-border/70 flex items-center justify-between gap-1 text-xs">
        {/* Active Toggle */}
        <div className="flex items-center gap-1.5">
          <Switch
            checked={isActive}
            onCheckedChange={() => onToggle(video.id, isActive, video.title)}
          />
          <span
            className={cn(
              "text-[10px] font-semibold",
              isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
            )}
          >
            {isActive ? "Live" : "Draft"}
          </span>
        </div>

        {/* Priority & Management Buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onMove(video, "up")}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Move Carousel Priority Up"
          >
            <MoveUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => onMove(video, "down")}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Move Carousel Priority Down"
          >
            <MoveDown className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(video)}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Edit Video Reel"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(video)}
            className="p-1 rounded hover:bg-rose-500/10 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
            title="Delete Video Reel"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
