import { definePage, Link } from "@/lib/navigation";
import { ArrowRight, Leaf, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { ProductCard } from "@/components/site/ProductCard";
import story from "@/assets/story.jpg";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, CATEGORIES, CONCERNS, PRODUCTS, SKIN_TYPES, TESTIMONIALS } from "@/lib/catalog";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export const Route = definePage("/")({
  head: () => ({
    meta: [
      { title: "Glorious Japan Skin Care — Authentic Japanese Beauty in Bangladesh" },
      {
        name: "description",
        content:
          "Premium Japanese skincare: fermented serums, essences and sunscreens. Cash on Delivery & bKash. Stay Glorious, Shine with Confidence.",
      },
      { property: "og:title", content: "Glorious Japan Skin Care — Authentic Japanese Beauty" },
      {
        property: "og:description",
        content: "Fermented Japanese serums, essences and rituals. Free delivery over ৳5,000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Section({
  eyebrow,
  title,
  subtitle,
  children,
  to,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  to?: string;
}) {
  return (
    <section className="container-lux py-10 sm:py-14 lg:py-20">
      <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center text-center">
        <p className="eyebrow text-[10px] sm:text-xs">{eyebrow}</p>
        <h2 className="mt-2 sm:mt-3 font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
        {subtitle && <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
        <div className="gold-rule mt-4 sm:mt-6" />
      </div>
      {children}
      {to && (
        <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full px-6 sm:px-8 py-2 sm:py-6 text-[9px] sm:text-xs uppercase tracking-[0.2em]">
            <Link to={to as "/shop"}>
              View all <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

function Home() {
  const best = PRODUCTS.filter((p) => p.badge === "Best Seller").slice(0, 4);
  const trending = PRODUCTS.filter((p) => p.badge === "Trending").slice(0, 4);
  const flash = PRODUCTS.filter((p) => p.compareAt).slice(0, 4);
  const fresh = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <Layout>
      <Hero />

      {/* Categories */}
      <Section eyebrow="Shop by Category" title="The Collection" subtitle="Sixteen curated categories, one considered ritual." to="/shop">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 lg:gap-4 lg:grid-cols-8">
          {CATEGORIES.map((c, i) => {
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
                  <span className="text-[10px] sm:text-xs leading-tight font-semibold text-foreground drop-shadow-md">{c}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Skin type / concern */}
      <section className="bg-cream py-10 sm:py-14 lg:py-20">
        <div className="container-lux grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-[10px] sm:text-xs">Shop by Skin Type</p>
            <h2 className="mt-2 sm:mt-3 font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl">Know your skin</h2>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              {SKIN_TYPES.map((s) => (
                <Link
                  key={s}
                  to="/shop"
                  search={{ skinType: s }}
                  className="rounded-full border border-border bg-background px-3 sm:px-6 py-1.5 sm:py-3 text-xs sm:text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow text-[10px] sm:text-xs">Shop by Concern</p>
            <h2 className="mt-2 sm:mt-3 font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl">Target the concern</h2>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              {CONCERNS.map((c) => (
                <Link
                  key={c}
                  to="/shop"
                  search={{ concern: c }}
                  className="rounded-full border border-border bg-background px-3 sm:px-6 py-1.5 sm:py-3 text-xs sm:text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Loved Most" title="Best Sellers" to="/shop">
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* Flash sale */}
      <section className="bg-foreground py-10 sm:py-14 lg:py-20 text-background">
        <div className="container-lux">
          <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center text-center">
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.28em] text-champagne">Flash Sale · Ends Sunday</p>
            <h2 className="mt-2 sm:mt-3 font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Quiet Luxury, Kinder Price</h2>
          </div>
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {flash.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <Section eyebrow="Just Landed" title="New Arrivals" to="/shop">
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {fresh.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      <Section eyebrow="Rising" title="Trending Now" to="/shop">
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* Story */}
      <section className="bg-cream py-10 sm:py-14 lg:py-20">
        <div className="container-lux grid items-center gap-6 sm:gap-8 lg:gap-14 lg:grid-cols-2">
          <img
            src={story.src}
            alt="Japanese skincare ritual with sakura petals"
            width={1200}
            height={1408}
            loading="lazy"
            className="rounded-lg object-cover shadow-[var(--shadow-card)]"
          />
          <div>
            <p className="eyebrow text-[10px] sm:text-xs">Our Philosophy</p>
            <h2 className="mt-2 sm:mt-3 font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Beauty as a quiet daily ritual</h2>
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Glorious Japan Skin Care began in 2025 with one belief: skincare should feel like a moment of calm, not a
              chore. Every formula we import is chosen for its purity, its provenance and its gentleness — fermented
              slowly, tested rigorously, and delivered to your door sealed and authentic.
            </p>
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-3">
              {[
                { icon: Leaf, title: "Clean formulas", text: "No parabens, no harsh alcohols." },
                { icon: ShieldCheck, title: "Verified authentic", text: "Sourced through Japanese partners." },
                { icon: Sparkles, title: "Dermatologist led", text: "Reviewed by skin specialists." },
              ].map((f) => (
                <div key={f.title}>
                  <f.icon className="h-4 sm:h-5 w-4 sm:w-5 text-primary" strokeWidth={1.5} />
                  <p className="mt-2 text-xs sm:text-sm font-semibold">{f.title}</p>
                  <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Kind Words" title="Loved in Bangladesh">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="surface-card p-4 sm:p-6 lg:p-8">
              <p className="font-display text-base sm:text-lg lg:text-xl leading-relaxed">"{t.text}"</p>
              <figcaption className="mt-4 sm:mt-6 text-[9px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section eyebrow="The Journal" title="Beauty Notes" to="/blog">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((b) => (
            <Link key={b.slug} to="/blog" className="group surface-card overflow-hidden p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:shadow-[var(--shadow-card)]">
              <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{b.date} · {b.read}</p>
              <h3 className="mt-2 sm:mt-3 font-display text-lg sm:text-xl lg:text-2xl leading-snug transition-colors group-hover:text-primary">{b.title}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
