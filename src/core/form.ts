import type { Unit, RecipeBook, Recipe, Ingredient } from "./RecipeBook";

// these are the types we use when building out the form;
// the only difference is that numeric fields are strings because we cannot force users to enter numbers into input boxes
export type PotentialYield = {
  amount: string;
  units: string;
};

export type PotentialIngredient = {
  name: string;
  amount: string;
  units: Unit;
};

export type PotentialRecipe = {
  yield: PotentialYield;
  ingredients: Array<PotentialIngredient>;
  notes: string;
};

export type RecipeErrors = {
  name?: string;
  yieldAmount?: string;
  yieldUnits?: string;
  [key: `ingredientName-${number}`]: string;
  [key: `ingredientAmount-${number}`]: string;
};

// functions to help with updating the form

export const blankRecipe = (): PotentialRecipe => {
  return {
    yield: {
      amount: "1",
      units: "servings",
    },
    ingredients: [],
    notes: "",
  };
};

export const updateRecipeYield = (
  recipe: PotentialRecipe,
  newYield: PotentialYield
): PotentialRecipe => {
  return {
    ...recipe,
    yield: newYield,
  };
};

export const updateRecipeNotes = (
  recipe: PotentialRecipe,
  newNotes: string
): PotentialRecipe => {
  return {
    ...recipe,
    notes: newNotes,
  };
};

export const addIngredient = (recipe: PotentialRecipe): PotentialRecipe => {
  const blankIngredient: PotentialIngredient = {
    name: "",
    amount: "0",
    units: "cups",
  };

  return {
    ...recipe,
    ingredients: [...recipe.ingredients, blankIngredient],
  };
};

export const deleteIngredient = (
  recipe: PotentialRecipe,
  index: number
): PotentialRecipe => {
  return {
    ...recipe,
    ingredients: [
      ...recipe.ingredients.slice(0, index),
      ...recipe.ingredients.slice(index + 1),
    ],
  };
};

export const updateIngredient = (
  recipe: PotentialRecipe,
  index: number,
  ingredient: PotentialIngredient
): PotentialRecipe => {
  return {
    ...recipe,
    ingredients: [
      ...recipe.ingredients.slice(0, index),
      ingredient,
      ...recipe.ingredients.slice(index + 1),
    ],
  };
};

const isNumeric = (amount: string): boolean => {
  return !isNaN(Number(amount));
};

// function to evaluate whether a PotentialRecipe can be saved as a Recipe
export const validateRecipe = (
  recipeBook: RecipeBook,
  recipe: PotentialRecipe,
  recipeName: string,
  isNewRecipe: boolean
): RecipeErrors | null => {
  const errors: RecipeErrors = {};
  // Validate recipe name
  if (recipeName.length == 0) {
    errors.name = "Recipe name cannot be empty";
  } else if (recipeName in recipeBook && isNewRecipe) {
    errors.name = "Recipe name cannot be the same as an existing recipe";
  }

  // Validate the recipe yield
  if (!isNumeric(recipe.yield.amount)) {
    errors.yieldAmount = "Yield must be an integer";
  } else if (Number(recipe.yield.amount) <= 0) {
    errors.yieldAmount = "Recipe yield must be greater than zero";
  } else if (!Number.isInteger(Number(recipe.yield.amount))) {
    errors.yieldAmount = "Recipe yield cannot be a decimal";
  }
  if (recipe.yield.units.length == 0) {
    errors.yieldUnits = "Recipe yield units shouldn't be empty";
  }

  // Validate each ingredient
  recipe.ingredients.forEach(
    (ingredient: PotentialIngredient, index: number) => {
      if (ingredient.name.length == 0) {
        errors[`ingredientName-${index}`] = "Ingredient name cannot be empty";
      }

      if (!isNumeric(ingredient.amount)) {
        errors[`ingredientAmount-${index}`] =
          "Ingredient amount must be a number";
      } else if (Number(ingredient.amount) <= 0) {
        errors[`ingredientAmount-${index}`] =
          "Ingredient amount must be greater than zero";
      }
    }
  );

  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return null;
  }
};

export const convertFormToRecipe = (recipe: PotentialRecipe): Recipe => {
  return {
    notes: recipe.notes,
    yield: {
      ...recipe.yield,
      amount: Number(recipe.yield.amount),
    },
    ingredients: recipe.ingredients.map((ingredient: PotentialIngredient) => ({
      ...ingredient,
      amount: Number(ingredient.amount),
    })),
  };
};

export const convertRecipeToForm = (recipe: Recipe): PotentialRecipe => {
  return {
    notes: recipe.notes,
    yield: {
      ...recipe.yield,
      amount: recipe.yield.amount.toString(),
    },
    ingredients: recipe.ingredients.map((ingredient: Ingredient) => ({
      ...ingredient,
      amount: ingredient.amount.toString(),
    })),
  };
};
