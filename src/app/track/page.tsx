"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STEPS = ["Order placed", "Packed in Dhaka", "Out for delivery", "Delivered"];

export default function TrackPage() {
  const [shown, setShown] = useState(false);

  return (
    <Layout>
      <div className="container-lux max-w-2xl py-20">
        <p className="eyebrow">Order Tracking</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Where is my parcel?</h1>
        <form className="mt-8 flex gap-2" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
          <Input required placeholder="Order ID e.g. GJ-2026-5192" className="rounded-full" />
          <Button type="submit" className="rounded-full px-8 text-xs uppercase tracking-[0.18em]">Track</Button>
        </form>

        {shown && (
          <ol className="surface-card mt-8 space-y-6 p-8">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                {i < 3 ? <CheckCircle2 className="h-5 w-5 text-primary" strokeWidth={1.5} /> : <Circle className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />}
                <span className={i < 3 ? "text-sm" : "text-sm text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Layout>
  );
}
