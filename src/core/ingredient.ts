import { isNumeric } from "./utils";

/* -- TYPES --*/

export const UNITS = ["cups", "tbsp", "tsp", "mL", "g", "oz", "N/A"] as const;
export type Unit = (typeof UNITS)[number];

export type Ingredient = {
  name: string;
  amount: number;
  units: Unit;
};

/* -- FUNCTIONS --*/

/**
 * Adds a new, blank ingredient to the end of the given list of ingredients
 * @param ingredients A list of ingredients
 * @returns A copy of the ingredient list, with the new ingredient at the end
 */
export const addIngredient = (ingredients: Ingredient[]): Ingredient[] => {
  const blankIngredient: Ingredient = {
    name: "",
    amount: 0,
    units: "cups",
  };

  return [...ingredients, blankIngredient];
};

/**
 * Deletes the ingredient at the specified index from a list of ingredients
 * @param ingredients A list of ingredients
 * @param index The position of the ingredient to be deleted
 * @returns A copy of the ingredient list, without the deleted ingredient
 */
export const deleteIngredient = (
  ingredients: Ingredient[],
  index: number
): Ingredient[] => {
  return [...ingredients.slice(0, index), ...ingredients.slice(index + 1)];
};

/**
 * Updates the ingredient at the specified index in a list of ingredients
 * @param ingredients A list of ingredients
 * @param index The position of the ingredient to be updated
 * @param ingredient The updated ingredient
 * @returns A copy of the ingredient list, with the ingredient at position i updated
 */
export const updateIngredient = (
  ingredients: Ingredient[],
  index: number,
  ingredient: Ingredient
): Ingredient[] => {
  return [
    ...ingredients.slice(0, index),
    ingredient,
    ...ingredients.slice(index + 1),
  ];
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
