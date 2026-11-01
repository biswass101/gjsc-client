"use client";

import { Leaf, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/types";

interface ProductIngredientsTabProps {
  product: Product;
}

export function ProductIngredientsTab({ product }: ProductIngredientsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow text-primary">Conscious Formulation</span>
        <h3 className="mt-1 font-display text-2xl font-medium">
          Key Japanese Botanicals & Ferments
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Sustainably harvested across Kyoto, Hokkaido, and Okinawa, fermented according to
          centuries-old Japanese precision.
        </p>
      </div>

      {/* Botanical Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {product.ingredients?.map((ing) => (
          <div
            key={ing}
            className="rounded-xl border border-border/70 bg-card p-5 shadow-xs transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              <h4 className="font-display text-base font-semibold">{ing}</h4>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Rich in natural bio-polyphenols and amino acids to calm oxidative stress and reinforce
              cellular moisture bonds.
            </p>
          </div>
        ))}
      </div>

      {/* Clean Beauty Checklist */}
      <div className="rounded-xl border border-border/70 bg-cream p-6">
        <h4 className="font-display text-base font-semibold text-foreground">
          The Japanese Pure Standard Guarantee
        </h4>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" /> Paraben-Free
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" /> Mineral Oil-Free
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" /> Artificial Color-Free
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" /> Cruelty-Free
          </span>
        </div>
      </div>

      {/* Full INCI Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="inci" className="border-border/70">
          <AccordionTrigger className="font-display text-base hover:text-primary">
            View Full INCI Ingredients List
          </AccordionTrigger>
          <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
            Water/Aqua/Eau, Glycerin, Butylene Glycol, Dipropylene Glycol,{" "}
            {product.ingredients?.join(", ")}, Sodium Hyaluronate, Hydrolyzed Collagen, Betaine,
            Trehalose, Carbomer, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA, Potassium
            Hydroxide, Tocopherol (Vitamin E).
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
