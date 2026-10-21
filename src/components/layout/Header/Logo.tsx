import { Link } from "@/lib/navigation";

export function Logo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2 lg:gap-3 shrink-0"
      aria-label="Glorious Japan Skin Care - Home (Beta)"
    >
      <div className="relative shrink-0">
        <img
          src="/glorious-japan-skin-care-logo.jpeg"
          alt="Glorious Japan Skin Care"
          width={64}
          height={64}
          className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full object-cover shadow-sm border border-primary/30 transition-transform duration-300 group-hover:scale-105"
        />
        {/* Floating Beta Badge on Mobile / Small Screens */}
        <span
          title="Website is currently in Beta / Under Active Development"
          className="lg:hidden absolute -bottom-1 -right-1 rounded-full bg-primary px-1 py-0.2 text-[7px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs border border-background"
        >
          Beta
        </span>
      </div>

      <span className="hidden lg:block">
        <span className="flex items-center gap-1.5 font-display text-lg leading-none tracking-wide text-foreground">
          <span>Glorious Japan</span>
          {/* Elegant Beta Tag on Desktop */}
          <span
            title="Website is currently in Beta / Under Active Development"
            className="rounded-full bg-primary/15 border border-primary/35 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary cursor-help transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Beta
          </span>
        </span>
        <span className="block text-[9px] uppercase tracking-[0.35em] text-primary mt-0.5 font-medium">
          Skin Care
        </span>
      </span>
    </Link>
  );
}