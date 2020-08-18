/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetDesserts
// ====================================================

export interface ResetDesserts_resetDesserts_nutritionInfo {
  __typename: "NutritionInfo";
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface ResetDesserts_resetDesserts {
  __typename: "Dessert";
  id: string;
  name: string;
  nutritionInfo: ResetDesserts_resetDesserts_nutritionInfo;
  created: string;
}

export interface ResetDesserts {
  resetDesserts: ResetDesserts_resetDesserts[];
}
