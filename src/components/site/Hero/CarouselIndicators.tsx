
"use client";

interface CarouselIndicatorsProps {
  currentIndex: number;
  total: number;
  onSelect: (index: number) => void;
}

export function CarouselIndicators({
  currentIndex,
  total,
  onSelect,
}: CarouselIndicatorsProps) {
  return (
    <div className="absolute right-8 bottom-12 hidden h-full flex-col items-end justify-end space-y-3 lg:flex">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i === currentIndex
              ? "w-10 bg-primary"
              : "w-2 bg-primary/30 hover:bg-primary/60"
          }`}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === currentIndex ? "true" : undefined}
        />
      ))}
    </div>
  );
}
