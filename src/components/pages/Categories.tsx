import { TOP_CATEGORIES } from "@/lib/catalog";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import { Link } from "@/lib/navigation";
import { Section } from "./shared/Section";
export function Categories() {
  return (
    <Section
      eyebrow="Shop by Category"
      title="Top Categories"
      subtitle="Our most-loved essentials for a complete ritual."
      to="/categories"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-5 lg:gap-4">
        {TOP_CATEGORIES.map((c, i) => {
          const bgImages = [p1, p2, p3, p4, p5, p6];
          const bgImage = bgImages[i % bgImages.length]!;
          return (
            <Link
              key={c}
              to="/shop"
              search={{ category: c }}
              className="group relative flex flex-col items-center justify-center gap-2 rounded-lg border border-border overflow-hidden p-2 sm:p-4 lg:p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)] aspect-square"
            >
              {/* Background image */}
              <img
                src={bgImage.src}
                alt={c}
                className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Content */}
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-[10px] sm:text-xs leading-tight font-semibold text-foreground drop-shadow-md">
                  {c}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
