"use client";

import { useState, useEffect } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type ColorTheme = {
  id: string;
  name: string;
  subtitle: string;
  primaryColor: string; // CSS hex/rgb representation for swatch
  accentColor: string;
  bgColor: string;
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "sakura-bloom",
    name: "Sakura Bloom",
    subtitle: "Sophisticated Sakura Rose Pink (Default)",
    primaryColor: "#df6b88",
    accentColor: "#f7d6e0",
    bgColor: "#faf5f6",
  },
  {
    id: "sakura-silk",
    name: "Sakura Silk",
    subtitle: "Muted Dusty Rose & Linen",
    primaryColor: "#c97a8b",
    accentColor: "#e6c7ce",
    bgColor: "#f9f6f7",
  },
  {
    id: "imperial-gold",
    name: "Imperial Gold",
    subtitle: "Classic Champagne & Ivory Gold",
    primaryColor: "#cfa85e",
    accentColor: "#f3e5c8",
    bgColor: "#faf7f2",
  },
  {
    id: "matcha-sakura",
    name: "Matcha & Sakura",
    subtitle: "Japanese Botanical Sage Green",
    primaryColor: "#5d8a66",
    accentColor: "#f4d3dc",
    bgColor: "#f5f8f5",
  },
  {
    id: "midnight-sakura",
    name: "Midnight Sakura",
    subtitle: "Luxe Dark Obsidian Velvet",
    primaryColor: "#f080a0",
    accentColor: "#3a2536",
    bgColor: "#1e1822",
  },
];

const THEME_KEY = "gjsc-color-palette-v1";

export function useThemePalette() {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || "sakura-bloom";
    }
    return "sakura-bloom";
  });

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, themeId);
      document.documentElement.setAttribute("data-theme", themeId);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) || "sakura-bloom";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return { currentTheme, setTheme };
}

export function PaletteSwitcher({ variant = "popover" }: { variant?: "popover" | "floating" | "inline" }) {
  const { currentTheme, setTheme } = useThemePalette();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (theme: ColorTheme) => {
    setTheme(theme.id);
    toast.success(`Theme palette changed to ${theme.name}`, {
      description: theme.subtitle,
    });
    setIsOpen(false);
  };

  if (variant === "inline") {
    return (
      <div className="space-y-2">
        {COLOR_THEMES.map((t) => {
          const isActive = currentTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t)}
              className={`group flex w-full items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-200 ${
                isActive
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border/60 bg-background hover:border-primary/40 hover:bg-secondary/60"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Swatch preview */}
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.bgColor }}>
                  <span
                    className="h-3.5 w-3.5 rounded-full shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: t.primaryColor }}
                  />
                </div>
                <div>
                  <p className="text-[11px] font-semibold">{t.name}</p>
                  <p className="text-[9px] text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
              {isActive && <Check className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={2.5} />}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 left-6 z-50 hidden lg:block">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              aria-label="Color Palette Switcher"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary active:scale-95"
            >
              <Palette className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            className="w-80 rounded-2xl border border-border bg-popover/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="font-display text-base font-semibold">Theme Color Palettes</h4>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Live Preview</span>
            </div>

            <div className="mt-3 space-y-2">
              {COLOR_THEMES.map((t) => {
                const isActive = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(t)}
                    className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border/60 bg-background/50 hover:border-primary/40 hover:bg-secondary/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Swatch preview */}
                      <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.bgColor }}>
                        <span
                          className="h-4 w-4 rounded-full shadow-sm transition-transform group-hover:scale-110"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.subtitle}</p>
                      </div>
                    </div>
                    {isActive && <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Color Palette Switcher"
          className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          title="Switch Color Palette"
        >
          <Palette className="h-[18px] w-[18px] text-primary" strokeWidth={1.75} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-80 rounded-2xl border border-border bg-popover/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="font-display text-base font-semibold">Theme Color Palettes</h4>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Live Preview</span>
        </div>

        <div className="mt-3 space-y-2">
          {COLOR_THEMES.map((t) => {
            const isActive = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border/60 bg-background/50 hover:border-primary/40 hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Swatch preview */}
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.bgColor }}>
                    <span
                      className="h-4 w-4 rounded-full shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: t.primaryColor }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.subtitle}</p>
                  </div>
                </div>
                {isActive && <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
