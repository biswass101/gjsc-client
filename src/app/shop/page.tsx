"use client";

import { Suspense } from "react";
import { Route } from "../../features/pages/shop";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Suspense fallback={null}><Component /></Suspense> : null;
}
