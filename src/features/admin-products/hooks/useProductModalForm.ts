"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BRANDS, CATEGORIES, PRODUCT_IMAGES } from "@/lib/catalog";
import type { AdminProduct } from "@/context/admin-context";
import { useProductFormState } from "./useProductFormState";
import {
  PRODUCT_DEFAULT_SHORT,
  PRODUCT_DEFAULT_DESC,
  PRODUCT_DEFAULT_HOW_TO,
  PRODUCT_DEFAULT_INGREDIENTS,
  PRODUCT_DEFAULT_BENEFITS,
} from "../data/productDefaults";

export function useProductModalForm(
  addProduct: (
    product: Omit<AdminProduct, "id" | "slug" | "createdAt" | "salesCount">,
  ) => Promise<AdminProduct> | AdminProduct | void,
  updateProduct: (id: string, updates: Partial<AdminProduct>) => Promise<void> | void,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formState = useProductFormState();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    formState.setFormTab("identity");
    formState.setFormName("");
    formState.setFormJapaneseName("");
    formState.setFormBrand(BRANDS[0] || "Shiseido");
    formState.setFormCategory(CATEGORIES[0] || "Serum");
    formState.setFormProductType("in-stock");
    formState.setFormPrice("2500");
    formState.setFormCompareAt("3200");
    formState.setFormCostPrice("1550");
    formState.setFormStock("30");
    formState.setFormLowStockThreshold("5");
    formState.setFormSku(`JP-${Math.floor(1000 + Math.random() * 9000)}`);
    formState.setFormBarcode(`4580${Math.floor(10000000 + Math.random() * 90000000)}`);
    formState.setFormBadge("New");
    formState.setFormStatus("active");
    formState.setFormSizes("30ml, 50ml, 100ml");
    formState.setFormOrigin("Tokyo, Japan");
    formState.setFormTexture("Watery Essence / Lotion");
    formState.setFormSpf("None");
    formState.setFormPao("12M");
    formState.setFormImage(
      PRODUCT_IMAGES[0] ||
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    );
    formState.setFormGallery([
      PRODUCT_IMAGES[0] ||
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    ]);
    formState.setNewGalleryInput("");
    formState.setFormShort(PRODUCT_DEFAULT_SHORT);
    formState.setFormDesc(PRODUCT_DEFAULT_DESC);
    formState.setFormHowTo(PRODUCT_DEFAULT_HOW_TO);
    formState.setFormSkinTypes(["All Skin Types", "Dry", "Sensitive"]);
    formState.setFormConcerns(["Hydration", "Brightening"]);
    formState.setFormIngredients(PRODUCT_DEFAULT_INGREDIENTS);
    formState.setNewIngredientInput("");
    formState.setFormBenefits(PRODUCT_DEFAULT_BENEFITS);
    formState.setNewBenefitInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: AdminProduct) => {
    setEditingProduct(p);
    formState.setFormTab("identity");
    formState.setFormName(p.name);
    formState.setFormJapaneseName(p.japaneseName || "");
    formState.setFormBrand(p.brand);
    formState.setFormCategory(p.category);
    formState.setFormProductType(p.productType || "in-stock");
    formState.setFormPrice(p.price.toString());
    formState.setFormCompareAt(p.compareAt ? p.compareAt.toString() : "");
    formState.setFormCostPrice(p.costPrice.toString());
    formState.setFormStock(p.stock.toString());
    formState.setFormLowStockThreshold((p.lowStockThreshold || 5).toString());
    formState.setFormSku(p.sku);
    formState.setFormBarcode(p.barcode || `4580${Math.floor(10000000 + Math.random() * 90000000)}`);
    formState.setFormBadge(p.badge || "");
    formState.setFormStatus(p.status);
    formState.setFormSizes(p.sizes ? p.sizes.join(", ") : "50ml");
    formState.setFormOrigin(p.origin || "Tokyo, Japan");
    formState.setFormTexture(p.texture || "Watery Essence / Lotion");
    formState.setFormSpf(p.spf || "None");
    formState.setFormPao(p.pao || "12M");
    formState.setFormImage(p.image);
    formState.setFormGallery(p.images && p.images.length > 0 ? p.images : [p.image]);
    formState.setNewGalleryInput("");
    formState.setFormShort(p.short || PRODUCT_DEFAULT_SHORT);
    formState.setFormDesc(p.description || "");
    formState.setFormHowTo(p.howTo || PRODUCT_DEFAULT_HOW_TO);
    formState.setFormSkinTypes(p.skinTypes || ["All Skin Types"]);
    formState.setFormConcerns(p.concerns || ["Hydration"]);
    formState.setFormIngredients(
      p.ingredients || [
        "Rice Ferment Filtrate",
        "Hyaluronic Acid (5 Molecular Weights)",
        "Niacinamide (5%)",
      ],
    );
    formState.setNewIngredientInput("");
    formState.setFormBenefits(
      p.benefits || [
        "Deep 72-Hour Cellular Moisture Lock",
        "Strengthens Damaged Acid Mantle & Lipid Barrier",
      ],
    );
    formState.setNewBenefitInput("");
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.formName.trim()) {
      toast.error("Please enter a formulation title.");
      return;
    }

    setIsSubmitting(true);
    try {
      const priceNum = parseFloat(formState.formPrice) || 0;
      const compareAtNum = formState.formCompareAt ? parseFloat(formState.formCompareAt) : undefined;
      const costNum = parseFloat(formState.formCostPrice) || Math.round(priceNum * 0.6);
      const stockNum = parseInt(formState.formStock, 10) || 0;
      const lowStockNum = parseInt(formState.formLowStockThreshold, 10) || 5;

      const sizesArray = formState.formSizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const cleanCover =
        formState.formImage.trim() ||
        PRODUCT_IMAGES[0] ||
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80";
      const allImages: string[] = [
        cleanCover,
        ...formState.formGallery.filter(
          (img): img is string =>
            typeof img === "string" && img.trim().length > 0 && img !== cleanCover,
        ),
      ];

      const cleanIngredients =
        formState.formIngredients.length > 0
          ? formState.formIngredients
          : ["Rice Ferment Filtrate", "Hyaluronic Acid (5 Molecular Weights)"];

      const cleanBenefits =
        formState.formBenefits.length > 0
          ? formState.formBenefits
          : [
              "Deep 72-Hour Cellular Moisture Lock",
              "Strengthens Damaged Acid Mantle & Lipid Barrier",
            ];

      const payload = {
        name: formState.formName.trim(),
        brand: formState.formBrand,
        category: formState.formCategory,
        productType: formState.formProductType,
        price: priceNum,
        compareAt: compareAtNum,
        costPrice: costNum,
        stock: stockNum,
        lowStockThreshold: lowStockNum,
        badge: (formState.formBadge as AdminProduct["badge"]) || null,
        status: formState.formStatus,
        image: cleanCover,
        images: allImages,
        short: formState.formShort.trim(),
        description: formState.formDesc.trim(),
        howTo: formState.formHowTo.trim(),
        skinTypes: formState.formSkinTypes,
        concerns: formState.formConcerns,
        ingredients: cleanIngredients,
        benefits: cleanBenefits,
        sizes: sizesArray.length > 0 ? sizesArray : ["50ml"],
        origin: formState.formOrigin.trim(),
        texture: formState.formTexture.trim(),
        spf: formState.formSpf === "None" ? undefined : formState.formSpf,
        pao: formState.formPao.trim(),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...payload,
          japaneseName: formState.formJapaneseName.trim() || `${formState.formBrand} プレミアム処方`,
          sku: formState.formSku.trim() || editingProduct.sku,
          barcode: formState.formBarcode.trim() || editingProduct.barcode,
        });
        toast.success(`Updated "${formState.formName}" successfully! ✨`);
      } else {
        await addProduct({
          ...payload,
          japaneseName: formState.formJapaneseName.trim() || `${formState.formBrand} 公式処方`,
          sku:
            formState.formSku.trim() ||
            `${formState.formBrand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
          barcode:
            formState.formBarcode.trim() || `4580${Math.floor(10000000 + Math.random() * 90000000)}`,
          rating: 5.0,
          reviewsCount: 1,
        });
        toast.success(`Product "${formState.formName}" added to catalog! 🌸`);
      }

      setIsModalOpen(false);
    } catch (err: any) {
      const msg = err?.message || "Failed to save product to database.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    isSubmitting,
    ...formState,
    handleOpenAdd,
    handleOpenEdit,
    handleSaveProduct,
  };
}
