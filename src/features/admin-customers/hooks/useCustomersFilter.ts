import { useState, useMemo } from "react";
import type { AdminCustomer } from "@/types";

export function useCustomersFilter(customers: AdminCustomer[], pageSize: number = 8) {
  const [q, setQ] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [sort, setSort] = useState("spent_desc");
  const [page, setPage] = useState(1);

  // CRM Analytics
  const totalLTV = useMemo(() => customers.reduce((sum, c) => sum + c.totalSpent, 0), [customers]);

  const vipCount = useMemo(
    () => customers.filter((c) => c.tier === "VIP" || c.tier === "Platinum").length,
    [customers],
  );

  const avgLtv = useMemo(
    () => (customers.length > 0 ? Math.round(totalLTV / customers.length) : 0),
    [customers, totalLTV],
  );

  const citiesList = useMemo(() => {
    return ["All", ...Array.from(new Set(customers.map((c) => c.city)))];
  }, [customers]);

  // Filtered
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.email.toLowerCase().includes(q.toLowerCase()) ||
        c.phone.includes(q);

      const matchTier = tierFilter === "All" || c.tier === tierFilter;
      const matchCity = cityFilter === "All" || c.city === cityFilter;

      return matchQ && matchTier && matchCity;
    });
  }, [customers, q, tierFilter, cityFilter]);

  // Sorted
  const sortedCustomers = useMemo(() => {
    const list = [...filteredCustomers];
    if (sort === "spent_desc") return list.sort((a, b) => b.totalSpent - a.totalSpent);
    if (sort === "orders_desc") return list.sort((a, b) => b.ordersCount - a.ordersCount);
    if (sort === "name_asc") return list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filteredCustomers, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedCustomers.slice(start, start + pageSize);
  }, [sortedCustomers, currentPage, pageSize]);

  return {
    q,
    setQ,
    tierFilter,
    setTierFilter,
    cityFilter,
    setCityFilter,
    sort,
    setSort,
    page,
    setPage,
    totalLTV,
    vipCount,
    avgLtv,
    citiesList,
    filteredCustomers,
    sortedCustomers,
    pagedCustomers,
    totalPages,
    currentPage,
  };
}
