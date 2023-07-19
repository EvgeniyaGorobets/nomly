import {
  validateRecipeName,
  validateRecipeYieldAmount,
  validateRecipeYieldUnits,
} from "../../src/core/form-validation";
import type { RecipeBook } from "../../src/core/recipe";

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

describe("validateRecipeYieldAmount", () => {
  it("returns false for the empty string", () => {
    expect(validateRecipeYieldAmount("")).toStrictEqual(
      "Recipe yield is required"
    );
  });

  it("returns false for non-numeric strings", () => {
    expect(validateRecipeYieldAmount("three")).toStrictEqual(
      "Recipe yield must be a number"
    );
  });

  it("returns false for negative numbers and zero", () => {
    expect(validateRecipeYieldAmount("0")).toStrictEqual(
      "Recipe yield must be greater than zero"
    );
    expect(validateRecipeYieldAmount("-3")).toStrictEqual(
      "Recipe yield must be greater than zero"
    );
  });

  it("returns true for positive numbers", () => {
    expect(validateRecipeYieldAmount("10")).toStrictEqual("");
    // For now, I'm allowing decimals in the recipe yield
    expect(validateRecipeYieldAmount("3.5")).toStrictEqual("");
  });
});

describe("validateRecipeYieldUnits", () => {
  it("returns false for the empty string", () => {
    expect(validateRecipeYieldUnits("")).toStrictEqual(
      "Recipe yield units cannot be empty"
    );
  });

  it("returns false for strings greater than 25 characters", () => {
    expect(
      validateRecipeYieldUnits("mouth-watering slices of pie")
    ).toStrictEqual("Recipe yield units cannot be longer than 25 characters");
  });

  it("returns true for all other strings", () => {
    expect(validateRecipeYieldUnits("cookies")).toStrictEqual("");
    expect(validateRecipeYieldUnits("HOT DOGS")).toStrictEqual("");
  });
});
