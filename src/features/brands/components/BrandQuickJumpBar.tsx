import { cn } from "@/lib/utils";
import { ALPHABET_NUMBER_KEYS, type BrandMeta } from "../data/brandMetadata";

interface BrandQuickJumpBarProps {
  filteredBrandsByLetter: Record<string, BrandMeta[]>;
  activeLetter: string;
  onScrollToChar: (char: string) => void;
}

export function BrandQuickJumpBar({
  filteredBrandsByLetter,
  activeLetter,
  onScrollToChar,
}: BrandQuickJumpBarProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-2xs py-2.5 sm:py-3 transition-all">
      <div className="container-lux">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground shrink-0 hidden md:inline">
            Jump to:
          </span>

          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide py-0.5 px-0.5 w-full">
            {ALPHABET_NUMBER_KEYS.map((char) => {
              const count = filteredBrandsByLetter[char]?.length ?? 0;
              const hasBrands = count > 0;
              const isActive = activeLetter === char;

              return (
                <button
                  key={char}
                  type="button"
                  onClick={() => onScrollToChar(char)}
                  disabled={!hasBrands}
                  aria-label={`Jump to brands starting with ${char}`}
                  className={cn(
                    "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs scale-105"
                      : hasBrands
                        ? "bg-muted/70 text-foreground hover:bg-primary/15 hover:text-primary"
                        : "opacity-30 text-muted-foreground cursor-not-allowed bg-transparent",
                  )}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

