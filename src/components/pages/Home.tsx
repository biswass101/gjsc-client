"use client";

import { ArrowRight, Leaf, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { ProductCard } from "@/components/site/ProductCard";
import story from "@/assets/story.jpg";
import { BLOG_POSTS, CATEGORIES, TOP_CATEGORIES, CONCERNS, PRODUCTS, SKIN_TYPES, TESTIMONIALS } from "@/lib/catalog";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import { Link } from "@/lib/navigation";
import { Categories } from "./Categories";
import { Section } from "./shared/Section";

export function Home() {
  const best = PRODUCTS.filter((p) => p.badge === "Best Seller").slice(0, 4);
  const trending = PRODUCTS.filter((p) => p.badge === "Trending").slice(0, 4);
  const flash = PRODUCTS.filter((p) => p.compareAt).slice(0, 4);
  const fresh = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <Layout>
      <Hero />
      <Categories/>

      <Section eyebrow="Loved Most" title="Bestsellers" to="/shop" search={{ badge: "Best Seller" }}>
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      <Section eyebrow="Just Landed" title="New Arrivals" to="/shop" search={{ badge: "New" }}>
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {fresh.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      <Section eyebrow="Limited Time" title="Offers & Discounts" to="/shop" search={{ onSale: true }}>
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {flash.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* Skin type / concern */}
      <section className="bg-cream py-6 sm:py-8 lg:py-12">
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
            <p className="eyebrow text-[10px] sm:text-xs">Shop by Skin Concern</p>
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

      {/* Combo/Gifts - Placeholder for now as per current structure */}
      <Section eyebrow="Curated Collections" title="Combo & Gift Sets" to="/shop" search={{ category: "Gift Sets" }}>
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.filter(p => p.category === "Gift Sets").slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* Placeholder sections */}
      <Section eyebrow="Authentic Imports" title="Pre-Order from Japan">
         <div className="surface-card p-10 text-center text-muted-foreground italic">Coming Soon: Exclusive Pre-order service from Japan.</div>
      </Section>
      
      <Section eyebrow="Global Selection" title="SHEIN Products">
         <div className="surface-card p-10 text-center text-muted-foreground italic">Coming Soon: Curated SHEIN selection.</div>
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

