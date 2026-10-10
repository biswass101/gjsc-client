import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      aria-label="Search"
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
    >
      <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
    </button>
  );
}