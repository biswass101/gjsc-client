import { LucideIcon } from "lucide-react";

export interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigateMobile?: (() => void) | undefined;
}

export interface SidebarNavBadge {
  text: string;
  variant: "amber" | "rose" | "emerald";
}

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge: SidebarNavBadge | null;
}

export interface SidebarNavGroup {
  group: string;
  items: SidebarNavItem[];
}
