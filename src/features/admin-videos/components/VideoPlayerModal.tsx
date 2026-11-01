"use client";

import { RefObject } from "react";
import { X, Play, Pause, Volume2, VolumeX, CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import { toast } from "sonner";
import type { AdminFeaturedVideo } from "@/context/admin-context";

interface VideoPlayerModalProps {
  video: AdminFeaturedVideo | null;
  isPlaying: boolean;
  isMuted: boolean;
  videoPlayerRef: RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export function VideoPlayerModal({
  video,
  isPlaying,
  isMuted,
  videoPlayerRef,
  onClose,
  onTogglePlay,
  onToggleMute,
}: VideoPlayerModalProps) {
  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-xl bg-card border border-border shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: Video Player simulation or actual video */}
          <div className="relative h-64 sm:h-80 md:h-full min-h-[340px] bg-black overflow-hidden flex items-center justify-center">
            {video.videoUrl && /youtube\.com|youtu\.be/.test(video.videoUrl) ? (
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="h-full w-full object-cover"
                allowFullScreen
              />
            ) : video.videoUrl ? (
              <video
                ref={videoPlayerRef}
                src={video.videoUrl}
                poster={video.thumbnail}
                autoPlay={isPlaying}
                loop
                playsInline
                controls
                muted={isMuted}
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={onTogglePlay}
                    className="grid h-14 w-14 place-items-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md shadow-lg transition-transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 fill-current" />
                    ) : (
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-xs">
                  <button
                    type="button"
                    onClick={onToggleMute}
                    className="p-1 rounded-md bg-black/40 backdrop-blur-xs hover:bg-black/60"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <span className="text-[9px] sm:text-[10px] text-white/80">
                    Admin Preview · {video.duration}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Right: Creator Details & Tagged Product */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/70">
                <img
                  src={video.creatorAvatar}
                  alt={video.creatorName}
                  className="h-9 w-9 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                    <span>{video.creatorName}</span>
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </h4>
                  <p className="text-[11px] text-muted-foreground">{video.creatorHandle}</p>
                </div>
              </div>

              <h3 className="mt-2.5 font-display text-sm sm:text-base font-bold leading-snug">
                {video.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-2.5 rounded-lg border border-border/50">
                "{video.caption}"
              </p>
            </div>

            {/* Tagged Product Box */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-primary block">
                Tagged Store Product
              </span>

              <div className="flex items-center gap-2.5">
                <img
                  src={video.product.image}
                  alt={video.product.name}
                  className="h-12 w-12 rounded-lg object-cover bg-cream border border-border shrink-0"
                />
                <div className="truncate">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    {video.product.brand}
                  </p>
                  <h4 className="text-xs font-semibold truncate text-foreground">
                    {video.product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-display text-xs sm:text-sm font-bold text-foreground">
                      {formatBDT(video.product.price)}
                    </span>
                    {video.product.compareAt && (
                      <span className="text-[9px] text-muted-foreground line-through">
                        {formatBDT(video.product.compareAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    toast.success(`"Add to Bag" test successful for ${video.product.name}!`);
                  }}
                  className="w-full text-xs h-8 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Test "Add To Bag"</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
