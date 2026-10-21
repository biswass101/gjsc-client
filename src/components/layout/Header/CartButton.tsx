import { ShoppingBag } from "lucide-react";

interface CartButtonProps {
  count: number;
  onClick: () => void;
}

export function CartButton({ count, onClick }: CartButtonProps) {
  return (
    <button
      type="button"
      aria-label="Open bag"
      onClick={onClick}
      className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute right-0.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
          {count}
        </span>
      )}
    </button>
  );
}