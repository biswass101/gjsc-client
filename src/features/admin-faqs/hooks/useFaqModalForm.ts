import { useState } from "react";
import { toast } from "sonner";
import { AdminFaq, useAdmin } from "@/context/admin-context";
import { FAQ_CATEGORIES } from "../constants";

export function useFaqModalForm() {
  const { faqs, addFaq, updateFaq } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<AdminFaq | null>(null);

  const [category, setCategory] = useState<AdminFaq["category"]>(
    FAQ_CATEGORIES[0] || "Authenticity & Japan Sourcing",
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState("1");
  const [active, setActive] = useState(true);

  const openCreateModal = () => {
    setEditingFaq(null);
    setCategory(FAQ_CATEGORIES[0] || "Authenticity & Japan Sourcing");
    setQuestion("");
    setAnswer("");
    setOrder(String(faqs.length + 1));
    setActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: AdminFaq) => {
    setEditingFaq(faq);
    setCategory(faq.category);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(String(faq.order));
    setActive(faq.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter a question.");
      return;
    }
    if (!answer.trim()) {
      toast.error("Please enter an answer.");
      return;
    }

    const payload = {
      category,
      question: question.trim(),
      answer: answer.trim(),
      order: parseInt(order, 10) || 1,
      active,
    };

    if (editingFaq) {
      updateFaq(editingFaq.id, payload);
      toast.success("FAQ updated successfully! 🌸");
    } else {
      addFaq(payload);
      toast.success("FAQ published to customer help center! 🌸");
    }

    setIsModalOpen(false);
  };

  return {
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
  };
}
