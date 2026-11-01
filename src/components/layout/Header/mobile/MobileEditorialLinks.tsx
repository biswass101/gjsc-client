import { Link } from "@/lib/navigation";
import { BookOpen, Info, ShoppingBag, HelpCircle, Phone } from "lucide-react";

interface MobileEditorialLinksProps {
  onLinkClick: (to: string) => void;
}

const EDITORIAL_ITEMS = [
  { to: "/blog", label: "Beauty Notes (Journal)", icon: BookOpen },
  { to: "/about", label: "Our Story & Philosophy", icon: Info },
  { to: "/track", label: "Track Order", icon: ShoppingBag },
  { to: "/faq", label: "Frequently Asked Questions", icon: HelpCircle },
  { to: "/contact", label: "Contact & Advisory", icon: Phone },
];

export function MobileEditorialLinks({ onLinkClick }: MobileEditorialLinksProps) {
  return (
    <div className="p-3">
      <p className="px-3 pt-2 pb-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
        Editorial & Support
      </p>
      <div className="space-y-0.5">
        {EDITORIAL_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => onLinkClick(item.to)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-xs text-muted-foreground hover:text-foreground"
            >
              <IconComponent className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

