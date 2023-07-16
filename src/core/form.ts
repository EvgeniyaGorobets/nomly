import type { Recipe, Ingredient } from "./recipe";

// * ------ FORM VALIDATION ------ *
// * Functions to help validate the form/recipe

export type RecipeErrors = {
  name: boolean;
  yieldAmount: boolean;
  yieldUnits: boolean;
  [key: `ingredientName-${number}`]: boolean;
  [key: `ingredientAmount-${number}`]: boolean;
};

// return a RecipeErrors object that shows no errors
export const getInitialErrors = (
  recipe: Recipe,
  isNewRecipe: boolean
): RecipeErrors => {
  // By default, a recipe should have no errors when it is first opened an edit mode
  // Because it should be impossible to save a recipe with errors
  // The only exception are new recipes, which have blank name by default
  // Eventually I might want to refactor this to use the validation functions below, for consistency
  const errors: RecipeErrors = {
    name: isNewRecipe ? true : false,
    yieldAmount: false,
    yieldUnits: false,
  };

  recipe.ingredients.forEach((ingredient: Ingredient, i: number) => {
    errors[`ingredientName-${i}`] = false;
    errors[`ingredientAmount-${i}`] = false;
  });

  return errors;
};

// * ------ FORM EDITING ------ *
// * Functions to help with editing the form and updating the recipe

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

// * ------ INPUT STATE MANAGEMENT ------ *
// * Functions to help with managing the local and parent state of an input element

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
