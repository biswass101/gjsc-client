import { definePage } from "@/lib/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { formatBDT } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = definePage("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders | Admin — Glorious Japan" }] }),
  component: AdminOrders,
});

const STATUSES = ["All", "Delivered", "In Transit", "Processing", "Cancelled"] as const;
type Status = (typeof STATUSES)[number];

const METHODS = ["All", "COD", "bKash"];
const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Total: High–Low", value: "total_desc" },
  { label: "Total: Low–High", value: "total_asc" },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  "In Transit": "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-600",
};

const ALL_ORDERS_INIT = [
  { id: "GJ-2026-5431", customer: "Nusrat Ahmed", email: "nusrat@example.com", date: "2026-08-06", dateLabel: "06 Aug 2026", total: 8740, status: "Delivered" as Status, items: 3, method: "bKash" },
  { id: "GJ-2026-5412", customer: "Farhana Khatun", email: "farhana@example.com", date: "2026-08-05", dateLabel: "05 Aug 2026", total: 4850, status: "In Transit" as Status, items: 1, method: "COD" },
  { id: "GJ-2026-5398", customer: "Tasnim Rahman", email: "tasnim@example.com", date: "2026-08-05", dateLabel: "05 Aug 2026", total: 2890, status: "Processing" as Status, items: 2, method: "bKash" },
  { id: "GJ-2026-5361", customer: "Sadia Islam", email: "sadia@example.com", date: "2026-08-04", dateLabel: "04 Aug 2026", total: 11340, status: "Delivered" as Status, items: 4, method: "COD" },
  { id: "GJ-2026-5320", customer: "Rifat Hasan", email: "rifat@example.com", date: "2026-08-03", dateLabel: "03 Aug 2026", total: 1990, status: "Cancelled" as Status, items: 1, method: "COD" },
  { id: "GJ-2026-5295", customer: "Meher Afsana", email: "meher@example.com", date: "2026-08-02", dateLabel: "02 Aug 2026", total: 5600, status: "Delivered" as Status, items: 2, method: "bKash" },
  { id: "GJ-2026-5270", customer: "Jannatul Ferdaus", email: "jannatul@example.com", date: "2026-08-01", dateLabel: "01 Aug 2026", total: 3450, status: "Processing" as Status, items: 1, method: "COD" },
  { id: "GJ-2026-5244", customer: "Rimi Akter", email: "rimi@example.com", date: "2026-07-31", dateLabel: "31 Jul 2026", total: 7900, status: "Delivered" as Status, items: 3, method: "bKash" },
  { id: "GJ-2026-5190", customer: "Parisa Chowdhury", email: "parisa@example.com", date: "2026-07-29", dateLabel: "29 Jul 2026", total: 2450, status: "Delivered" as Status, items: 1, method: "COD" },
  { id: "GJ-2026-5140", customer: "Bristy Dey", email: "bristy@example.com", date: "2026-07-27", dateLabel: "27 Jul 2026", total: 9890, status: "In Transit" as Status, items: 5, method: "bKash" },
];

const PAGE_SIZE = 6;

function AdminOrders() {
  const [orders, setOrders] = useState(ALL_ORDERS_INIT);
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [changingStatus, setChangingStatus] = useState<string | null>(null);

  let filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchMethod = methodFilter === "All" || o.method === methodFilter;
    const matchQ = !q || o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase());
    return matchStatus && matchMethod && matchQ;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === "oldest") return a.date.localeCompare(b.date);
    if (sort === "total_desc") return b.total - a.total;
    if (sort === "total_asc") return a.total - b.total;
    return b.date.localeCompare(a.date);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const paged = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    setChangingStatus(null);
  };

  const clearFilters = () => { setStatusFilter("All"); setMethodFilter("All"); setQ(""); setSort("newest"); setPage(1); };
  const hasFilters = statusFilter !== "All" || methodFilter !== "All" || q || sort !== "newest";

  const totalRevenue = orders.filter((o) => o.status === "Delivered").reduce((s, o) => s + o.total, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="eyebrow">Sales</p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} orders · ৳{totalRevenue.toLocaleString()} confirmed revenue</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(["Delivered", "In Transit", "Processing", "Cancelled"] as const).map((s) => (
          <div key={s} className="surface-card p-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{s}</p>
            <p className="mt-2 font-display text-2xl">{orders.filter((o) => o.status === s).length}</p>
            <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[s]}`}>{s}</span>
          </div>
        ))}
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input placeholder="Search order ID or customer…" className="rounded-full pl-10" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
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
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as Status); setPage(1); }}>
              {STATUSES.map((s) => <option key={s} value={s}>{s} {s !== "All" ? `(${orders.filter((o) => o.status === s).length})` : ""}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-[0.15em]">Payment Method</Label>
            <select className="mt-1.5 w-full rounded-full border border-border bg-background px-4 py-2 text-sm" value={methodFilter} onChange={(e) => { setMethodFilter(e.target.value); setPage(1); }}>
              {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Status Tab Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground hover:bg-secondary"}`}
          >
            {s} {s !== "All" && <span className="opacity-70">({orders.filter((o) => o.status === s).length})</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Date</th>
                <th className="px-5 py-3.5">Items</th>
                <th className="px-5 py-3.5">Method</th>
                <th className="px-5 py-3.5">Total</th>
                <th className="px-5 py-3.5 min-w-[150px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paged.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-primary">{o.id}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[13px]">{o.customer}</p>
                    <p className="text-[11px] text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap text-[12px]">{o.dateLabel}</td>
                  <td className="px-5 py-3.5 text-center text-muted-foreground text-[12px]">{o.items}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold">{o.method}</span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-[13px]">{formatBDT(o.total)}</td>
                  <td className="px-5 py-3.5">
                    <div className="relative">
                      {changingStatus === o.id ? (
                        <div className="flex flex-col gap-1 absolute top-0 left-0 z-10 rounded-xl border border-border bg-popover shadow-lg p-2 min-w-[140px]">
                          {(["Delivered", "In Transit", "Processing", "Cancelled"] as const).map((s) => (
                            <button key={s} onClick={() => handleStatusChange(o.id, s)}
                              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] text-left transition-colors hover:bg-secondary ${o.status === s ? "font-semibold text-primary" : ""}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[s]?.split(" ")[0]}`} />
                              {s}
                            </button>
                          ))}
                        </div>
                      ) : null}
                      <button
                        onClick={() => setChangingStatus(changingStatus === o.id ? null : o.id)}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors hover:opacity-80 ${STATUS_STYLES[o.status] ?? ""}`}
                      >
                        {o.status} <ChevronDown className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No orders match your filters.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">Page {safeP} of {totalPages} · {filtered.length} orders</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <button disabled={safeP <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-border disabled:opacity-40 hover:bg-secondary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`grid h-8 w-8 place-items-center rounded-full text-[12px] transition-colors ${n === safeP ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>{n}</button>
            ))}
            <button disabled={safeP >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="grid h-8 w-8 place-items-center rounded-full border border-border disabled:opacity-40 hover:bg-secondary transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
