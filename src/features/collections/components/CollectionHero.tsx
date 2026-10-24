"use client";

import type { CollectionMeta } from "../data/collectionMetadata";

interface CollectionHeroProps {
  meta: CollectionMeta;
}

export function CollectionHero({ meta }: CollectionHeroProps) {
  return (
    <section
      aria-label={`${meta.title} Banner`}
      className="container-lux pt-2 sm:pt-3 pb-2 sm:pb-3"
    >
      <div className="relative w-full h-44 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg sm:rounded-2xl border border-border/40 bg-muted shadow-2xs">
        <img
          src={meta.bannerImage}
          alt={`${meta.title} Banner`}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
}
