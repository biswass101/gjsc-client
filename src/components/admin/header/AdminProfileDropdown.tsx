import React from "react";
import { useRouter } from "next/navigation";
import { Store, ShieldCheck, RefreshCw, LogOut, ExternalLink } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { useShop } from "@/context/shop-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function AdminProfileDropdown() {
  const router = useRouter();
  const { resetToDefaults } = useAdmin();
  const { logout } = useShop();

  const handleSignOut = () => {
    logout();
    toast.info("Signed out of admin session.");
    router.push("/auth");
  };

  const handleFactoryReset = () => {
    if (
      window.confirm(
        "Reset all store products, orders, and settings back to factory Japanese demo state?",
      )
    ) {
      resetToDefaults();
      toast.success("Admin store state restored to default factory dataset! 🌸");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/30 p-1 pr-2 hover:bg-secondary transition-colors"
        >
          <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
            A
          </div>
          <span className="hidden md:inline text-xs font-semibold text-foreground">Admin</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2.5 border-b border-border/60">
          <p className="text-xs font-semibold text-foreground">Super Administrator</p>
          <p className="text-[11px] text-muted-foreground">admin@gloriousjapan.com</p>
          <span className="inline-block mt-1 rounded-full bg-emerald-500/15 px-2 py-0.2 text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
            Full Access • All Modules
          </span>
        </div>
        <DropdownMenuItem asChild className="cursor-pointer gap-2 text-xs">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Store className="h-3.5 w-3.5 text-primary" />
            <span>View Customer Storefront</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/admin/settings")}
          className="cursor-pointer gap-2 text-xs"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Store Configuration</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleFactoryReset}
          className="cursor-pointer gap-2 text-xs text-amber-600 focus:text-amber-600"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Demo Store State</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer gap-2 text-xs text-rose focus:text-rose"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
