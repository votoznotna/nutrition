/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewDessertInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDessert
// ====================================================

export interface CreateDessert_addDessert_nutritionInfo {
  __typename: "NutritionInfo";
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface CreateDessert_addDessert {
  __typename: "Dessert";
  id: string;
  name: string;
  nutritionInfo: CreateDessert_addDessert_nutritionInfo;
  created: string;
}

export interface CreateDessert {
  addDessert: CreateDessert_addDessert;
}

export interface CreateDessertVariables {
  input: NewDessertInput;
}
