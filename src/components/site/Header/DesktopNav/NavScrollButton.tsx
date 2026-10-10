import { ChevronLeft, ChevronRight } from "lucide-react";
import { RefObject } from "react";

interface NavScrollButtonProps {
  direction: "left" | "right";
  navScrollRef: RefObject<HTMLDivElement | null>
}

export default function NavScrollButton({
  direction,
  navScrollRef
}: NavScrollButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const movement = direction === "left" ? -250 : 250;
  return (
    <button
      type="button"
      onClick={() =>
          navScrollRef.current?.scrollBy({
            left: movement,
            behavior: "smooth",
          })
        }
      className="shrink-0 rounded-full p-1 hover:bg-gray-100"
      aria-label={`Scroll navigation ${direction}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}