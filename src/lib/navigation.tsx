"use client";

import NextLink from "next/link";
import { usePathname, useRouter as useNextRouter, useSearchParams } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { bySlug, type Product } from "./catalog";

type Search = Record<string, string | number | boolean | undefined>;
type QuerySearch = {
  category?: string | undefined;
  skinType?: string | undefined;
  concern?: string | undefined;
  badge?: string | undefined;
};
type RouteOptions = {
  component?: () => ReactNode;
  loader?: ({ params }: { params: Record<string, string> }) => unknown;
  head?: (args?: { loaderData?: { product: Product } }) => unknown;
  validateSearch?: unknown;
};

function toHref(to: string, search?: Search) {
  if (!search) return to;
  const params = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (value !== undefined) params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `${to}?${query}` : to;
}

export function Link({ to, search, params, ...props }: Omit<ComponentProps<typeof NextLink>, "href"> & { to: string; search?: Search | undefined; params?: Record<string, string> | undefined; }) {
  const resolvedTo = params ? to.replace(/\$([\w]+)/g, (_, key: string) => params[key] ?? "") : to;
  return <NextLink href={toHref(resolvedTo, search)} {...props} />;
}

export function useNavigate() {
  const router = useNextRouter();
  return ({ to, search, params }: { to: string; search?: Search | undefined; params?: Record<string, string> | undefined; }) => {
    const resolvedTo = params ? to.replace(/\$([\w]+)/g, (_, key: string) => params[key] ?? "") : to;
    router.push(toHref(resolvedTo, search));
  };
}

export function useRouter() {
  const router = useNextRouter();
  return { invalidate: () => router.refresh() };
}

export function useRouterState() {
  return { location: { pathname: usePathname() } };
}

export function useParams() {
  return { slug: usePathname().split("/").filter(Boolean).at(-1) ?? "" };
}

export function useSearch(): QuerySearch {
  const params = useSearchParams();
  return {
    category: params.get("category") ?? undefined,
    skinType: params.get("skinType") ?? undefined,
    concern: params.get("concern") ?? undefined,
    badge: params.get("badge") ?? undefined,
  };
}

export function Outlet() { return null; }
export function notFound(): never { throw new Error("Not found"); }

export function definePage(_path: string) {
  return (options: RouteOptions) => ({
    options,
    useSearch,
    useLoaderData: () => ({ product: bySlug(useParams()["slug"])! }),
  });
}