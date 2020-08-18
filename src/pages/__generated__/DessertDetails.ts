/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DessertDetails
// ====================================================

export interface DessertDetails_nutritionInfo {
  __typename: "NutritionInfo";
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface DessertDetails {
  __typename: "Dessert";
  id: string;
  name: string;
  nutritionInfo: DessertDetails_nutritionInfo;
  created: string;
}
