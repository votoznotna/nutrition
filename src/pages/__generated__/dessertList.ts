/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dessertList
// ====================================================

export interface dessertList_desserts_nutritionInfo {
  __typename: "NutritionInfo";
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface dessertList_desserts {
  __typename: "Dessert";
  id: string;
  name: string;
  nutritionInfo: dessertList_desserts_nutritionInfo;
  created: string;
}

export interface dessertList {
  desserts: dessertList_desserts[];
}
