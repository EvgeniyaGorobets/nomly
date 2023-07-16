import type { RecipeBook } from "./recipe";

export const isNumeric = (amount: string): boolean => {
  return amount !== "" && !isNaN(Number(amount));
};

export const validateRecipeName = (
  initialName: string,
  newName: string,
  recipeBook: RecipeBook
): [boolean, string] => {
  if (newName.length == 0) {
    return [false, "Recipe name cannot be empty"];
  } else if (newName.length > 100) {
    return [false, "Recipe name cannot be longer than 100 characters"];
  } else if (newName !== initialName && newName in recipeBook) {
    return [false, "A recipe with this name already exists"];
  } else {
    return [true, ""];
  }
};

export const validateRecipeYieldAmount = (
  amount: string
): [boolean, string] => {
  if (amount === "") {
    return [false, "Recipe yield is required"];
  } else if (!isNumeric(amount)) {
    return [false, "Recipe yield must be a number"];
  } else if (Number(amount) <= 0) {
    return [false, "Recipe yield must be greater than zero"];
  } else {
    return [true, ""];
  }
};

export const validateRecipeYieldUnits = (units: string): [boolean, string] => {
  if (units.length === 0) {
    return [false, "Recipe yield units cannot be empty"];
  } else if (units.length > 25) {
    return [false, "Recipe yield units cannot be longer than 25 characters"];
  } else {
    return [true, ""];
  }
};

export const validateIngredientName = (name: string): [boolean, string] => {
  if (name.length === 0) {
    return [false, "Ingredient name cannot be empty"];
  } else if (name.length > 50) {
    return [false, "Ingredient name cannot be longer than 50 characters"];
  } else {
    return [true, ""];
  }
};

export const validateIngredientAmount = (amount: string): [boolean, string] => {
  if (amount === "") {
    return [false, "Ingredient amount is required"];
  } else if (!isNumeric(amount)) {
    return [false, "Ingredient amount must be a number"];
  } else if (Number(amount) <= 0) {
    return [false, "Ingredient amount must be greater than zero"];
  } else {
    return [true, ""];
  }
};
