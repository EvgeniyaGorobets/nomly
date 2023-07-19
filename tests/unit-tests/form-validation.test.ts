import { validateRecipeName } from "../../src/core/form-validation";
import type { RecipeBook } from "../../src/core/recipe-book";

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
