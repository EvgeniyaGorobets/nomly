import "react-native-get-random-values";
import { deepCopy } from "./utils";

/* -- TYPES --*/

export const UNITS = [
  "ea",
  "cups",
  "tbsp",
  "tsp",
  "mL",
  "g",
  "oz",
  "lbs",
] as const;
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
    units: "ea",
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
  return [
    ...deepCopy(ingredients.slice(0, index)),
    ...deepCopy(ingredients.slice(index + 1)),
  ];
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
    ...deepCopy(ingredients.slice(0, index)),
    { ...ingredient },
    ...deepCopy(ingredients.slice(index + 1)),
  ];
};
