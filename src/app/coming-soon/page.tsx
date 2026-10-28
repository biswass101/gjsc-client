import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { Layout } from "@/components/layout";
import { Sparkles, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Coming Soon | Glorious Japan Skin Care",
  description: "New Japanese beauty rituals and collections are arriving soon.",
};

export default function ComingSoonPage() {
  return (
    <Layout>
      <div className="container-lux py-24 sm:py-32 flex flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 shadow-sm">
          <Sparkles className="h-8 w-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">
          Coming Soon · まもなく登場
        </span>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-xl">
          Crafting A New Japanese Ritual
        </h1>

        <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
          Our Tokyo curators are preparing this special experience with certified Japanese partner laboratories. Check back soon for the official launch.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full bg-primary text-primary-foreground font-semibold px-6 shadow-xs">
            <Link to="/shop">
              <span>Explore Shop All</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

