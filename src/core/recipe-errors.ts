import { deepCopy } from "./utils";

/* ---- TYPES ---- */

export type IngredientErrors = {
  name: boolean;
  amount: boolean;
};

export type RecipeErrors = {
  name: boolean;
  yield: {
    amount: boolean;
    units: boolean;
  };
  ingredients: IngredientErrors[];
};

/* ---- FUNCTIONS ---- */

/**
 * Get the initial recipe errors when starting to edit a recipe. An existing recipe
 * should never have errors when it is first opened in "Edit" mode, since it should
 * be impossible to save a recipe with errors. Brand new recipes will have an error
 * in the name component, but no other errors, because all other components are
 * initialized with valid values.
 * @param isNewRecipe Whether this is a brand new recipe
 * @param numIngredients The number of ingredients in the recipe
 * @returns A RecipeErrors object describing the error state of each recipe component
 */
export const getInitialErrors = (
  isNewRecipe: boolean,
  numIngredients: number
): RecipeErrors => {
  return {
    name: isNewRecipe ? true : false,
    yield: { amount: false, units: false },
    ingredients: Array(numIngredients).fill({ name: false, amount: false }),
  };
};

/**
 * Add the error state of a newly added ingredient
 * @param ingredientErrors The current error state of the recipe ingredients
 * @returns A copy of ingredientErrors, but with the error state of the new ingredient
 */
export const addIngredientToErrors = (
  ingredientErrors: IngredientErrors[]
): IngredientErrors[] => {
  return [...deepCopy(ingredientErrors), { name: true, amount: true }];
};

/**
 * Remove the error state of a deleted ingredient
 * @param ingredientErrors The current error state of the recipe ingredients
 * @param ingredientIndex The index of the ingredient that was deleted
 * @returns A copy of ingredientErrors, but without the error state of the deleted ingredient
 */
export const deleteIngredientFromErrors = (
  ingredientErrors: IngredientErrors[],
  ingredientIndex: number
): IngredientErrors[] => {
  return [
    ...deepCopy(ingredientErrors.slice(0, ingredientIndex)),
    ...deepCopy(ingredientErrors.slice(ingredientIndex + 1)),
  ];
};

/**
 * Update the error state of an ingredient
 * @param ingredientErrors The current error state of the recipe ingredients
 * @param ingredientIndex The index of the ingredient with the updated errors
 * @param newErrors The new errors of the ingredient
 * @returns A copy of ingredientErrors, but with the updated error state
 */
export const updateIngredientErrors = (
  ingredientErrors: IngredientErrors[],
  ingredientIndex: number,
  newErrors: IngredientErrors
): IngredientErrors[] => {
  return [
    ...deepCopy(ingredientErrors.slice(0, ingredientIndex)),
    { ...newErrors },
    ...deepCopy(ingredientErrors.slice(ingredientIndex + 1)),
  ];
};

/**
 * Determine whether a recipe is valid based on its error state
 * @param recipeErrors The error state of the recipe
 * @returns True if none of the recipe components have errors, false otherwise
 */
export const isRecipeValid = (recipeErrors: RecipeErrors): boolean => {
  const validName: boolean = !recipeErrors.name;
  const validYield: boolean =
    !recipeErrors.yield.amount && !recipeErrors.yield.units;
  const validIngredients: boolean = recipeErrors.ingredients.reduce(
    (accumulator: boolean, ingredientErrors: IngredientErrors) =>
      accumulator && !ingredientErrors.name && !ingredientErrors.amount,
    true
  );
  return validName && validYield && validIngredients;
};
