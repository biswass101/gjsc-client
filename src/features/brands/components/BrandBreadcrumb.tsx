import { Link } from "@/lib/navigation";
import { ChevronRight } from "lucide-react";

interface BrandBreadcrumbProps {
  brandName: string;
}

export function BrandBreadcrumb({ brandName }: BrandBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-3 w-3 text-border" />
        </li>
        <li>
          <Link to="/brands" className="hover:text-primary transition-colors">
            Brands
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-3 w-3 text-border" />
        </li>
        <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
          {brandName}
        </li>
      </ol>
    </nav>
  );
}

