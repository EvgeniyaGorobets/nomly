// TODO: turn these into integration tests

/* describe("getInitialErrors", () => {
  it("shows no errors for existing recipes", () => {
    expect(getInitialErrors(false, 3)).toStrictEqual({
      name: false,
      yield: { amount: false, units: false },
      ingredients: [
        { name: false, amount: false },
        { name: false, amount: false },
        { name: false, amount: false },
      ],
    });
  });

  it("shows an error in the name for a new recipe", () => {
    expect(getInitialErrors(true, 0)).toStrictEqual({
      name: true,
      yield: { amount: false, units: false },
      ingredients: [],
    });
  });
});

describe("addIngredientToErrors", () => {
  it("returns a new copy of ingredient errors, with error state for a new ingredient", () => {
    const ingredientErrors: IngredientErrors[] = [
      { name: false, amount: false },
    ];

    const newIngredientErrors: IngredientErrors[] =
      addIngredientToErrors(ingredientErrors);

    expect(newIngredientErrors.length).toBe(2);
    expect(newIngredientErrors).toStrictEqual([
      { name: false, amount: false },
      { name: true, amount: true },
    ]);

    // The original recipe errors should be untouched
    expect(ingredientErrors).toStrictEqual([{ name: false, amount: false }]);
    newIngredientErrors[0].name = true;
    expect(ingredientErrors[0].name).toBe(false);
  });
});

describe("deleteIngredientFromErrors", () => {
  it("returns a new copy of ingredient errors, without the error state of the deleted ingredient", () => {
    const ingredientErrors: IngredientErrors[] = [
      { name: false, amount: false },
      { name: true, amount: true },
      { name: false, amount: true },
    ];

    const newIngredientErrors: IngredientErrors[] = deleteIngredientFromErrors(
      ingredientErrors,
      1
    );

    expect(newIngredientErrors.length).toBe(2);
    expect(newIngredientErrors).toStrictEqual([
      { name: false, amount: false },
      { name: false, amount: true },
    ]);

    // The original recipe errors should be untouched
    expect(ingredientErrors.length).toBe(3);
    newIngredientErrors[0].name = true;
    expect(ingredientErrors[0].name).toBe(false);
  });
});

describe("updateIngredientErrors", () => {
  it("returns a new copy of ingredient errors, with the updated error state of the ingredient at the given index", () => {
    const ingredientErrors: IngredientErrors[] = [
      { name: false, amount: false },
      { name: true, amount: true },
      { name: false, amount: true },
    ];

    const newErrors: IngredientErrors = { name: true, amount: false };
    const newIngredientErrors: IngredientErrors[] = updateIngredientErrors(
      ingredientErrors,
      1,
      newErrors
    );

    expect(newIngredientErrors).toStrictEqual([
      { name: false, amount: false },
      { name: true, amount: false },
      { name: false, amount: true },
    ]);

    // The original recipe errors should be untouched
    expect(ingredientErrors).toStrictEqual([
      { name: false, amount: false },
      { name: true, amount: true },
      { name: false, amount: true },
    ]);
    newIngredientErrors[0].name = true;
    expect(ingredientErrors[0].name).toBe(false);
  });
});

describe("isRecipeValid", () => {
  it("returns false if the recipe name is invalid", () => {
    const recipeErrors: RecipeErrors = {
      name: true,
      yield: { amount: false, units: false },
      ingredients: [],
    };
    expect(isRecipeValid(recipeErrors)).toBe(false);
  });

  it("returns false if the recipe yield is invalid", () => {
    const recipeErrors: RecipeErrors = {
      name: false,
      yield: { amount: true, units: false },
      ingredients: [],
    };
    expect(isRecipeValid(recipeErrors)).toBe(false);
  });

  it("returns false if one of the ingredients is invalid", () => {
    const recipeErrors: RecipeErrors = {
      name: false,
      yield: { amount: false, units: false },
      ingredients: [
        { name: false, amount: false },
        { name: false, amount: true },
      ],
    };
    expect(isRecipeValid(recipeErrors)).toBe(false);
  });

  it("returns true if all the recipe components are valid", () => {
    const recipeErrors: RecipeErrors = {
      name: false,
      yield: { amount: false, units: false },
      ingredients: [
        { name: false, amount: false },
        { name: false, amount: false },
      ],
    };
    expect(isRecipeValid(recipeErrors)).toBe(true);
  });
});
 */
