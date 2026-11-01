import { TRUST_PERKS } from "./footerData";

export function FooterTrustStrip() {
  return (
    <div className="border-b border-border/60 bg-cream/90 py-6 sm:py-9">
      <div className="container-lux">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_PERKS.map((perk) => (
            <div key={perk.title} className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-primary/10 text-primary border border-primary/20">
                <perk.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="font-display text-xs sm:text-sm font-bold tracking-tight text-foreground">
                  {perk.title}
                </h4>
                <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

