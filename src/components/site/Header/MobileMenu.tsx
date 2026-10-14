import { Link } from "@/lib/navigation";
import { Store, LayoutGrid, BookOpen, Info, ShoppingBag, Bell, User, Heart, Settings, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CATEGORIES } from "@/lib/catalog";

interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface MobileMenuProps {
  user: User | null;
  wishlistCount: number;
  onLogout: () => void;
  onNavigate: (to: string) => void;
  className?: string;
}

function MobileNavLink({ to, icon: Icon, label, onClick }: { to: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick ?? (() => {})}
      className="flex items-center gap-2.5 transition-colors hover:text-primary text-[14px] text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
      {label}
    </Link>
  );
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border/50">
      <p className="eyebrow px-6 pt-4 pb-2 text-[11px]">{title}</p>
      <div className="px-6 pb-4 space-y-2">{children}</div>
    </div>
  );
}

export function MobileMenu({ user, wishlistCount, onLogout, onNavigate, className }: MobileMenuProps) {
  return (
    <div className={className}>
      <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition-colors"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto bg-background p-0">
        <SheetTitle className="font-display text-xl font-normal border-b border-border/50 px-6 py-4">Menu</SheetTitle>
        <nav className="space-y-1 text-sm">
          {/* Shop Section */}
          <div className="border-b border-border/50">
            <button
              onClick={() => onNavigate("/shop")}
              className="w-full text-left px-6 py-3 hover:bg-secondary transition-colors font-medium text-[14px]"
            >
              <Store className="inline h-4 w-4 mr-2" strokeWidth={1.5} />
              All Products
            </button>
            <div className="px-6 py-4 bg-secondary/20 space-y-2">
              <p className="eyebrow text-[11px]">Categories</p>
              <div className="grid gap-2.5">
                {CATEGORIES.slice(0, 8).map((c) => (
                  <Link
                    key={c}
                    to="/shop"
                    search={{ category: c }}
                    onClick={() => onNavigate("/shop")}
                    className="text-muted-foreground transition-colors hover:text-primary text-[13px] block"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Information Section */}
          <MobileSection title="Information">
            {([
              ["/categories", "Categories", LayoutGrid],
              ["/blog", "Journal", BookOpen],
              ["/about", "Our Story", Info],
              ["/track", "Track Order", ShoppingBag],
              ["/contact", "Contact", Bell],
            ] as const).map(([to, label, Icon]) => (
              <MobileNavLink key={to} to={to} icon={Icon} label={label} onClick={() => onNavigate(to)} />
            ))}
          </MobileSection>

          {/* Account Section */}
          <MobileSection title="Account">
            {user ? (
              <>
                <div className="mb-3 pb-3 border-b border-border/50">
                  <p className="text-[13px] font-medium">{user.name}</p>
                  <p className="text-[12px] text-muted-foreground">{user.email}</p>
                </div>
                <MobileNavLink to="/account" icon={User} label="My Account" onClick={() => onNavigate("/account")} />
                <MobileNavLink to="/wishlist" icon={Heart} label={`Wishlist ${wishlistCount > 0 ? `(${wishlistCount})` : ""}`} onClick={() => onNavigate("/wishlist")} />
                {user.role === "admin" && (
                  <MobileNavLink to="/admin" icon={Settings} label="Admin Panel" onClick={() => onNavigate("/admin")} />
                )}
                <button
                  onClick={() => { onLogout(); onNavigate("/"); }}
                  className="flex w-full items-center gap-2.5 text-left transition-colors text-destructive hover:text-destructive/80 text-[14px]"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.5} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  onClick={() => onNavigate("/auth")}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary text-[14px] font-medium px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                >
                  <User className="h-4 w-4" strokeWidth={1.5} />
                  Sign In / Register
                </Link>
                <MobileNavLink to="/wishlist" icon={Heart} label={`Wishlist ${wishlistCount > 0 ? `(${wishlistCount})` : ""}`} onClick={() => onNavigate("/wishlist")} />
              </>
            )}
          </MobileSection>
        </nav>
      </SheetContent>
    </Sheet>
    </div>
  );
}