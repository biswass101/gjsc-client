"use client";

import { Route } from "../../../features/pages/admin/products";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
