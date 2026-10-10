import { Link } from "@/lib/navigation";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 lg:gap-3 shrink-0" aria-label="Glorious Japan Skin Care - Home">
      <img
        src="/glorious-japan-skin-care-logo.jpeg"
        alt="Glorious Japan Skin Care"
        width={64}
        height={64}
        className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full object-cover shadow-sm border border-primary/30"
      />
      <span className="hidden lg:block">
        <span className="block font-display text-lg leading-none tracking-wide">Glorious Japan</span>
        <span className="block text-[9px] uppercase tracking-[0.35em] text-primary">Skin Care</span>
      </span>
    </Link>
  );
}