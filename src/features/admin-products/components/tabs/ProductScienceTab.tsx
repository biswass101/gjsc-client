"use client";

import {
  ProductSkinTypesConcerns,
  type ProductSkinTypesConcernsProps,
} from "./science/ProductSkinTypesConcerns";
import {
  ProductIngredientsEditor,
  type ProductIngredientsEditorProps,
} from "./science/ProductIngredientsEditor";
import {
  ProductBenefitsEditor,
  type ProductBenefitsEditorProps,
} from "./science/ProductBenefitsEditor";
import {
  ProductFormulaCharacteristics,
  type ProductFormulaCharacteristicsProps,
} from "./science/ProductFormulaCharacteristics";

export interface ProductScienceTabProps
  extends
    ProductSkinTypesConcernsProps,
    ProductIngredientsEditorProps,
    ProductBenefitsEditorProps,
    ProductFormulaCharacteristicsProps {}

export function ProductScienceTab({
  skinTypes,
  onToggleSkinType,
  concerns,
  onToggleConcern,
  ingredients,
  newIngredientInput,
  onNewIngredientInputChange,
  onAddIngredient,
  onRemoveIngredient,
  benefits,
  newBenefitInput,
  onNewBenefitInputChange,
  onAddBenefit,
  onRemoveBenefit,
  texture,
  onTextureChange,
  spf,
  onSpfChange,
  pao,
  onPaoChange,
}: ProductScienceTabProps) {
  return (
    <div className="space-y-5 animate-fade-in">
      <ProductSkinTypesConcerns
        skinTypes={skinTypes}
        onToggleSkinType={onToggleSkinType}
        concerns={concerns}
        onToggleConcern={onToggleConcern}
      />

      <ProductIngredientsEditor
        ingredients={ingredients}
        newIngredientInput={newIngredientInput}
        onNewIngredientInputChange={onNewIngredientInputChange}
        onAddIngredient={onAddIngredient}
        onRemoveIngredient={onRemoveIngredient}
      />

      <ProductBenefitsEditor
        benefits={benefits}
        newBenefitInput={newBenefitInput}
        onNewBenefitInputChange={onNewBenefitInputChange}
        onAddBenefit={onAddBenefit}
        onRemoveBenefit={onRemoveBenefit}
      />

      <ProductFormulaCharacteristics
        texture={texture}
        onTextureChange={onTextureChange}
        spf={spf}
        onSpfChange={onSpfChange}
        pao={pao}
        onPaoChange={onPaoChange}
      />
    </div>
  );
}
