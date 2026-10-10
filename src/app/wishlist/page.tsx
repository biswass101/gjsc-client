"use client";

import { Route } from "../../features/pages/wishlist";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
