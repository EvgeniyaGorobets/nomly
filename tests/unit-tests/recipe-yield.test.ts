import {
  validateRecipeYieldAmount,
  validateRecipeYieldUnits,
} from "../../src/core/recipe-yield";

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
