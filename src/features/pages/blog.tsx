import { definePage } from "@/lib/navigation";
import { Layout } from "@/components/site/Layout";
import { BLOG_POSTS } from "@/lib/catalog";

export const Route = definePage("/blog")({
  head: () => ({
    meta: [
      { title: "The Journal — Japanese Beauty Notes | Glorious Japan Skin Care" },
      { name: "description", content: "Rituals, ingredients and routines explained by our Japanese skincare experts." },
      { property: "og:title", content: "The Journal | Glorious Japan Skin Care" },
      { property: "og:description", content: "Japanese beauty rituals and ingredient science." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Layout>
      <div className="border-b border-border bg-cream py-12">
        <div className="container-lux">
          <p className="eyebrow">The Journal</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Beauty Notes</h1>
        </div>
      </div>
      <div className="container-lux grid gap-6 py-12 md:grid-cols-3">
        {BLOG_POSTS.map((b) => (
          <article key={b.slug} className="surface-card p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{b.date} · {b.read}</p>
            <h2 className="mt-3 font-display text-2xl leading-snug">{b.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{b.excerpt}</p>
          </article>
        ))}
      </div>
    </Layout>
  ),
});
