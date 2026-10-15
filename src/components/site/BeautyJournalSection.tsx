"use client";

import { Link } from "@/lib/navigation";
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";
import a1Img from "@/assets/hero/Cozy Japanese Skincare Routine.png";
import a2Img from "@/assets/hero/bright-spa-skincare-commercial-scene.png";
import a3Img from "@/assets/hero/sakura-spa-skincare-trio.png";

interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  read: string;
  author: string;
  image: string;
}

const ARTICLES: JournalArticle[] = [
  {
    slug: "japanese-layering-ritual",
    title: "The Japanese Layering Ritual, Explained",
    category: "Ritual Guide",
    excerpt:
      "Why the precise molecular order of application matters far more than the number of steps in your routine. How to layer water-weight essences with bio-ferment lipids.",
    date: "July 18, 2026",
    read: "6 min read",
    author: "Dr. Sayuri Tanaka, Tokyo Chemist",
    image: a1Img.src,
  },
  {
    slug: "double-cleansing",
    title: "Double Cleansing Without Stripping Your Skin Barrier",
    category: "Barrier Health",
    excerpt:
      "A gentle two-step method using low-pH rice oils and cloud-like micro-foam. How to melt away sunscreen and pollution in humid weather without triggering rebound sebum.",
    date: "June 30, 2026",
    read: "4 min read",
    author: "Editorial Team, Glorious Japan",
    image: a2Img.src,
  },
  {
    slug: "sakura-science",
    title: "Sakura Extract: The Ancient Science Behind the Petal",
    category: "Botanical Actives",
    excerpt:
      "How cherry blossom polyphenols help inhibit oxidative stress, calm summer flushing, and impart that signature translucent glow prized across Kyoto.",
    date: "June 02, 2026",
    read: "5 min read",
    author: "Kenji Sato, Botanical Researcher",
    image: a3Img.src,
  },
];

export function BeautyJournalSection() {
  return (
    <section className="bg-background py-8 sm:py-12 lg:py-16">
      <div className="container-lux">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="eyebrow text-[10px] sm:text-xs tracking-[0.2em] font-semibold">
                THE JOURNAL · 美容手帖
              </span>
            </div>
            <h2 className="mt-0.5 font-display text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Beauty Notes & Ritual Guides
            </h2>
            <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground hidden sm:block">
              Dermatological advice, ingredient science, and mindful Japanese beauty rituals curated for South Asian skin.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary hover:underline shrink-0"
          >
            <span>All articles</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Responsive Grid: swipe carousel with snap on mobile, 3-col grid on md */}
        <div className="flex gap-4 md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              to="/blog"
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg w-[82vw] xs:w-[72vw] sm:w-[45vw] md:w-auto shrink-0 snap-start"
            >
              <div>
                {/* Article Image Cover */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-cream">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="rounded-full bg-background/90 px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-xs border border-border/50">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-3.5 sm:p-4">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {art.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {art.read}
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-display text-sm sm:text-base lg:text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Author & Read Link */}
              <div className="p-3.5 sm:p-4 pt-0">
                <div className="pt-2.5 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[150px]">
                    {art.author}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-primary text-[10px] sm:text-xs">
                    <span>Read Guide</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
