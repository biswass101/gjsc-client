import { Layout } from "@/components/site/Layout";
import { BLOG_POSTS } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Journal — Japanese Beauty Notes | Glorious Japan Skin Care",
  description: "Rituals, ingredients and routines explained by our Japanese skincare experts.",
  openGraph: {
    title: "The Journal | Glorious Japan Skin Care",
    description: "Japanese beauty rituals and ingredient science.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BlogPage() {
  return (
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
  );
}
