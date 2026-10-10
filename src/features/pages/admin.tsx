import { definePage, Link, Outlet, useNavigate, useRouterState } from "@/lib/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3, Box, ChevronRight, LayoutDashboard, LogOut,
  Package, Settings, Users, Menu, X,
} from "lucide-react";
import { useShop } from "@/lib/store";

export const Route = definePage("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel | Glorious Japan Skin Care" }],
  }),
  component: AdminRoute,
});

const NAV_ITEMS = [
  { to: "/admin" as const, label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/products" as const, label: "Products", Icon: Box, exact: false },
  { to: "/admin/orders" as const, label: "Orders", Icon: Package, exact: false },
  { to: "/admin/customers" as const, label: "Customers", Icon: Users, exact: false },
  { to: "/admin/settings" as const, label: "Settings", Icon: Settings, exact: false },
];

function AdminRoute() {
  const { user, logout } = useShop();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate({ to: "/auth" });
    } else if (user.role !== "admin") {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  // Close sidebar when route changes (mobile nav tap)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Redirecting…</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-border px-6">
        <img
          src="/glorious-japan-skin-care-logo.jpeg"
          alt="Glorious Japan"
          className="h-10 w-10 object-contain"
        />
        <div>
          <p className="font-display text-sm leading-none">Glorious Japan</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Admin</p>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-secondary lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* User info */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {user.name[0]?.toUpperCase()}
        </div>
        <p className="mt-2 text-sm font-medium">{user.name}</p>
        <p className="text-[11px] text-muted-foreground">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map(({ to, label, Icon, exact }) => {
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
              {active && <ChevronRight className="ml-auto h-3 w-3" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border p-3 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <BarChart3 className="h-4 w-4" strokeWidth={1.5} />
          View Store
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Right-side column — min-w-0 prevents flex child from overflowing viewport */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground hover:bg-secondary"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/glorious-japan-skin-care-logo.jpeg"
              alt="Glorious Japan"
              className="h-7 w-7 object-contain"
            />
            <span className="font-display text-sm">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
