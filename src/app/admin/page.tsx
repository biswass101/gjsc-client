"use client";

import { Route } from "../../features/pages/admin/index";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
