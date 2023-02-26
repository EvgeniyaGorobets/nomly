import type { Unit, RecipeBook, Recipe, Ingredient, Yield } from "./recipe";

export type RecipeErrors = {
  name: boolean;
  yieldAmount: boolean;
  yieldUnits: boolean;
  [key: `ingredientName-${number}`]: boolean;
  [key: `ingredientAmount-${number}`]: boolean;
};

// functions to help with updating the form

export const blankRecipe = (): Recipe => {
  return {
    yield: {
      amount: 1,
      units: "servings",
    },
    ingredients: [],
    notes: "",
  };
};

export const addIngredient = (recipe: Recipe): Recipe => {
  const blankIngredient: Ingredient = {
    name: "",
    amount: 0,
    units: "cups",
  };

  return {
    ...recipe,
    ingredients: [...recipe.ingredients, blankIngredient],
  };
};

export const deleteIngredient = (recipe: Recipe, index: number): Recipe => {
  return {
    ...recipe,
    ingredients: [
      ...recipe.ingredients.slice(0, index),
      ...recipe.ingredients.slice(index + 1),
    ],
  };
};

export const updateIngredient = (
  recipe: Recipe,
  index: number,
  ingredient: Ingredient
): Recipe => {
  return {
    ...recipe,
    ingredients: [
      ...recipe.ingredients.slice(0, index),
      ingredient,
      ...recipe.ingredients.slice(index + 1),
    ],
  };
};

export const isNumeric = (amount: string): boolean => {
  return !isNaN(Number(amount));
};

export type InputStateFunctions = {
  setInput: (value: string) => void;
  setErrorMsg: (errMsg: string) => void;
};

export type ParentStateFunctions = {
  updateValue: (value: string) => void;
  updateErrors: (hasError: boolean) => void;
};

// Generic function for updating inputs
export const onInputChange = (
  inputText: string,
  validateInput: (value: string) => [boolean, string],
  input: InputStateFunctions,
  parent: ParentStateFunctions
) => {
  const [isValidInput, errMsg]: [boolean, string] = validateInput(inputText);

  // Make changes within the component
  input.setInput(inputText);
  input.setErrorMsg(errMsg);

  // Propagate changes to parent
  if (isValidInput) {
    parent.updateValue(inputText);
    parent.updateErrors(false);
  } else {
    parent.updateErrors(true);
  }
};

export const validateRecipeName = (
  initialName: string,
  newName: string,
  recipeBook: RecipeBook
): [boolean, string] => {
  if (newName.length == 0) {
    return [false, "Recipe name cannot be empty"];
  } else if (newName !== initialName && newName in recipeBook) {
    return [false, "A recipe with this name already exists"];
  } else {
    return [true, ""];
  }
};

export const validateRecipeYieldAmount = (
  amount: string
): [boolean, string] => {
  if (!isNumeric(amount)) {
    return [false, "Yield must be an integer"];
  } else if (Number(amount) <= 0) {
    return [false, "Recipe yield must be greater than zero"];
  } else if (!Number.isInteger(Number(amount))) {
    return [false, "Recipe yield cannot be a decimal"];
  } else {
    return [true, ""];
  }
};

export const validateRecipeYieldUnits = (units: string): [boolean, string] => {
  if (units.length === 0) {
    return [false, "Recipe yield units cannot be empty"];
  } else {
    return [true, ""];
  }
};

export const validateIngredientName = (name: string): [boolean, string] => {
  if (name.length === 0) {
    return [false, "Ingredient name cannot be empty"];
  } else {
    return [true, ""];
  }
};

export const validateIngredientAmount = (amount: string): [boolean, string] => {
  if (!isNumeric(amount)) {
    return [false, "Ingredient amount must be a number"];
  } else if (Number(amount) <= 0) {
    return [false, "Ingredient amount must be greater than zero"];
  } else {
    return [true, ""];
  }
};

// return a RecipeErrors object that shows no errors
export const noRecipeErrors = (recipe: Recipe): RecipeErrors => {
  const errors: RecipeErrors = {
    name: false,
    yieldAmount: false,
    yieldUnits: false,
  };

  recipe.ingredients.forEach((ingredient: Ingredient, i: number) => {
    errors[`ingredientName-${i}`] = false;
    errors[`ingredientAmount-${i}`] = false;
  });

  return errors;
};
