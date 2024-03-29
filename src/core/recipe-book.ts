import type { Ingredient } from "./ingredient";
import type { Yield } from "./recipe-yield";
import { deepCopy } from "./utils";

/* ---- TYPES ---- */

export type Recipe = {
  yield: Yield;
  ingredients: Ingredient[];
  notes: string;
};

export type RecipeBook = { [key: string]: Recipe };

/* ---- FUNCTIONS --- */

/**
 * Get a blank Recipe data structure with all values pre-filled
 * @returns A new blank recipe with no ingredients or notes
 */
export const getBlankRecipe = (): Recipe => {
  return {
    yield: { amount: 1, units: "servings" },
    ingredients: [],
    notes: "",
  };
};

/**
 * Updates the given recipe book with a new or updated recipe
 * @param recipeBook The recipe book in which the recipe is stored
 * @param newRecipe The new version of the recipe (or the new recipe)
 * @param oldRecipeName The name of the recipe before it was edited
 * (will be the empty string for new recipes)
 * @param newRecipeName The new name of the recipe (may be the same
 * as oldRecipeName)
 * @returns A copy of the recipe book, with the new or updated recipe
 */
export const updateRecipe = (
  recipeBook: RecipeBook,
  newRecipe: Recipe,
  oldRecipeName: string,
  newRecipeName: string
): RecipeBook => {
  const newRecipeBook: RecipeBook = deepCopy(recipeBook);
  if (oldRecipeName) {
    delete newRecipeBook[oldRecipeName];
  }
  newRecipeBook[newRecipeName] = newRecipe;
  return newRecipeBook;
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

  const clonedRecipeBook = deepCopy(recipeBook);
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
  let newRecipeName: string = recipeName;
  while (newRecipeName in recipeBook) {
    newRecipeName = newRecipeName + " (Copy)";
  }
  return {
    ...deepCopy(recipeBook),
    [newRecipeName]: deepCopy(recipeBook[recipeName]),
  };
};

/**
 * Evaluate whether newName is a valid recipe name. If it is not,
 * returns an error message describing what's wrong. If it is,
 * returns an empty string.
 * @param initialName - The original name of the recipe ("" if this is a new recipe)
 * @param newName - The new (proposed) name of the recipe
 * @param recipeBook - The RecipeBook this recipe is in
 * @returns The error message, or an empty string if there are no errors
 */
export const validateRecipeName = (
  initialName: string,
  newName: string,
  recipeBook: RecipeBook
): string => {
  if (newName.length == 0) {
    return "Recipe name cannot be empty";
  } else if (newName.length > 100) {
    return "Recipe name cannot be longer than 100 characters";
  } else if (newName !== initialName && newName in recipeBook) {
    return "A recipe with this name already exists";
  } else {
    return "";
  }
};
