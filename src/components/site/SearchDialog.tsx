import { useMemo, useState } from "react";
import { useNavigate } from "@/lib/navigation";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PRODUCTS, formatBDT } from "@/lib/catalog";

const TRENDING = ["Serum", "Sunscreen", "Sakura", "Gift Sets", "Essence"];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term),
    ).slice(0, 6);
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 max-w-2xl translate-y-0 rounded-lg p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search products</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search serums, cleansers, gift sets…"
            className="border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-5">
          {!q.trim() && (
            <>
              <p className="eyebrow">Trending searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TRENDING.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="rounded-full border border-border px-4 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
          {q.trim() && results.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No products match “{q}”.</p>
          )}
          <div className="space-y-1">
            {results.map((p) => (
              <button
                key={p.slug}
                className="flex w-full items-center gap-4 rounded-md p-2 text-left transition-colors hover:bg-secondary"
                onClick={() => {
                  onOpenChange(false);
                  setQ("");
                  navigate({ to: "/product/$slug", params: { slug: p.slug } });
                }}
              >
                <img src={p.image} alt="" width={900} height={900} loading="lazy" className="h-14 w-14 rounded-md object-cover" />
                <span className="flex-1">
                  <span className="block font-display text-lg leading-tight">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">{p.category}</span>
                </span>
                <span className="text-sm font-semibold">{formatBDT(p.price)}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
