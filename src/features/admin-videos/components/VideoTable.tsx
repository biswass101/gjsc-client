"use client";

import { Play, MoveUp, MoveDown, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatBDT, cn } from "@/lib/utils";
import type { AdminFeaturedVideo } from "@/context/admin-context";

interface VideoTableProps {
  videos: AdminFeaturedVideo[];
  onPreview: (video: AdminFeaturedVideo) => void;
  onToggle: (id: string, currentlyActive: boolean, title: string) => void;
  onMove: (video: AdminFeaturedVideo, direction: "up" | "down") => void;
  onEdit: (video: AdminFeaturedVideo) => void;
  onDelete: (video: AdminFeaturedVideo) => void;
}

export function VideoTable({
  videos,
  onPreview,
  onToggle,
  onMove,
  onEdit,
  onDelete,
}: VideoTableProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="py-3 px-4 w-12 text-center">Order</th>
              <th className="py-3 px-4 w-16">Preview</th>
              <th className="py-3 px-4">Video Title & Quote</th>
              <th className="py-3 px-4">Creator</th>
              <th className="py-3 px-4">Tagged Product</th>
              <th className="py-3 px-4">Views & Len</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {videos.map((video) => {
              const isActive = video.active !== false;

              return (
                <tr key={video.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 text-center font-bold text-muted-foreground">
                    #{video.order}
                  </td>
                  <td className="py-3 px-4">
                    <div
                      onClick={() => onPreview(video)}
                      className="relative h-12 w-9 rounded-md overflow-hidden bg-black cursor-pointer group shrink-0"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 grid place-items-center">
                        <Play className="h-3 w-3 text-white fill-current" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="font-semibold text-foreground truncate">{video.title}</p>
                    <p className="text-[11px] text-muted-foreground italic truncate">
                      "{video.caption}"
                    </p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={video.creatorAvatar}
                        alt={video.creatorName}
                        className="h-6 w-6 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-foreground leading-tight">
                          {video.creatorName}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{video.creatorHandle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={video.product.image}
                        alt={video.product.name}
                        className="h-7 w-7 rounded-md object-cover border bg-cream"
                      />
                      <div>
                        <p className="font-medium text-foreground truncate max-w-[140px]">
                          {video.product.name}
                        </p>
                        <p className="font-bold text-[11px] text-primary">
                          {formatBDT(video.product.price)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <p className="font-semibold text-foreground">{video.views}</p>
                    <p className="text-[10px] text-muted-foreground">{video.duration}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isActive}
                        onCheckedChange={() => onToggle(video.id, isActive, video.title)}
                      />
                      <span
                        className={cn(
                          "text-[11px] font-semibold",
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-muted-foreground",
                        )}
                      >
                        {isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMove(video, "up")}
                        className="h-8 w-8"
                        title="Move Up"
                      >
                        <MoveUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMove(video, "down")}
                        className="h-8 w-8"
                        title="Move Down"
                      >
                        <MoveDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(video)}
                        className="h-8 w-8"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(video)}
                        className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
