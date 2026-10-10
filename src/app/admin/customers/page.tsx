"use client";

import { Route } from "../../../features/pages/admin/customers";

export default function Page() {
  const Component = Route.options.component;
  return Component ? <Component /> : null;
}
