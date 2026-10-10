"use client";

import { Route } from "../../features/pages/privacy";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
