import { Link } from "@/lib/navigation";
import { Heart, LogOut, Settings, User } from "lucide-react";
import type { User as UserProfile } from "@/types";

interface MobileAccountSectionProps {
  user: UserProfile | null;
  wishlistCount: number;
  onLogout: () => void;
  onLinkClick: (to: string) => void;
}

export function MobileAccountSection({
  user,
  wishlistCount,
  onLogout,
  onLinkClick,
}: MobileAccountSectionProps) {
  return (
    <div className="p-4 bg-muted/20">
      {user ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/50">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
              />
            ) : (
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground shrink-0">
                {user.name[0]?.toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Link
            to="/account"
            onClick={() => onLinkClick("/account")}
            className="flex items-center gap-2.5 py-1.5 text-xs text-foreground hover:text-primary transition-colors"
          >
            <User className="h-3.5 w-3.5 text-primary" />
            <span>My Account</span>
          </Link>
          <Link
            to="/wishlist"
            onClick={() => onLinkClick("/wishlist")}
            className="flex items-center justify-between py-1.5 text-xs text-foreground hover:text-primary transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="h-3.5 w-3.5 text-rose" />
              <span>My Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="rounded-full bg-primary/10 text-primary px-2 py-0.2 text-[10px] font-semibold">
                {wishlistCount}
              </span>
            )}
          </Link>
          {user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => onLinkClick("/admin")}
              className="flex items-center gap-2.5 py-1.5 text-xs text-foreground hover:text-primary transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-primary" />
              <span>Admin Panel</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              onLogout();
              onLinkClick("/");
            }}
            className="flex w-full items-center gap-2.5 pt-2 text-xs text-destructive hover:text-destructive/80 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          <Link
            to="/auth"
            onClick={() => onLinkClick("/auth")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all text-center"
          >
            <User className="h-3.5 w-3.5" />
            <span>Sign In / Register</span>
          </Link>
          <Link
            to="/wishlist"
            onClick={() => onLinkClick("/wishlist")}
            className="flex items-center justify-between px-3 py-2 rounded-lg border border-border/60 bg-card text-xs text-foreground hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-rose" />
              <span>Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="rounded-full bg-primary/10 text-primary px-2 py-0.2 text-[10px] font-semibold">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </div>
  );
}

