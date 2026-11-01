import { useState, useMemo } from "react";
import { AdminPageMeta } from "@/context/admin-context";

export function usePagesFilter(pageMetas: AdminPageMeta[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = useMemo(() => {
    return pageMetas.filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.pageName.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q) ||
        p.heroHeading.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q)
      );
    });
  }, [pageMetas, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredPages,
  };
}

