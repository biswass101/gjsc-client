import { Link } from "@/lib/navigation";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  count: number;
}

export function WishlistButton({ count }: WishlistButtonProps) {
  return (
    <Link
      aria-label="Wishlist"
      to="/wishlist"
      className="hidden lg:flex relative h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
    >
      <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}