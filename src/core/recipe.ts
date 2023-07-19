import type { Ingredient } from "./ingredient";

/* ---- TYPES ---- */

export type Yield = {
  amount: number;
  units: string;
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

// This is basically the same function as above, but a different validation check
// Maybe I should turn them into one function
export const updateRecipe = (
  recipeBook: RecipeBook,
  newRecipe: Recipe,
  recipeName: string
): RecipeBook => {
  if (!(recipeName in recipeBook)) {
    throw Error(
      `Failed to update recipe: a recipe with the name '${recipeName}' does not exist in the recipe book.`
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
