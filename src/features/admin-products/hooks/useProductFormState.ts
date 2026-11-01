"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { BRANDS, CATEGORIES } from "@/lib/catalog";
import type { AdminProduct } from "@/context/admin-context";
import { FORM_TABS } from "../data/productConstants";
import type { ProductFormTab } from "../types";

export function useProductFormState() {
  const [formTab, setFormTab] = useState<ProductFormTab>("identity");
  const [formName, setFormName] = useState("");
  const [formJapaneseName, setFormJapaneseName] = useState("");
  const [formBrand, setFormBrand] = useState<string>(BRANDS[0] || "Shiseido");
  const [formCategory, setFormCategory] = useState<string>(CATEGORIES[0] || "Serum");
  const [formProductType, setFormProductType] = useState<"in-stock" | "pre-order-japan" | "shein">(
    "in-stock",
  );
  const [formPrice, setFormPrice] = useState("2500");
  const [formCompareAt, setFormCompareAt] = useState("3200");
  const [formCostPrice, setFormCostPrice] = useState("1550");
  const [formStock, setFormStock] = useState("30");
  const [formLowStockThreshold, setFormLowStockThreshold] = useState("5");
  const [formSku, setFormSku] = useState("");
  const [formBarcode, setFormBarcode] = useState("");
  const [formBadge, setFormBadge] = useState<AdminProduct["badge"] | "">("");
  const [formStatus, setFormStatus] = useState<AdminProduct["status"]>("active");
  const [formSizes, setFormSizes] = useState("30ml, 50ml, 100ml");
  const [formOrigin, setFormOrigin] = useState("Tokyo, Japan");
  const [formTexture, setFormTexture] = useState("Watery Essence / Lotion");
  const [formSpf, setFormSpf] = useState("None");
  const [formPao, setFormPao] = useState("12M");
  const [formSkinTypes, setFormSkinTypes] = useState<string[]>(["All Skin Types"]);
  const [formConcerns, setFormConcerns] = useState<string[]>(["Hydration"]);
  const [formIngredients, setFormIngredients] = useState<string[]>([
    "Rice Ferment Filtrate",
    "Hyaluronic Acid (5 Molecular Weights)",
    "Niacinamide (5%)",
  ]);
  const [newIngredientInput, setNewIngredientInput] = useState("");
  const [formBenefits, setFormBenefits] = useState<string[]>([
    "Deep 72-Hour Cellular Moisture Lock",
    "Strengthens Damaged Acid Mantle & Lipid Barrier",
    "Promotes Luminous Glass-Skin Plump Radiance",
  ]);
  const [newBenefitInput, setNewBenefitInput] = useState("");
  const [formShort, setFormShort] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formHowTo, setFormHowTo] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState("");

  const computedMargin = useMemo(() => {
    const p = parseFloat(formPrice) || 0;
    const c = parseFloat(formCostPrice) || 0;
    const comp = parseFloat(formCompareAt) || 0;
    const profit = Math.max(0, p - c);
    const percent = p > 0 ? Math.round((profit / p) * 100) : 0;
    const discount = comp > p ? Math.round(((comp - p) / comp) * 100) : 0;
    return { profit, percent, discount };
  }, [formPrice, formCostPrice, formCompareAt]);

  const handleGenerateSku = () => {
    const brandCode = (formBrand || "GLO")
      .slice(0, 3)
      .toUpperCase()
      .replace(/[^A-Z]/g, "JP");
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setFormSku(`${brandCode}-${randNum}`);
    toast.success("Generated unique SKU code!");
  };

  const handleGenerateBarcode = () => {
    const janSuffix = Math.floor(10000000 + Math.random() * 90000000);
    setFormBarcode(`4580${janSuffix}`);
    toast.success("Generated Japanese JAN-13 barcode!");
  };

  const handleToggleSkinType = (st: string) => {
    setFormSkinTypes((prev) =>
      prev.includes(st)
        ? prev.length > 1
          ? prev.filter((item) => item !== st)
          : prev
        : [...prev, st],
    );
  };

  const handleToggleConcern = (c: string) => {
    setFormConcerns((prev) =>
      prev.includes(c)
        ? prev.length > 1
          ? prev.filter((item) => item !== c)
          : prev
        : [...prev, c],
    );
  };

  const handleAddIngredient = (val?: string) => {
    const target = (val || newIngredientInput).trim();
    if (!target) return;
    if (!formIngredients.includes(target)) {
      setFormIngredients((prev) => [...prev, target]);
    }
    setNewIngredientInput("");
  };

  const handleRemoveIngredient = (target: string) => {
    setFormIngredients((prev) => prev.filter((i) => i !== target));
  };

  const handleAddBenefit = (val?: string) => {
    const target = (val || newBenefitInput).trim();
    if (!target) return;
    if (!formBenefits.includes(target)) {
      setFormBenefits((prev) => [...prev, target]);
    }
    setNewBenefitInput("");
  };

  const handleRemoveBenefit = (target: string) => {
    setFormBenefits((prev) => prev.filter((b) => b !== target));
  };

  const handleAddGalleryImage = (url?: string) => {
    const target = (url || newGalleryInput).trim();
    if (!target) return;
    if (!formGallery.includes(target)) {
      setFormGallery((prev) => [...prev, target]);
    }
    setNewGalleryInput("");
  };

  const handleRemoveGalleryImage = (url: string) => {
    setFormGallery((prev) => prev.filter((img) => img !== url));
    if (formImage === url && formGallery.length > 1) {
      const nextCover = formGallery.find((img) => img !== url);
      if (nextCover) setFormImage(nextCover);
    }
  };

  const handleNextTab = () => {
    const currentIndex = FORM_TABS.findIndex((t) => t.id === formTab);
    if (currentIndex >= 0 && currentIndex < FORM_TABS.length - 1) {
      const nextTab = FORM_TABS[currentIndex + 1];
      if (nextTab) setFormTab(nextTab.id);
    }
  };

  const handlePrevTab = () => {
    const currentIndex = FORM_TABS.findIndex((t) => t.id === formTab);
    if (currentIndex > 0) {
      const prevTab = FORM_TABS[currentIndex - 1];
      if (prevTab) setFormTab(prevTab.id);
    }
  };

  return {
    formTab,
    setFormTab,
    formName,
    setFormName,
    formJapaneseName,
    setFormJapaneseName,
    formBrand,
    setFormBrand,
    formCategory,
    setFormCategory,
    formProductType,
    setFormProductType,
    formPrice,
    setFormPrice,
    formCompareAt,
    setFormCompareAt,
    formCostPrice,
    setFormCostPrice,
    formStock,
    setFormStock,
    formLowStockThreshold,
    setFormLowStockThreshold,
    formSku,
    setFormSku,
    formBarcode,
    setFormBarcode,
    formBadge,
    setFormBadge,
    formStatus,
    setFormStatus,
    formSizes,
    setFormSizes,
    formOrigin,
    setFormOrigin,
    formTexture,
    setFormTexture,
    formSpf,
    setFormSpf,
    formPao,
    setFormPao,
    formSkinTypes,
    setFormSkinTypes,
    handleToggleSkinType,
    formConcerns,
    setFormConcerns,
    handleToggleConcern,
    formIngredients,
    setFormIngredients,
    newIngredientInput,
    setNewIngredientInput,
    handleAddIngredient,
    handleRemoveIngredient,
    formBenefits,
    setFormBenefits,
    newBenefitInput,
    setNewBenefitInput,
    handleAddBenefit,
    handleRemoveBenefit,
    formShort,
    setFormShort,
    formDesc,
    setFormDesc,
    formHowTo,
    setFormHowTo,
    formImage,
    setFormImage,
    formGallery,
    setFormGallery,
    newGalleryInput,
    setNewGalleryInput,
    handleAddGalleryImage,
    handleRemoveGalleryImage,
    computedMargin,
    handleGenerateSku,
    handleGenerateBarcode,
    handleNextTab,
    handlePrevTab,
  };
}
