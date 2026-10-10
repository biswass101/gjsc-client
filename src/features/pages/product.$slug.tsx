import { useEffect, useState } from "react";
import { definePage, Link, notFound } from "@/lib/navigation";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Rating } from "@/components/site/Rating";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS, bySlug, formatBDT } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = definePage("/product/$slug")({
  loader: ({ params }) => {
    const product = bySlug(params["slug"]!);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }: { loaderData?: { product: typeof PRODUCTS[number] } } = {}) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} | Glorious Japan Skin Care` : "Product | Glorious Japan Skin Care" },
        { name: "description", content: p ? `${p.name} — ${p.short} ${formatBDT(p.price)}.` : "Japanese skincare product." },
        { property: "og:title", content: p ? `${p.name} | Glorious Japan` : "Glorious Japan Skin Care" },
        { property: "og:description", content: p?.short ?? "Premium Japanese skincare." },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, addRecent, recent } = useShop();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes[0] ?? "50ml");

  useEffect(() => {
    addRecent(product.slug);
    setQty(1);
    setSize(product.sizes[0] ?? "50ml");
  }, [product.slug, product.sizes, addRecent]);

  const saved = wishlist.includes(product.slug);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const fallbackRelated = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);
  const alsoLike = related.length ? related : fallbackRelated;
  const recentlyViewed = recent.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean).slice(0, 4) as typeof PRODUCTS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.short,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-lux py-8">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" search={{ category: product.category }} className="hover:text-primary">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container-lux grid gap-14 pb-16 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="group overflow-hidden rounded-lg bg-cream">
            <img
              src={product.image}
              alt={product.name}
              width={900}
              height={900}
              className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <img key={i} src={product.image} alt="" width={900} height={900} loading="lazy" className="aspect-square w-full rounded-md object-cover opacity-80 transition-opacity hover:opacity-100" />
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4"><Rating value={product.rating} count={product.reviews} /></div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatBDT(product.price)}</span>
            {product.compareAt && <span className="text-base text-muted-foreground line-through">{formatBDT(product.compareAt)}</span>}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="eyebrow">Size</p>
            <div className="mt-3 flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-5 py-2 text-sm transition-colors ${s === size ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border px-2 py-1.5">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <Button
              className="flex-1 rounded-full py-6 text-xs uppercase tracking-[0.2em]"
              disabled={product.stock === 0}
              onClick={() => addToCart(product.slug, qty, size)}
            >
              {product.stock === 0 ? "Out of stock" : "Add to bag"}
            </Button>
            <Button variant="outline" aria-label="Save to wishlist" className="h-[52px] w-[52px] rounded-full p-0" onClick={() => toggleWishlist(product.slug)}>
              <Heart className={saved ? "fill-rose text-rose" : ""} strokeWidth={1.5} />
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            {product.stock === 0 ? "Currently unavailable" : product.stock < 10 ? `Only ${product.stock} left in stock` : "In stock · ships within 24 hours"}
          </p>

          <div className="mt-8 grid gap-4 rounded-lg border border-border bg-cream p-6 text-xs text-muted-foreground sm:grid-cols-3">
            <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" strokeWidth={1.5} /> Delivery in 1–3 days</p>
            <p className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-primary" strokeWidth={1.5} /> 7-day easy return</p>
            <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.5} /> 100% authentic</p>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="ing">
              <AccordionTrigger className="font-display text-lg">Ingredients</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{product.ingredients.join(", ")}.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="ben">
              <AccordionTrigger className="font-display text-lg">Benefits</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {product.benefits.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how">
              <AccordionTrigger className="font-display text-lg">How to use</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{product.howTo}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="warn">
              <AccordionTrigger className="font-display text-lg">Warnings & shipping</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                For external use only. Discontinue if irritation occurs. Store away from direct sunlight. Nationwide
                delivery with Cash on Delivery or bKash; free above ৳5,000.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <section className="container-lux pb-16">
        <Tabs defaultValue="reviews">
          <TabsList className="rounded-full">
            <TabsTrigger value="reviews" className="rounded-full px-6">Reviews</TabsTrigger>
            <TabsTrigger value="qa" className="rounded-full px-6">Questions</TabsTrigger>
            <TabsTrigger value="ship" className="rounded-full px-6">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { n: "Sadia H.", r: 5, t: "Absorbs beautifully, no stickiness. My skin looks calmer within a week." },
              { n: "Mehjabin T.", r: 4, t: "Lovely texture and scent. Packaging arrived sealed and authentic." },
            ].map((rv) => (
              <div key={rv.n} className="surface-card p-6">
                <Rating value={rv.r} />
                <p className="mt-3 text-sm text-muted-foreground">{rv.t}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{rv.n} · Verified buyer</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="qa" className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Is it suitable for sensitive skin?</strong><br />Yes — fragrance is minimal and the formula is dermatologist reviewed.</p>
            <p><strong className="text-foreground">Can I use it with retinol?</strong><br />Yes, apply this first and allow it to absorb fully.</p>
          </TabsContent>
          <TabsContent value="ship" className="mt-8 text-sm text-muted-foreground">
            Inside Dhaka 1–2 days, outside Dhaka 2–4 days. Free delivery on orders over ৳5,000. Unopened products can be
            returned within 7 days.
          </TabsContent>
        </Tabs>
      </section>

      <section className="container-lux pb-24 sm:pb-20">
        <h2 className="mb-4 sm:mb-8 font-display text-2xl sm:text-3xl">You may also like</h2>
        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {alsoLike.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {recentlyViewed.length > 1 && (
        <section className="container-lux pb-24 sm:pb-20">
          <h2 className="mb-4 sm:mb-8 font-display text-2xl sm:text-3xl">Recently viewed</h2>
          <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Sticky mobile add to cart - with bottom padding to avoid floating chat overlap */}
      <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 pr-16">
          <span className="font-semibold text-sm">{formatBDT(product.price * qty)}</span>
          <Button className="flex-1 rounded-full py-6 text-xs uppercase tracking-[0.2em]" disabled={product.stock === 0} onClick={() => addToCart(product.slug, qty, size)}>
            Add to bag
          </Button>
        </div>
      </div>
    </Layout>
  );
}
