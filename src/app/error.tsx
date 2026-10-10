"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">This page did not load</h1>
        <p className="mt-3 text-muted-foreground">Something went wrong. Try again or return home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={reset} className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">Try again</button>
          <Link href="/" className="rounded-full border border-border px-6 py-3 text-sm">Home</Link>
        </div>
      </div>
    </main>
  );
}