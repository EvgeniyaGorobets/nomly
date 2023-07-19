import type { Ingredient } from "../../src/core/ingredient";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../src/core/ingredient";

describe("addIngredient", () => {
  it("returns a copy of ingredients with a new, blank ingredient appended to the end", () => {
    const ingredients: Ingredient[] = [
      { name: "milk", amount: 250, units: "mL" },
    ];
    const newIngredients = addIngredient(ingredients);

    // The old copy should be unchanged
    expect(ingredients).toStrictEqual([
      { name: "milk", amount: 250, units: "mL" },
    ]);

    // The new copy should have a blank ingredient at the end
    expect(newIngredients.length).toBe(2);
    expect(newIngredients[1]).toStrictEqual({
      name: "",
      amount: 0,
      units: "cups",
    });
  });
});

describe("deleteIngredient", () => {
  it("returns a copy of ingredients with the ingredient at the given index removed", () => {
    const ingredients: Ingredient[] = [
      { name: "milk", amount: 250, units: "mL" },
      { name: "flour", amount: 1, units: "cups" },
      { name: "butter", amount: 0.5, units: "cups" },
    ];
    const newIngredients = deleteIngredient(ingredients, 1);

    // The old copy should be unchanged
    expect(ingredients.length).toBe(3);

    // The new copy should only have two ingredients
    expect(newIngredients.length).toBe(2);
    expect(newIngredients[0]).toStrictEqual({
      name: "milk",
      amount: 250,
      units: "mL",
    });
    expect(newIngredients[1]).toStrictEqual({
      name: "butter",
      amount: 0.5,
      units: "cups",
    });
  });
});

describe("updateIngredient", () => {
  it("returns a copy of ingredients with the ingredient at the given index updated", () => {
    const ingredients: Ingredient[] = [
      { name: "milk", amount: 250, units: "mL" },
      { name: "flour", amount: 1, units: "cups" },
      { name: "butter", amount: 0.5, units: "cups" },
    ];
    const updatedIngredient: Ingredient = {
      name: "flour",
      amount: 100,
      units: "g",
    };
    const newIngredients = updateIngredient(ingredients, 1, updatedIngredient);

    // The old copy should be unchanged
    expect(ingredients[1]).toStrictEqual({
      name: "flour",
      amount: 1,
      units: "cups",
    });

    // The new copy should have the updated ingredient
    expect(newIngredients.length).toBe(3);
    expect(newIngredients[1]).toStrictEqual({
      name: "flour",
      amount: 100,
      units: "g",
    });
  });
});
