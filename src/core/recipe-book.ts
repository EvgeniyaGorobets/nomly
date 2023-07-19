import type { Ingredient } from "./ingredient";
import type { Yield } from "./recipe-yield";

/* ---- TYPES ---- */

export type Recipe = {
  yield: Yield;
  ingredients: Array<Ingredient>;
  notes: string;
};

export type RecipeBook = { [key: string]: Recipe };

/* ---- FUNCTIONS --- */

export const updateRecipe = (
  recipeBook: RecipeBook,
  newRecipe: Recipe,
  recipeName: string
): RecipeBook => {
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

  const clonedRecipeBook = { ...recipeBook };
  delete clonedRecipeBook[recipeName];
  return clonedRecipeBook;
};

export const cloneRecipe = (
  recipeBook: RecipeBook,
  recipeName: string
): RecipeBook => {
  return {
    ...recipeBook,
    [`${recipeName} (Copy)`]: {
      ...recipeBook[recipeName],
    },
  };
};
