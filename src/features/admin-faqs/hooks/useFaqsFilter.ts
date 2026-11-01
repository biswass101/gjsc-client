import { useState, useMemo } from "react";
import { AdminFaq } from "@/context/admin-context";

export function useFaqsFilter(faqs: AdminFaq[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFaqs = useMemo(() => {
    return faqs
      .filter((faq) => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;

        const q = searchQuery.toLowerCase();
        const matchesSearch =
          faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.order - b.order);
  }, [faqs, selectedCategory, searchQuery]);

  const activeCount = useMemo(() => faqs.filter((f) => f.active).length, [faqs]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredFaqs,
    activeCount,
  };
}
