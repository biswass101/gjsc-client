"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "@/lib/navigation";
import { Search, Sparkles, X } from "lucide-react";
import { PRODUCTS, formatBDT } from "@/lib/catalog";

const TRENDING = ["Serum", "Sunscreen", "Sakura", "Gift Sets", "Essence"];

const AI_SUGGESTIONS: Record<string, string[]> = {
  dry: ["Hydrating serums", "Barrier-repair creams", "Essence mists"],
  oily: ["Oil-control serums", "Lightweight moisturisers", "Pore-minimisers"],
  acne: ["BHA / salicylic toners", "Niacinamide serums", "Soothing gels"],
  bright: ["Vitamin C serums", "Kojic acid creams", "Glow essences"],
  anti: ["Retinol serums", "Peptide moisturisers", "Eye creams"],
  sun: ["SPF 50+ sunscreens", "UV-protection essences"],
};

function getAISuggestions(q: string): string[] {
  if (!q.trim()) return [];
  const lower = q.toLowerCase();
  for (const [key, suggestions] of Object.entries(AI_SUGGESTIONS)) {
    if (lower.includes(key)) return suggestions;
  }
  return [];
}

export function InlineSearch() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Keyboard: Escape closes */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const normalResults = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term),
    ).slice(0, 6);
  }, [q]);

  const aiSuggestions = useMemo(() => (aiMode ? getAISuggestions(q) : []), [q, aiMode]);

  const open = focused && (q.trim().length > 0 || !q.trim());

  const handleSelect = (slug: string) => {
    setFocused(false);
    setQ("");
    navigate({ to: "/product/$slug", params: { slug } });
  };

  const handleAiSuggestion = (s: string) => {
    setQ(s);
    setAiMode(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[180px] sm:max-w-sm lg:max-w-md">
      {/* Search input row */}
      <div
        className={`flex h-9 items-center gap-2 rounded-full border px-3.5 transition-all ${
          focused
            ? "border-primary/50 bg-background shadow-sm"
            : "border-border/60 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/60"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />

        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={aiMode ? "Describe your skin concern…" : "Search products, brands…"}
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />

        {/* Clear button */}
        {q && (
          <button
            type="button"
            onClick={() => { setQ(""); inputRef.current?.focus(); }}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {/* AI / Normal mode toggle pill */}
        <button
          type="button"
          onClick={() => setAiMode((v) => !v)}
          title={aiMode ? "Switch to normal search" : "Switch to AI search"}
          className={`shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all ${
            aiMode
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }`}
        >
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          <span className="hidden sm:inline">{aiMode ? "AI" : "AI"}</span>
        </button>
      </div>

      {/* Dropdown — fixed on mobile so it can't overflow the header */}
      {open && (
        <div className="fixed left-2 right-2 top-16 z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-[var(--shadow-lift)] sm:absolute sm:left-0 sm:right-0 sm:top-full sm:mt-2">
          {/* ---- AI mode ---- */}
          {aiMode && (
            <div className="p-4">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                AI Suggestions
              </p>
              {!q.trim() && (
                <p className="text-xs text-muted-foreground">
                  Describe your skin concern, e.g. "I have dry sensitive skin" or "anti-ageing".
                </p>
              )}
              {aiSuggestions.length > 0 ? (
                <div className="mt-2 flex flex-col gap-1">
                  {aiSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleAiSuggestion(s)}
                      className="rounded-xl px-3 py-2 text-left text-xs transition-colors hover:bg-secondary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : q.trim() ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  No AI suggestions for "{q}". Try words like dry, oily, acne, bright, sun…
                </p>
              ) : null}
            </div>
          )}

          {/* ---- Normal mode ---- */}
          {!aiMode && (
            <>
              {/* Trending chips — shown when no query */}
              {!q.trim() && (
                <div className="px-4 pt-4 pb-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Trending
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setQ(t); inputRef.current?.focus(); }}
                        className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {q.trim() && normalResults.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No products match "{q}".
                </p>
              )}

              {normalResults.length > 0 && (
                <div className="flex flex-col py-2">
                  {normalResults.map((p) => (
                    <button
                      key={p.slug}
                      className="flex items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-secondary"
                      onClick={() => handleSelect(p.slug)}
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-sm leading-tight">
                          {p.name}
                        </span>
                        <span className="block text-[11px] text-muted-foreground">{p.category}</span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold">{formatBDT(p.price)}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

