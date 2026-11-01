import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { AdminBrand, AdminPreOrder } from "@/types";
import { DEFAULT_PREORDER_IMAGES } from "../constants";

interface UsePreOrderModalFormProps {
  brands: AdminBrand[];
  addPreOrder: (po: Omit<AdminPreOrder, "id">) => AdminPreOrder;
  updatePreOrder: (id: string, updates: Partial<AdminPreOrder>) => void;
}

export function usePreOrderModalForm({
  brands,
  addPreOrder,
  updatePreOrder,
}: UsePreOrderModalFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPreOrder, setEditingPreOrder] = useState<AdminPreOrder | null>(null);

  const [productName, setProductName] = useState("");
  const [japaneseName, setJapaneseName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Prestige Skincare");
  const [price, setPrice] = useState("2800");
  const [depositPercent, setDepositPercent] = useState("50");
  const [estimatedArrival, setEstimatedArrival] = useState("15 Nov 2026");
  const [slotsTotal, setSlotsTotal] = useState("30");
  const [slotsBooked, setSlotsBooked] = useState("0");
  const [batchStatus, setBatchStatus] = useState<AdminPreOrder["batchStatus"]>("Booking Open");
  const [image, setImage] = useState(DEFAULT_PREORDER_IMAGES[0] || "");
  const [active, setActive] = useState(true);
  const [notes, setNotes] = useState("");

  const openCreateModal = useCallback(() => {
    setEditingPreOrder(null);
    setProductName("");
    setJapaneseName("");
    setBrand(brands[0]?.name || "Shiseido");
    setCategory("Prestige Skincare");
    setPrice("3200");
    setDepositPercent("50");
    setEstimatedArrival("20 Nov 2026");
    setSlotsTotal("25");
    setSlotsBooked("0");
    setBatchStatus("Booking Open");
    setImage(
      DEFAULT_PREORDER_IMAGES[Math.floor(Math.random() * DEFAULT_PREORDER_IMAGES.length)] || "",
    );
    setActive(true);
    setNotes("Direct Tokyo Ginza flagship purchase with verified manufacturer seal.");
    setIsModalOpen(true);
  }, [brands]);

  const openEditModal = useCallback((po: AdminPreOrder) => {
    setEditingPreOrder(po);
    setProductName(po.productName);
    setJapaneseName(po.japaneseName || "");
    setBrand(po.brand);
    setCategory(po.category);
    setPrice(String(po.price));
    setDepositPercent(String(po.depositPercent));
    setEstimatedArrival(po.estimatedArrival);
    setSlotsTotal(String(po.slotsTotal));
    setSlotsBooked(String(po.slotsBooked));
    setBatchStatus(po.batchStatus);
    setImage(po.image);
    setActive(po.active);
    setNotes(po.notes || "");
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!productName.trim()) {
        toast.error("Product name is required.");
        return;
      }

      if (editingPreOrder) {
        updatePreOrder(editingPreOrder.id, {
          productName: productName.trim(),
          japaneseName: japaneseName.trim() || undefined,
          brand: brand || "Glorious Japan",
          category,
          price: parseFloat(price) || 2500,
          depositPercent: parseInt(depositPercent, 10) || 50,
          estimatedArrival: estimatedArrival.trim() || "TBA",
          slotsTotal: parseInt(slotsTotal, 10) || 20,
          slotsBooked: parseInt(slotsBooked, 10) || 0,
          batchStatus,
          image: image.trim() || DEFAULT_PREORDER_IMAGES[0] || "",
          active,
          notes: notes.trim() || undefined,
        });
        toast.success(`Pre-order "${productName}" updated! 🌸`);
      } else {
        addPreOrder({
          productName: productName.trim(),
          japaneseName: japaneseName.trim() || undefined,
          brand: brand || "Glorious Japan",
          category,
          price: parseFloat(price) || 2500,
          depositPercent: parseInt(depositPercent, 10) || 50,
          estimatedArrival: estimatedArrival.trim() || "TBA",
          slotsTotal: parseInt(slotsTotal, 10) || 20,
          slotsBooked: parseInt(slotsBooked, 10) || 0,
          batchStatus,
          image: image.trim() || DEFAULT_PREORDER_IMAGES[0] || "",
          active,
          notes: notes.trim() || undefined,
        });
        toast.success(`Pre-order campaign launched for "${productName}"! 🌸`);
      }

      setIsModalOpen(false);
    },
    [
      productName,
      japaneseName,
      brand,
      category,
      price,
      depositPercent,
      estimatedArrival,
      slotsTotal,
      slotsBooked,
      batchStatus,
      image,
      active,
      notes,
      editingPreOrder,
      updatePreOrder,
      addPreOrder,
    ],
  );

  return {
    isModalOpen,
    setIsModalOpen,
    editingPreOrder,
    openCreateModal,
    openEditModal,
    handleSave,
    // Fields
    productName,
    setProductName,
    japaneseName,
    setJapaneseName,
    brand,
    setBrand,
    category,
    setCategory,
    price,
    setPrice,
    depositPercent,
    setDepositPercent,
    estimatedArrival,
    setEstimatedArrival,
    slotsTotal,
    setSlotsTotal,
    slotsBooked,
    setSlotsBooked,
    batchStatus,
    setBatchStatus,
    image,
    setImage,
    active,
    setActive,
    notes,
    setNotes,
  };
}
