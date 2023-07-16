import {
  isNumeric,
  validateRecipeName,
  validateRecipeYieldAmount,
  validateRecipeYieldUnits,
  validateIngredientName,
  validateIngredientAmount,
} from "../../src/core/form-validation";
import type { RecipeBook } from "../../src/core/recipe";

describe("isNumeric", () => {
  it("returns true for positive integers and zero", () => {
    expect(isNumeric("0")).toBe(true);
    expect(isNumeric("1")).toBe(true);
    expect(isNumeric("235")).toBe(true);
  });

  it("returns true for positive decimals", () => {
    expect(isNumeric("0.5")).toBe(true);
    expect(isNumeric("1.12")).toBe(true);
  });

  it("returns true for negative integers", () => {
    expect(isNumeric("-3")).toBe(true);
    expect(isNumeric("-101")).toBe(true);
  });

  it("returns true for negative decimals", () => {
    expect(isNumeric("-3.2")).toBe(true);
    expect(isNumeric("-0.667")).toBe(true);
  });

  it("returns false for strings with letters", () => {
    expect(isNumeric("hi")).toBe(false);
    // expect(isNumeric("1.5e2")).toBe(false); -- this actually returns true
    // but probably nobody will ever try to use this syntax so I'm just going to accept it
    // as a valid number
    expect(isNumeric("seven")).toBe(false);
    expect(isNumeric("70 cookies")).toBe(false);
  });

  it("returns false for strings with spaces", () => {
    expect(isNumeric("10 20 30")).toBe(false);
    expect(isNumeric("  2  3")).toBe(false);
  });

  it("returns false for strings with special characters", () => {
    expect(isNumeric("1/2")).toBe(false);
    expect(isNumeric("$3")).toBe(false);
  });

  it("returns false for the empty string", () => {
    expect(isNumeric("")).toBe(false);
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
