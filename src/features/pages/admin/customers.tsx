import { definePage } from "@/lib/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, MapPin, Phone, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = definePage("/admin/customers")({
  head: () => ({ meta: [{ title: "Customers | Admin — Glorious Japan" }] }),
  component: AdminCustomers,
});

const CUSTOMERS = [
  { id: 1, name: "Nusrat Ahmed", email: "nusrat@example.com", phone: "+880 1711 234567", city: "Dhaka", orders: 4, spent: 21480, joined: "Jan 2026", status: "Active" },
  { id: 2, name: "Farhana Khatun", email: "farhana@example.com", phone: "+880 1812 345678", city: "Chattogram", orders: 2, spent: 7740, joined: "Mar 2026", status: "Active" },
  { id: 3, name: "Tasnim Rahman", email: "tasnim@example.com", phone: "+880 1913 456789", city: "Sylhet", orders: 3, spent: 11340, joined: "Feb 2026", status: "Active" },
  { id: 4, name: "Sadia Islam", email: "sadia@example.com", phone: "+880 1614 567890", city: "Rajshahi", orders: 1, spent: 3990, joined: "May 2026", status: "Active" },
  { id: 5, name: "Rifat Hasan", email: "rifat@example.com", phone: "+880 1715 678901", city: "Dhaka", orders: 5, spent: 28900, joined: "Dec 2025", status: "VIP" },
  { id: 6, name: "Meher Afsana", email: "meher@example.com", phone: "+880 1816 789012", city: "Khulna", orders: 2, spent: 9200, joined: "Apr 2026", status: "Active" },
  { id: 7, name: "Jannatul Ferdaus", email: "jannatul@example.com", phone: "+880 1917 890123", city: "Dhaka", orders: 0, spent: 0, joined: "Aug 2026", status: "New" },
  { id: 8, name: "Rimi Akter", email: "rimi@example.com", phone: "+880 1618 901234", city: "Barishal", orders: 3, spent: 14350, joined: "Jun 2026", status: "Active" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  VIP: "bg-amber-100 text-amber-700",
  New: "bg-blue-100 text-blue-700",
  Inactive: "bg-secondary text-muted-foreground",
};

const CITIES = ["All", ...Array.from(new Set(CUSTOMERS.map((c) => c.city)))];
const STATUSES = ["All", "Active", "VIP", "New", "Inactive"];
const SORT_OPTIONS = [
  { label: "Name A–Z", value: "name_asc" },
  { label: "Most Spent", value: "spent_desc" },
  { label: "Most Orders", value: "orders_desc" },
  { label: "Newest Member", value: "newest" },
];

const PAGE_SIZE = 5;

function AdminCustomers() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [sort, setSort] = useState("name_asc");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  let filtered = CUSTOMERS.filter((c) => {
    const matchQ = !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchCity = cityFilter === "All" || c.city === cityFilter;
    return matchQ && matchStatus && matchCity;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === "spent_desc") return b.spent - a.spent;
    if (sort === "orders_desc") return b.orders - a.orders;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const paged = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  const clearFilters = () => { setQ(""); setStatusFilter("All"); setCityFilter("All"); setSort("name_asc"); setPage(1); };
  const hasFilters = q || statusFilter !== "All" || cityFilter !== "All" || sort !== "name_asc";

  const totalSpend = CUSTOMERS.reduce((s, c) => s + c.spent, 0);
  const totalOrders = CUSTOMERS.reduce((s, c) => s + c.orders, 0);
  const avgSpend = Math.round(totalSpend / CUSTOMERS.length);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="eyebrow">People</p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl">Customers</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} of {CUSTOMERS.length} customers shown</p>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total Customers", value: CUSTOMERS.length },
          { label: "Total Orders", value: totalOrders },
          { label: "Total Revenue", value: `৳${totalSpend.toLocaleString()}` },
          { label: "Avg. Spend", value: `৳${avgSpend.toLocaleString()}` },
        ].map(({ label, value }) => (
          <div key={label} className="surface-card p-5">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-2xl">{value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input placeholder="Search name or email…" className="rounded-full pl-10" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <select className="rounded-full border border-border bg-background px-4 py-2 text-sm" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button onClick={() => setShowFilters((v) => !v)} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] transition-colors ${showFilters ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-secondary"}`}>
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {hasFilters ? "(Active)" : ""}
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 rounded-full border border-border px-3 py-2 text-[11px] text-muted-foreground hover:bg-secondary">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="surface-card p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="text-[10px] uppercase tracking-[0.15em]">Status</Label>
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-[0.15em]">City</Label>
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground hover:bg-secondary"}`}
          >
            {s} {s !== "All" && <span className="opacity-70">({CUSTOMERS.filter((c) => c.status === s).length})</span>}
          </button>
        ))}
      </div>

      {/* Customer Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-5 py-3.5 min-w-[200px]">Customer</th>
                <th className="px-5 py-3.5 whitespace-nowrap">City</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Orders</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Total Spent</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Member Since</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paged.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm text-primary">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-[13px]">{c.name}</p>
                        <div className="flex flex-wrap gap-2 mt-0.5 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1"><Mail className="h-2.5 w-2.5" />{c.email}</span>
                          <span className="flex items-center gap-1"><Phone className="h-2.5 w-2.5" />{c.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {c.city}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center font-semibold">{c.orders}</td>
                  <td className="px-5 py-3.5 font-semibold text-[13px]">৳{c.spent.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-muted-foreground text-[12px]">{c.joined}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[c.status] ?? ""}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No customers match your filters.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">Page {safeP} of {totalPages} · {filtered.length} customers</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <button disabled={safeP <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-border disabled:opacity-40 hover:bg-secondary">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`grid h-8 w-8 place-items-center rounded-full text-[12px] transition-colors ${n === safeP ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>{n}</button>
            ))}
            <button disabled={safeP >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="grid h-8 w-8 place-items-center rounded-full border border-border disabled:opacity-40 hover:bg-secondary">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
