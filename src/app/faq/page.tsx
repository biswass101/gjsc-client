"use client";

import { Route } from "../../features/pages/faq";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
