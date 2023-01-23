import React from "react";


/* ---- TYPES ---- */

export type Yield = {
  amount: number;
  units: string;
};

export const UNITS = ["cups", "tbsp", "tsp", "mL", "g", "oz"] as const;
export type Unit = typeof UNITS[number];
// other less common units of measurement: cloves, slices, sprigs

export type Ingredient = {
  name: string;
  amount: number;
  units: Unit;
};

export type Recipe = {
  yield: Yield;
  ingredients: Array<Ingredient>;
  notes: string;
};

export type RecipeBook = { [key: string]: Recipe };

/* ---- FUNCTIONS --- */

export const addRecipe = (
  recipeBook: RecipeBook,
  newRecipe: Recipe,
  recipeName: string
): RecipeBook => {
  if (recipeName in recipeBook) {
    throw Error(
      `Failed to add recipe: a recipe with the name '${recipeName}' already exists in the recipe book.`
    );
  }
  return { ...recipeBook, [recipeName]: newRecipe };
};

export const deleteRecipe = (
  recipeBook: RecipeBook,
  recipeName: string
): RecipeBook => {
  if (!(recipeName in recipeBook)) {
    throw Error(
      `Failed to delete recipe: no recipe with the name ${recipeName} found in the recipe book.`
    );
  }
  delete recipeBook[recipeName];
  return recipeBook;
};
