import type { Ingredient, Unit } from "./ingredient";
import type { Recipe } from "./recipe-book";

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
