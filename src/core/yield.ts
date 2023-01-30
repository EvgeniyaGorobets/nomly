/*--- business logic for manipulating the yield of a recipe ---*/

import type { Ingredient } from "./recipe";

export const adjustIngredientAmounts = (
  ingredients: Ingredient[],
  originalYield: number,
  targetYield: number
): Ingredient[] => {
  return ingredients.map((ingredient: Ingredient) => ({
    ...ingredient,
    amount: ingredient.amount * (targetYield / originalYield),
  }));
};
