"use client";

import Link from "next/link";
import { ChevronRight, ExternalLink, Plus, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface VideoHeaderProps {
  onOpenCreate: () => void;
}

export function VideoHeader({ onOpenCreate }: VideoHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5 font-medium">
          <Link href="/admin" className="hover:text-primary transition-colors">
            Admin
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Marketing & Atomic Content</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Featured Videos & Reels</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary border border-primary/20">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Featured Videos & Reels Control
              </h1>
              <Badge
                variant="outline"
                className="text-[10px] bg-primary/5 text-primary border-primary/20"
              >
                動画管理
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Control the real-routine video cards, creator tags, and buyable product pills
              displayed on the homepage carousel.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/#featured-videos"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>View Storefront</span>
        </Link>
        <Button
          onClick={onOpenCreate}
          className="flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Featured Video</span>
        </Button>
      </div>
    </div>
  );
}
