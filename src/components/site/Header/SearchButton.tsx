import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-full max-w-xs md:max-w-sm lg:max-w-md items-center gap-2.5 rounded-full border border-border/60 bg-secondary/30 px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:bg-secondary/60 hover:border-primary/30"
    >
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
      <span className="truncate">Search products, brands, concerns...</span>
    </button>
  );
}