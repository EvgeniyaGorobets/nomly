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

/**
 * Updates the given recipe book with a new or updated recipe
 * @param recipeBook The recipe book in which the recipe is stored
 * @param newRecipe The new version of the recipe (or the new recipe)
 * @param recipeName The name of the recipe
 * @returns A copy of the recipe book, with the new or updated recipe
 */
export const updateRecipe = (
  recipeBook: RecipeBook,
  newRecipe: Recipe,
  recipeName: string
): RecipeBook => {
  return { ...recipeBook, [recipeName]: newRecipe };
};

/**
 * Deletes the recipe with recipeName from recipeBook
 * @param recipeBook The recipe book containing the recipe
 * @param recipeName The name of the recipe to delete
 * @returns A copy of the recipe book, without the deleted recipe
 */
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

/**
 * Creates a copy of the recipe called recipeName in the recipe book
 * @param recipeBook The recipe book containing the recipe to be cloned
 * @param recipeName The name of the recipe to clone
 * @returns A copy of the recipe book, with another copy of the recipe with
 * recipeName, but named "{recipeName} (Copy)" to keep key uniqueness
 */
export const cloneRecipe = (
  recipeBook: RecipeBook,
  recipeName: string
): RecipeBook => {
  const recipe = recipeBook[recipeName];

  // deep copy
  const clonedYield: Yield = { ...recipe.yield };
  const clonedIngredients: Ingredient[] = recipe.ingredients.map(
    (ingredient) => {
      return { ...ingredient };
    }
  );

  return {
    ...recipeBook,
    [`${recipeName} (Copy)`]: {
      yield: clonedYield,
      ingredients: clonedIngredients,
      notes: recipe.notes,
    },
  };
};
