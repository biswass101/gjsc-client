"use client";

import { Route } from "../../../features/pages/product.$slug";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
