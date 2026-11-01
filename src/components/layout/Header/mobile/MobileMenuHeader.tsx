import { SheetTitle } from "@/components/ui/sheet";

export function MobileMenuHeader() {
  return (
    <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 bg-cream/50">
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <img
            src="/glorious-japan-skin-care-logo.jpeg"
            alt="Glorious Japan"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover border border-primary/30"
          />
          <span className="absolute -bottom-1 -right-1 rounded-full bg-primary px-1 py-0.2 text-[6.5px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
            Beta
          </span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <SheetTitle className="font-display text-base font-bold leading-tight block">
              Glorious Japan
            </SheetTitle>
            <span className="rounded-full bg-primary/15 border border-primary/35 px-1 py-0.2 text-[7.5px] font-bold uppercase tracking-wider text-primary">
              Beta
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-primary uppercase">
            栄光日本 · 美の儀式
          </span>
        </div>
      </div>
    </div>
  );
}

