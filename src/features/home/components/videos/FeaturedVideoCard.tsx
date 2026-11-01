import { CheckCircle2, Eye, Play, ShoppingBag } from "lucide-react";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { AdminFeaturedVideo } from "@/types/admin";

interface FeaturedVideoCardProps {
  video: AdminFeaturedVideo;
  idx: number;
  activeIndex: number;
  total: number;
  onSelectCard: (idx: number) => void;
  onOpenModal: (video: AdminFeaturedVideo) => void;
  onAddToCart: (slug: string, name: string) => void;
}

export function FeaturedVideoCard({
  video,
  idx,
  activeIndex,
  total,
  onSelectCard,
  onOpenModal,
  onAddToCart,
}: FeaturedVideoCardProps) {
  let diff = (idx - activeIndex) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  const isCenter = diff === 0;
  const isImmediate = Math.abs(diff) === 1;
  const isOuter = Math.abs(diff) === 2;
  const isVisible = Math.abs(diff) <= 2;

  if (!isVisible) return null;

  const zIndex = isCenter ? 30 : isImmediate ? 20 : isOuter ? 10 : 0;
  const opacity = isCenter ? 1 : isImmediate ? 0.8 : isOuter ? 0.45 : 0;

  const offsetMobile =
    diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 58 : 108) : diff === -1 ? -58 : -108;
  const offsetDesktop =
    diff === 0 ? 0 : diff > 0 ? (diff === 1 ? 78 : 145) : diff === -1 ? -78 : -145;

  const scaleMobile = isCenter ? 1 : isImmediate ? 0.82 : isOuter ? 0.65 : 0.5;
  const scaleDesktop = isCenter ? 1 : isImmediate ? 0.85 : isOuter ? 0.7 : 0.5;

  return (
    <div
      onClick={() => {
        if (!isCenter) {
          onSelectCard(idx);
        } else {
          onOpenModal(video);
        }
      }}
      style={
        {
          zIndex,
          opacity,
          "--tx-sm": `${offsetMobile}%`,
          "--tx-lg": `${offsetDesktop}%`,
          "--sc-sm": scaleMobile,
          "--sc-lg": scaleDesktop,
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-2 sm:top-3 left-1/2 cursor-pointer",
        "w-[165px] sm:w-[200px] md:w-[225px] lg:w-[245px]",
        "transition-all duration-700 ease-out will-change-transform",
        "[transform:translateX(calc(-50%+var(--tx-sm)))_scale(var(--sc-sm))]",
        "sm:[transform:translateX(calc(-50%+var(--tx-lg)))_scale(var(--sc-lg))]",
      )}
    >
      <article
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-md sm:rounded-lg bg-black border transition-all duration-500 shadow-sm",
          isCenter
            ? "border-primary/70 shadow-2xl ring-1 ring-primary/40"
            : "border-border/60 hover:border-primary/50",
        )}
      >
        <div className="relative aspect-[9/13] sm:aspect-[9/13.5] w-full overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30" />

          <div className="absolute top-2 inset-x-2 flex items-center justify-between text-white z-10">
            <span className="rounded-full bg-black/60 px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold backdrop-blur-md">
              {video.duration}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[8px] sm:text-[9px] font-medium backdrop-blur-md">
              <Eye className="h-2.5 w-2.5" />
              <span>{video.views}</span>
            </span>
          </div>

          <div className="absolute inset-0 grid place-items-center">
            <div
              className={cn(
                "relative grid place-items-center rounded-full text-white backdrop-blur-md border transition-all duration-300",
                isCenter
                  ? "h-11 w-11 sm:h-13 sm:w-13 bg-primary/90 border-primary shadow-lg scale-105"
                  : "h-9 w-9 sm:h-10 sm:w-10 bg-white/30 border-white/40",
              )}
            >
              <Play
                className={cn(
                  "fill-white ml-0.5",
                  isCenter ? "h-5 w-5" : "h-3.5 w-3.5 sm:h-4 sm:w-4",
                )}
              />
              {isCenter && (
                <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-35" />
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 text-white z-10 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1.5">
              <img
                src={video.creatorAvatar}
                alt={video.creatorName}
                className="h-6 w-6 rounded-full object-cover border border-white/60"
              />
              <div className="leading-tight truncate">
                <p className="text-[11px] font-semibold flex items-center gap-1 text-white truncate">
                  <span>{video.creatorName}</span>
                  <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                </p>
                <p className="text-[9px] text-white/70">{video.creatorHandle}</p>
              </div>
            </div>

            <p className="font-display text-xs sm:text-sm font-semibold line-clamp-2 leading-snug text-white">
              {video.title}
            </p>

            <div className="mt-2 flex items-center justify-between rounded-md bg-white/15 backdrop-blur-md border border-white/25 p-1.5 text-[10px]">
              <div className="flex items-center gap-1.5 truncate">
                <ShoppingBag className="h-3 w-3 text-primary shrink-0" />
                <span className="font-medium text-white truncate">{video.product.name}</span>
              </div>
              <span className="font-bold text-white shrink-0 ml-1">
                {formatBDT(video.product.price)}
              </span>
            </div>

            {isCenter && (
              <div className="mt-2.5 flex items-center gap-1.5 pt-1 border-t border-white/20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(video);
                  }}
                  className="flex-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold py-1.5 transition-colors text-center"
                >
                  Watch Video
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(video.product.slug, video.product.name);
                  }}
                  className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-semibold py-1.5 transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="h-3 w-3" />
                  <span>Add to Bag</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

