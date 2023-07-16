import type { RecipeBook } from "./recipe";

export const isNumeric = (amount: string): boolean => {
  return amount !== "" && !isNaN(Number(amount));
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

/**
 * Checks whether the recipe yield amount is a valid number. If it isn't,
 * returns an error message describing the error. If it is, returns an
 * empty string
 * @param amount - The proposed recipe yield amount
 * @returns The error message, or an empty string if there are no errors
 */
export const validateRecipeYieldAmount = (amount: string): string => {
  if (amount === "") {
    return "Recipe yield is required";
  } else if (!isNumeric(amount)) {
    return "Recipe yield must be a number";
  } else if (Number(amount) <= 0) {
    return "Recipe yield must be greater than zero";
  } else {
    return "";
  }
};

/**
 * Checks whether the recipe yield units are valid. If they aren't, returns
 * an error message describing the error. If they are, returns an empty string.
 * @param units - The proposed recipe yield units (e.g., "servings", "cookies")
 * @returns The error message, or an empty string if there are no errors
 */
export const validateRecipeYieldUnits = (units: string): string => {
  if (units.length === 0) {
    return "Recipe yield units cannot be empty";
  } else if (units.length > 25) {
    return "Recipe yield units cannot be longer than 25 characters";
  } else {
    return "";
  }
};

/**
 * Checks whether the ingredient name is a valid string. If it isn't, returns
 * an error message describing the error. If it is, returns an empty string.
 * @param name - The proposed ingredient name
 * @returns The error message, or an empty string if there are no errors
 */
export const validateIngredientName = (name: string): string => {
  if (name.length === 0) {
    return "Ingredient name cannot be empty";
  } else if (name.length > 50) {
    return "Ingredient name cannot be longer than 50 characters";
  } else {
    return "";
  }
};

/**
 * Checks whether the ingredient amount is a valid number. If it isn't, returns
 * an error message describing the error. It if is, returns an empty string.
 * @param amount - The proposed ingredient amount
 * @returns The error message, or an empty string if there are no errors
 */
export const validateIngredientAmount = (amount: string): string => {
  if (amount === "") {
    return "Ingredient amount is required";
  } else if (!isNumeric(amount)) {
    return "Ingredient amount must be a number";
  } else if (Number(amount) <= 0) {
    return "Ingredient amount must be greater than zero";
  } else {
    return "";
  }
};
