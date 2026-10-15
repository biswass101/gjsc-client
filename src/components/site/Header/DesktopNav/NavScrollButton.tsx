import { ChevronLeft, ChevronRight } from "lucide-react";
import { RefObject } from "react";
import { cn } from "@/lib/utils";

interface NavScrollButtonProps {
  direction: "left" | "right";
  navScrollRef: RefObject<HTMLDivElement | null>;
  visible?: boolean;
}

export default function NavScrollButton({
  direction,
  navScrollRef,
  visible = true,
}: NavScrollButtonProps) {
  if (!visible) return null;

  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const movement = direction === "left" ? -240 : 240;

  return (
    <button
      type="button"
      onClick={() =>
        navScrollRef.current?.scrollBy({
          left: movement,
          behavior: "smooth",
        })
      }
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg hover:bg-background hover:border-primary text-foreground hover:text-primary transition-all active:scale-95 cursor-pointer",
        direction === "left" ? "left-0" : "right-0"
      )}
      aria-label={`Scroll navigation ${direction}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}