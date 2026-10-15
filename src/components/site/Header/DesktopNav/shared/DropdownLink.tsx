import { Link } from "@/lib/navigation";
import type { LucideIcon } from "lucide-react";

interface DropdownLinkProps {
  label: string;
  category: string;
  icon?: LucideIcon | undefined;
  image?: string | undefined;
  iconClassName?: string | undefined;
  to?: "/shop" | "/collections" | undefined;
  searchParam?: "category" | "type" | undefined;
  href?: string | undefined;
}

export function DropdownLink({
  label,
  category,
  icon: Icon,
  image,
  iconClassName = "text-primary",
  to = "/shop",
  searchParam = "category",
  href,
}: DropdownLinkProps) {
  const className =
    "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-foreground/85 transition-colors hover:bg-primary/10 hover:text-primary";

  const content = (
    <>
      {image ? (
        <span className="relative flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 overflow-hidden rounded-full border border-border/60 bg-cream shadow-2xs">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </span>
      ) : Icon ? (
        <Icon
          className={`h-4 w-4 shrink-0 ${iconClassName}`}
          strokeWidth={1.75}
        />
      ) : null}
      <span className="font-medium text-xs sm:text-[13px]">{label}</span>
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