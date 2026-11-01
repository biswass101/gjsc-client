import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { AdminCustomer } from "@/types";

interface UseAddCustomerFormProps {
  addCustomer: (
    customer: Omit<
      AdminCustomer,
      "id" | "joinedDate" | "ordersCount" | "totalSpent" | "avgOrderValue"
    >,
  ) => AdminCustomer;
}

export function useAddCustomerForm({ addCustomer }: UseAddCustomerFormProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addCity, setAddCity] = useState("Dhaka");
  const [addDivision, setAddDivision] = useState("Dhaka");
  const [addSkinType, setAddSkinType] = useState("Combination");
  const [addTier, setAddTier] = useState<AdminCustomer["tier"]>("Standard");
  const [addNotes, setAddNotes] = useState("");

  const handleCreateCustomer = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!addName.trim() || !addPhone.trim()) {
        toast.error("Please provide customer name and phone.");
        return;
      }

      addCustomer({
        name: addName.trim(),
        email: addEmail.trim() || `${addName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: addPhone.trim(),
        city: addCity,
        division: addDivision,
        tier: addTier,
        status: "Active",
        skinType: addSkinType,
        skinConcerns: ["Hydration", "Brightening"],
        notes: addNotes.trim() || "Customer added via CRM.",
      });

      toast.success(`Customer ${addName} added to CRM! 🌸`);
      setIsAddOpen(false);
      setAddName("");
      setAddPhone("");
      setAddEmail("");
      setAddNotes("");
    },
    [
      addName,
      addPhone,
      addEmail,
      addCity,
      addDivision,
      addTier,
      addSkinType,
      addNotes,
      addCustomer,
    ],
  );

  return {
    isAddOpen,
    setIsAddOpen,
    addName,
    setAddName,
    addEmail,
    setAddEmail,
    addPhone,
    setAddPhone,
    addCity,
    setAddCity,
    addDivision,
    setAddDivision,
    addSkinType,
    setAddSkinType,
    addTier,
    setAddTier,
    addNotes,
    setAddNotes,
    handleCreateCustomer,
  };
}
