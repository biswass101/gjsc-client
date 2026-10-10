"use client";

import { Route } from "../../features/pages/about";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
