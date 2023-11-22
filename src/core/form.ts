import type { Ingredient, Unit } from "./ingredient";
import type { Recipe } from "./recipe-book";

/* --- TYPES --- */

export type YieldForm = {
  amount: string;
  units: string;
};

export type IngredientForm = {
  name: string;
  amount: string;
  units: Unit;
};

export type RecipeForm = {
  recipeName: string;
  yield: YieldForm;
  ingredients: IngredientForm[];
  notes: string;
};

/* --- FUNCTIONS --- */

export const recipeToForm = (
  recipeName: string,
  recipe: Recipe
): RecipeForm => {
  return {
    recipeName,
    yield: {
      amount: recipe.yield.amount.toString(),
      units: recipe.yield.units,
    },
    ingredients: recipe.ingredients.map((ingredient: Ingredient) => {
      return {
        name: ingredient.name,
        amount: ingredient.amount.toString(),
        units: ingredient.units,
      };
    }),
    notes: recipe.notes,
  };
};

export const formToRecipe = (form: RecipeForm): Recipe => {
  return {
    yield: {
      amount: Number(form.yield.amount),
      units: form.yield.units,
    },
    ingredients: form.ingredients.map((ingredient: IngredientForm) => {
      return {
        name: ingredient.name,
        amount: Number(ingredient.amount),
        units: ingredient.units,
      };
    }),
    notes: form.notes,
  };
};

/* --- CONFIG --- */

export const RecipeRules = {
  name: {
    required: "Recipe name cannot be empty",
    maxLength: {
      value: 100,
      message: "Recipe name cannot be longer than 100 characters",
    },
  },
  yield: {
    amount: {
      required: "Recipe yield is required",
      min: {
        value: 0.001,
        message: "Recipe yield must be greater than zero",
      },
      pattern: {
        value: /^[0-9]*(\.[0-9]+)?$/,
        message: "Recipe yield must be a number",
      },
    },
    units: {
      required: "Recipe yield is required",
      maxLength: {
        value: 25,
        message: "Recipe yield units cannot be longer than 25 characters",
      },
    },
  },
  ingredient: {
    name: {
      required: "Ingredient name cannot be empty",
      maxLength: {
        value: 50,
        message: "Ingredient name cannot be longer than 50 characters",
      },
    },
    amount: {
      required: "Ingredient amount is required",
      min: {
        value: 0.001,
        message: "Ingredient amount must be greater than zero",
      },
      pattern: {
        value: /^[0-9]*(\.[0-9]+)?$/,
        message: "Ingredient amount must be a number",
      },
    },
  },
};
