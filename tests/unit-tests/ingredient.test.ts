import type { Ingredient } from "../../src/core/ingredient";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
  validateIngredientAmount,
  validateIngredientName,
} from "../../src/core/ingredient";

jest.mock("uuid", () => ({ v4: () => "2" }));

describe("addIngredient", () => {
  it("returns a copy of ingredients with a new, blank ingredient appended to the end", () => {
    const ingredients: Ingredient[] = [
      { id: "1", name: "milk", amount: 250, units: "mL" },
    ];
    const newIngredients = addIngredient(ingredients);

    // The old copy should be unchanged
    expect(ingredients).toStrictEqual([
      { id: "1", name: "milk", amount: 250, units: "mL" },
    ]);

    // The new copy should have a blank ingredient at the end
    expect(newIngredients.length).toBe(2);
    expect(newIngredients[1]).toStrictEqual({
      id: "2",
      name: "",
      amount: 0,
      units: "ea",
    });
  });
});

describe("deleteIngredient", () => {
  it("returns a copy of ingredients with the ingredient at the given index removed", () => {
    const ingredients: Ingredient[] = [
      { id: "1", name: "milk", amount: 250, units: "mL" },
      { id: "2", name: "flour", amount: 1, units: "cups" },
      { id: "3", name: "butter", amount: 0.5, units: "cups" },
    ];
    const newIngredients = deleteIngredient(ingredients, 1);

    // The old copy should be unchanged
    expect(ingredients.length).toBe(3);

    // The new copy should only have two ingredients
    expect(newIngredients.length).toBe(2);
    expect(newIngredients).toStrictEqual([
      {
        id: "1",
        name: "milk",
        amount: 250,
        units: "mL",
      },
      {
        id: "3",
        name: "butter",
        amount: 0.5,
        units: "cups",
      },
    ]);

    // Changing the new copy should not affect the old copy
    newIngredients[0].name = "half and half";
    expect(ingredients[0].name).toBe("milk");
  });
});

describe("updateIngredient", () => {
  it("returns a copy of ingredients with the ingredient at the given index updated", () => {
    const ingredients: Ingredient[] = [
      { id: "1", name: "milk", amount: 250, units: "mL" },
      { id: "2", name: "flour", amount: 1, units: "cups" },
      { id: "3", name: "butter", amount: 0.5, units: "cups" },
    ];
    const updatedIngredient: Ingredient = {
      id: "2",
      name: "flour",
      amount: 100,
      units: "g",
    };
    const newIngredients = updateIngredient(ingredients, 1, updatedIngredient);

    // The old copy should be unchanged
    expect(ingredients[1]).toStrictEqual({
      id: "2",
      name: "flour",
      amount: 1,
      units: "cups",
    });

    // The new copy should have the updated ingredient
    expect(newIngredients.length).toBe(3);
    expect(newIngredients[1]).toStrictEqual({
      id: "2",
      name: "flour",
      amount: 100,
      units: "g",
    });

    // Changing the new copy should not affect the old copy
    newIngredients[0].name = "half and half";
    expect(ingredients[0].name).toBe("milk");
  });
});

describe("validateIngredientName", () => {
  it("returns false for the empty string", () => {
    expect(validateIngredientName("")).toStrictEqual(
      "Ingredient name cannot be empty"
    );
  });

  it("returns false for strings greater than 50 characters", () => {
    expect(
      validateIngredientName(
        "super long ingredient name that is longer than 50 characters"
      )
    ).toStrictEqual("Ingredient name cannot be longer than 50 characters");
  });

  it("returns true for all other strings", () => {
    expect(validateIngredientName("chocolate chips")).toStrictEqual("");
    expect(validateIngredientName("0ni0n5")).toStrictEqual("");
  });
});

describe("validateIngredientAmount", () => {
  it("returns false for the empty string", () => {
    expect(validateIngredientAmount("")).toStrictEqual(
      "Ingredient amount is required"
    );
  });

  it("returns false for non-numeric strings", () => {
    expect(validateIngredientAmount("three")).toStrictEqual(
      "Ingredient amount must be a number"
    );
  });

  it("returns false for negative numbers and zero", () => {
    expect(validateIngredientAmount("0")).toStrictEqual(
      "Ingredient amount must be greater than zero"
    );
    expect(validateIngredientAmount("-3")).toStrictEqual(
      "Ingredient amount must be greater than zero"
    );
  });

  it("returns true for positive numbers", () => {
    expect(validateIngredientAmount("10")).toStrictEqual("");
    expect(validateIngredientAmount("3.5")).toStrictEqual("");
  });
});
