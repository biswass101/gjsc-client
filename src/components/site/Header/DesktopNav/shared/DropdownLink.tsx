import { Link } from "@/lib/navigation";
import type { LucideIcon } from "lucide-react";

interface DropdownLinkProps {
  label: string;
  category: string;
  icon: LucideIcon;
  iconClassName?: string;
  to?: "/shop" | "/collections";
  searchParam?: "category" | "type";
  href?: string;
}

export function DropdownLink({
  label,
  category,
  icon: Icon,
  iconClassName = "text-primary",
  to = "/shop",
  searchParam = "category",
  href,
}: DropdownLinkProps) {
  const className =
    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary";

  const content = (
    <>
      <Icon
        className={`h-4 w-4 shrink-0 ${iconClassName}`}
        strokeWidth={1.75}
      />
      <span className="font-medium">{label}</span>
    </>
  );

  if (href) {
    // Explicit routes keep navigation type-safe.
    switch (href) {
      case "/brands/glorious-japan":
        return <Link to="/brands/glorious-japan" className={className}>{content}</Link>;
      case "/brands/sakura-lab":
        return <Link to="/brands/sakura-lab" className={className}>{content}</Link>;
      case "/brands/kyoto-botanicals":
        return <Link to="/brands/kyoto-botanicals" className={className}>{content}</Link>;
      case "/brands/yuzu-no-mori":
        return <Link to="/brands/yuzu-no-mori" className={className}>{content}</Link>;
      case "/brands/hikari-beauty":
        return <Link to="/brands/hikari-beauty" className={className}>{content}</Link>;
      case "/brands":
        return <Link to="/brands" className={className}>{content}</Link>;
    }
  }

  if (to === "/collections" && searchParam === "type") {
    return (
      <Link to="/collections" search={{ type: category }} className={className}>
        {content}
      </Link>
    );
  }

  if (to === "/shop" && searchParam === "category") {
    return (
      <Link to="/shop" search={{ category }} className={className}>
        {content}
      </Link>
    );
  }

  return null;
}