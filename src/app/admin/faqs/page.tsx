"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAdmin, AdminFaq } from "@/context/admin-context";
import {
  FaqsHeader,
  FaqsKpiCards,
  FaqsFiltersBar,
  FaqsList,
  FaqFormModal,
  FaqDeleteDialog,
  useFaqsFilter,
  useFaqModalForm,
  FAQ_CATEGORIES,
} from "@/features/admin-faqs";

export default function AdminFaqsPage() {
  const { faqs, updateFaq, deleteFaq } = useAdmin();
  const [faqToDelete, setFaqToDelete] = useState<AdminFaq | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredFaqs,
    activeCount,
  } = useFaqsFilter(faqs);

  const {
    isModalOpen,
    setIsModalOpen,
    editingFaq,
    category,
    setCategory,
    question,
    setQuestion,
    answer,
    setAnswer,
    order,
    setOrder,
    active,
    setActive,
    openCreateModal,
    openEditModal,
    handleSave,
  } = useFaqModalForm();

  const handleConfirmDelete = () => {
    if (!faqToDelete) return;
    deleteFaq(faqToDelete.id);
    toast.success("FAQ deleted.");
    setFaqToDelete(null);
  };

  const handleToggleActive = (faq: AdminFaq) => {
    updateFaq(faq.id, { active: !faq.active });
    toast.success(`FAQ ${!faq.active ? "activated" : "hidden"}.`);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <FaqsHeader onCreateFaq={openCreateModal} />

      <FaqsKpiCards
        totalFaqs={faqs.length}
        activeCount={activeCount}
        categoriesCount={FAQ_CATEGORIES.length}
      />

      <FaqsFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        faqs={faqs}
      />

      <FaqsList
        faqs={filteredFaqs}
        onOpenCreate={openCreateModal}
        onEdit={openEditModal}
        onDelete={(faq) => setFaqToDelete(faq)}
        onToggleActive={handleToggleActive}
      />

      <FaqFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingFaq={editingFaq}
        category={category}
        setCategory={setCategory}
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
        order={order}
        setOrder={setOrder}
        active={active}
        setActive={setActive}
        onSubmit={handleSave}
      />

      <FaqDeleteDialog
        faqToDelete={faqToDelete}
        onClose={() => setFaqToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
