import type { RecipeBook } from "./recipe-book";

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
