import { useRef, useState } from "react";
import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import { CheckCircle2, Pause, Play, ShoppingBag, Volume2, VolumeX, X } from "lucide-react";
import type { AdminFeaturedVideo } from "@/types/admin";
import { isYouTube, getYouTubeEmbedUrl } from "./videoUtils";

interface FeaturedVideoModalProps {
  activeModalVideo: AdminFeaturedVideo;
  onClose: () => void;
  onAddToCart: (slug: string, name: string) => void;
}

export function FeaturedVideoModal({
  activeModalVideo,
  onClose,
  onAddToCart,
}: FeaturedVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

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
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: Video Player */}
          <div className="relative h-64 sm:h-80 md:h-full min-h-[320px] bg-black overflow-hidden flex items-center justify-center">
            {activeModalVideo.videoUrl && isYouTube(activeModalVideo.videoUrl) ? (
              <iframe
                src={getYouTubeEmbedUrl(activeModalVideo.videoUrl)}
                title={activeModalVideo.title}
                className="h-full w-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : activeModalVideo.videoUrl ? (
              <video
                ref={videoElementRef}
                src={activeModalVideo.videoUrl}
                poster={activeModalVideo.thumbnail}
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
                  src={activeModalVideo.thumbnail}
                  alt={activeModalVideo.title}
                  className="h-full w-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="grid h-14 w-14 place-items-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md shadow-lg transition-transform hover:scale-105 cursor-pointer"
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
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 rounded-md bg-black/40 backdrop-blur-xs hover:bg-black/60 cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <span className="text-[9px] sm:text-[10px] text-white/80">
                    Reel Preview · {activeModalVideo.duration}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Right: Creator Details & Tagged Product */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4">
            <div>
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/70">
                <img
                  src={activeModalVideo.creatorAvatar}
                  alt={activeModalVideo.creatorName}
                  className="h-9 w-9 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                    <span>{activeModalVideo.creatorName}</span>
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {activeModalVideo.creatorHandle}
                  </p>
                </div>
              </div>

              <h3 className="mt-2.5 font-display text-sm sm:text-base font-bold leading-snug">
                {activeModalVideo.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-2.5 rounded-lg border border-border/50">
                "{activeModalVideo.caption}"
              </p>
            </div>

            {/* Tagged Product Box */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-primary block">
                Featured Product in Video
              </span>

              <div className="flex items-center gap-2.5">
                <img
                  src={activeModalVideo.product.image}
                  alt={activeModalVideo.product.name}
                  className="h-12 w-12 rounded-lg object-cover bg-cream border border-border shrink-0"
                />
                <div className="truncate">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    {activeModalVideo.product.brand}
                  </p>
                  <h4 className="text-xs font-semibold truncate text-foreground">
                    {activeModalVideo.product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-display text-xs sm:text-sm font-bold text-foreground">
                      {formatBDT(activeModalVideo.product.price)}
                    </span>
                    {activeModalVideo.product.compareAt && (
                      <span className="text-[9px] text-muted-foreground line-through">
                        {formatBDT(activeModalVideo.product.compareAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onAddToCart(activeModalVideo.product.slug, activeModalVideo.product.name)
                  }
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add To Bag</span>
                </button>
                <Link
                  to="/product/$slug"
                  params={{ slug: activeModalVideo.product.slug }}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary transition-colors text-center shrink-0 cursor-pointer"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

