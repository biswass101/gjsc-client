"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { useProductModalForm } from "../hooks/useProductModalForm";
import { ProductModalHeader } from "./modal/ProductModalHeader";
import { ProductModalFooter } from "./modal/ProductModalFooter";
import { ProductIdentityTab } from "./tabs/ProductIdentityTab";
import { ProductPricingTab } from "./tabs/ProductPricingTab";
import { ProductScienceTab } from "./tabs/ProductScienceTab";
import { ProductRitualTab } from "./tabs/ProductRitualTab";
import { ProductMediaTab } from "./tabs/ProductMediaTab";

export interface ProductFormModalProps {
  modal: ReturnType<typeof useProductModalForm>;
}

export function ProductFormModal({ modal }: ProductFormModalProps) {
  const {
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    isSubmitting,
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
    handleToggleSkinType,
    formConcerns,
    handleToggleConcern,
    formIngredients,
    newIngredientInput,
    setNewIngredientInput,
    handleAddIngredient,
    handleRemoveIngredient,
    formBenefits,
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
    newGalleryInput,
    setNewGalleryInput,
    handleAddGalleryImage,
    handleRemoveGalleryImage,
    computedMargin,
    handleGenerateSku,
    handleGenerateBarcode,
    handleNextTab,
    handlePrevTab,
    handleSaveProduct,
  } = modal;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-hidden flex flex-col p-0 gap-0 rounded-2xl border border-border shadow-2xl bg-card">
        <ProductModalHeader
          editingProduct={editingProduct}
          formStatus={formStatus}
          formTab={formTab}
          onTabChange={setFormTab}
        />

        {/* Modal Tab Body */}
        <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-5 space-y-4">
          {formTab === "identity" && (
            <ProductIdentityTab
              name={formName}
              onNameChange={setFormName}
              japaneseName={formJapaneseName}
              onJapaneseNameChange={setFormJapaneseName}
              brand={formBrand}
              onBrandChange={setFormBrand}
              category={formCategory}
              onCategoryChange={setFormCategory}
              productType={formProductType}
              onProductTypeChange={setFormProductType}
              origin={formOrigin}
              onOriginChange={setFormOrigin}
              badge={formBadge}
              onBadgeChange={setFormBadge}
              status={formStatus}
              onStatusChange={setFormStatus}
            />
          )}

          {formTab === "pricing" && (
            <ProductPricingTab
              price={formPrice}
              onPriceChange={setFormPrice}
              compareAt={formCompareAt}
              onCompareAtChange={setFormCompareAt}
              costPrice={formCostPrice}
              onCostPriceChange={setFormCostPrice}
              stock={formStock}
              onStockChange={setFormStock}
              lowStockThreshold={formLowStockThreshold}
              onLowStockThresholdChange={setFormLowStockThreshold}
              sku={formSku}
              onSkuChange={setFormSku}
              barcode={formBarcode}
              onBarcodeChange={setFormBarcode}
              sizes={formSizes}
              onSizesChange={setFormSizes}
              computedMargin={computedMargin}
              onGenerateSku={handleGenerateSku}
              onGenerateBarcode={handleGenerateBarcode}
            />
          )}

          {formTab === "science" && (
            <ProductScienceTab
              skinTypes={formSkinTypes}
              onToggleSkinType={handleToggleSkinType}
              concerns={formConcerns}
              onToggleConcern={handleToggleConcern}
              ingredients={formIngredients}
              newIngredientInput={newIngredientInput}
              onNewIngredientInputChange={setNewIngredientInput}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              benefits={formBenefits}
              newBenefitInput={newBenefitInput}
              onNewBenefitInputChange={setNewBenefitInput}
              onAddBenefit={handleAddBenefit}
              onRemoveBenefit={handleRemoveBenefit}
              texture={formTexture}
              onTextureChange={setFormTexture}
              spf={formSpf}
              onSpfChange={setFormSpf}
              pao={formPao}
              onPaoChange={setFormPao}
            />
          )}

          {formTab === "ritual" && (
            <ProductRitualTab
              short={formShort}
              onShortChange={setFormShort}
              howTo={formHowTo}
              onHowToChange={setFormHowTo}
              desc={formDesc}
              onDescChange={setFormDesc}
            />
          )}

          {formTab === "media" && (
            <ProductMediaTab
              image={formImage}
              onImageChange={setFormImage}
              gallery={formGallery}
              newGalleryInput={newGalleryInput}
              onNewGalleryInputChange={setNewGalleryInput}
              onAddGalleryImage={handleAddGalleryImage}
              onRemoveGalleryImage={handleRemoveGalleryImage}
            />
          )}

          <ProductModalFooter
            formTab={formTab}
            isEditing={!!editingProduct}
            isSubmitting={isSubmitting}
            onClose={() => setIsModalOpen(false)}
            onPrevTab={handlePrevTab}
            onNextTab={handleNextTab}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
