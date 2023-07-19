import type { Recipe, RecipeBook } from "../../src/core/recipe-book";
import {
  cloneRecipe,
  deleteRecipe,
  updateRecipe,
  validateRecipeName,
} from "../../src/core/recipe-book";

describe("cloneRecipe", () => {
  it("returns a copy of the recipe book with the cloned recipe", () => {
    const originalRecipe: Recipe = {
      yield: { amount: 4, units: "servings" },
      ingredients: [
        { name: "broccoli", amount: 16, units: "oz" },
        { name: "quinoa", amount: 1, units: "cups" },
      ],
      notes: "Mix broccoli and quinoa in a pan and bake.",
    };
    const recipeBook: RecipeBook = {
      "Quinoa Broccoli Casserole": originalRecipe,
    };

    const newRecipeBook = cloneRecipe(recipeBook, "Quinoa Broccoli Casserole");

    // the old recipe book should be unchanged
    expect(Object.keys(recipeBook)).toStrictEqual([
      "Quinoa Broccoli Casserole",
    ]);

    // the new recipe book should have the cloned recipe
    expect(Object.keys(newRecipeBook).sort()).toStrictEqual([
      "Quinoa Broccoli Casserole",
      "Quinoa Broccoli Casserole (Copy)",
    ]);
    expect(newRecipeBook["Quinoa Broccoli Casserole (Copy)"]).toStrictEqual(
      originalRecipe
    );

    // the new recipe should be a new object, NOT a reference to the same object
    newRecipeBook["Quinoa Broccoli Casserole (Copy)"].yield.amount = 5;
    expect(originalRecipe.yield.amount).toBe(4);
    newRecipeBook["Quinoa Broccoli Casserole (Copy)"].ingredients[0].units =
      "cups";
    expect(originalRecipe.ingredients[0].units).toBe("oz");
  });
});

describe("deleteRecipe", () => {
  it("returns a copy of the recipe book without the deleted recipe", () => {
    const recipeBook: RecipeBook = {
      "Quinoa Broccoli Casserole": {
        yield: { amount: 4, units: "servings" },
        ingredients: [
          { name: "broccoli", amount: 16, units: "oz" },
          { name: "quinoa", amount: 1, units: "cups" },
        ],
        notes: "Mix broccoli and quinoa in a pan and bake.",
      },
      "Chocolate Chip Cookies": {
        yield: { amount: 12, units: "cookies" },
        ingredients: [
          { name: "flour", amount: 2, units: "cups" },
          { name: "sugar", amount: 16, units: "tbsp" },
          { name: "chocolate chips", amount: 8, units: "oz" },
          { name: "butter", amount: 100, units: "g" },
        ],
        notes: "Mix dry and wet ingredients. Roll into balls and bake.",
      },
    };

    const newRecipeBook = deleteRecipe(recipeBook, "Chocolate Chip Cookies");

    // the old recipe book should be unchanged
    expect(Object.keys(recipeBook).sort()).toStrictEqual([
      "Chocolate Chip Cookies",
      "Quinoa Broccoli Casserole",
    ]);

    // the new recipe book shouldn't have the deleted recipe
    expect(Object.keys(newRecipeBook)).toStrictEqual([
      "Quinoa Broccoli Casserole",
    ]);
  });

  // not sure I actually want it to do this
  it("throws an error if you try to delete a recipe that doesn't exist", () => {
    const recipeBook: RecipeBook = {};
    expect(() => deleteRecipe(recipeBook, "nonexistent recipe")).toThrow();
  });
});

describe("updateRecipe", () => {
  it("returns a copy of the recipe book with the updated recipe", () => {
    const originalRecipe: Recipe = {
      yield: { amount: 4, units: "servings" },
      ingredients: [
        { name: "broccoli", amount: 16, units: "oz" },
        { name: "quinoa", amount: 1, units: "cups" },
      ],
      notes: "Mix broccoli and quinoa in a pan and bake.",
    };
    const recipeBook: RecipeBook = {
      "Quinoa Broccoli Casserole": originalRecipe,
    };

    const updatedRecipe: Recipe = {
      yield: { amount: 3, units: "servings" },
      ingredients: [
        { name: "broccoli", amount: 400, units: "g" },
        { name: "quinoa", amount: 0.5, units: "cups" },
      ],
      notes: "blah blah blah",
    };
    const newRecipeBook = updateRecipe(
      recipeBook,
      updatedRecipe,
      "Quinoa Broccoli Casserole"
    );

    // the old recipe book should be unchanged
    expect(recipeBook["Quinoa Broccoli Casserole"]).toStrictEqual(
      originalRecipe
    );

    // the new recipe book should have the new recipe
    expect(newRecipeBook["Quinoa Broccoli Casserole"]).toStrictEqual(
      updatedRecipe
    );
  });

  it("returns a copy of the recipe book with the new recipe", () => {
    const recipeBook: RecipeBook = {};
    const newRecipe: Recipe = {
      yield: { amount: 4, units: "servings" },
      ingredients: [
        { name: "broccoli", amount: 16, units: "oz" },
        { name: "quinoa", amount: 1, units: "cups" },
      ],
      notes: "Mix broccoli and quinoa in a pan and bake.",
    };

    const newRecipeBook = updateRecipe(
      recipeBook,
      newRecipe,
      "Quinoa Broccoli Casserole"
    );

    // the old recipe book should be unchanged
    expect(recipeBook).toStrictEqual({});

    // the new recipe book should have the new recipe
    expect(newRecipeBook).toStrictEqual({
      "Quinoa Broccoli Casserole": newRecipe,
    });
  });
});

describe("validateRecipeName", () => {
  it("returns false for the empty string", () => {
    expect(validateRecipeName("old recipe name", "", {})).toStrictEqual(
      "Recipe name cannot be empty"
    );
  });

  it("returns false for the strings longer than 100 characters", () => {
    expect(
      validateRecipeName(
        "old recipe name",
        "This is a super long recipe name that is one hundred and one characters long; this is not readable!!!",
        {}
      )
    ).toStrictEqual("Recipe name cannot be longer than 100 characters");
  });

  it("returns false if this recipe name already exists in the recipe book", () => {
    const recipeBook: RecipeBook = {
      "Quinoa Broccoli Casserole": {
        yield: { amount: 10, units: "servings" },
        ingredients: [],
        notes: "",
      },
    };

    expect(
      validateRecipeName("", "Quinoa Broccoli Casserole", recipeBook)
    ).toStrictEqual("A recipe with this name already exists");
  });

  it("returns true if this is a brand new recipe name", () => {
    const recipeBook: RecipeBook = {
      "Blueberry pie": {
        yield: { amount: 10, units: "servings" },
        ingredients: [],
        notes: "",
      },
    };

    expect(
      validateRecipeName("", "Quinoa Broccoli Casserole", recipeBook)
    ).toStrictEqual("");
  });

  it("returns true if the recipe name is unchanged", () => {
    const recipeBook: RecipeBook = {
      "Quinoa Broccoli Casserole": {
        yield: { amount: 10, units: "servings" },
        ingredients: [],
        notes: "",
      },
    };

    expect(
      validateRecipeName(
        "Quinoa Broccoli Casserole",
        "Quinoa Broccoli Casserole",
        recipeBook
      )
    ).toStrictEqual("");
  });
});
