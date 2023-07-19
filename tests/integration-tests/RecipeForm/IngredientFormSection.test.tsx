import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { IngredientFormSection } from "../../../src/ui/RecipeForm/IngredientFormSection";
import type { Ingredient } from "../../../src/core/recipe";
import type { RecipeErrors } from "../../../src/core/form";

describe("IngredientFormSection", () => {
  const mockIngredients: Ingredient[] = [
    { name: "flour", amount: 2, units: "cups" },
    { name: "sugar", amount: 16, units: "tbsp" },
    { name: "chocolate chips", amount: 8, units: "oz" },
    { name: "butter", amount: 100, units: "g" },
  ];
  const mockErrors: RecipeErrors = {
    name: false,
    yieldAmount: false,
    yieldUnits: false,
    "ingredientName-0": false,
    "ingredientAmount-0": false,
    "ingredientName-1": false,
    "ingredientAmount-1": false,
    "ingredientName-2": false,
    "ingredientAmount-2": false,
    "ingredientName-3": false,
    "ingredientAmount-3": false,
  };
  const mockUpdateIngredients = jest.fn();
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    render(
      <PaperProvider>
        <IngredientFormSection
          ingredients={mockIngredients}
          updateIngredients={mockUpdateIngredients}
          errors={mockErrors}
          setErrors={mockSetErrors}
        />
      </PaperProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially renders all ingredients", () => {
    // first ingredient
    screen.getByDisplayValue("flour");
    screen.getByDisplayValue("2");
    screen.getByDisplayValue("cups");

    // second ingredient
    screen.getByDisplayValue("sugar");
    screen.getByDisplayValue("16");
    screen.getByDisplayValue("tbsp");

    // third ingredient
    screen.getByDisplayValue("chocolate chips");
    screen.getByDisplayValue("8");
    screen.getByDisplayValue("oz");

    // fourth ingredient
    screen.getByDisplayValue("butter");
    screen.getByDisplayValue("100");
    screen.getByDisplayValue("g");
  });

  it("calls updateRecipe when a new ingredient is added", () => {
    fireEvent.press(screen.getByAccessibilityHint("Add ingredient"));

    expect(mockUpdateIngredients).toBeCalledTimes(1);
    expect(mockUpdateIngredients).toBeCalledWith([
      ...mockIngredients,
      { name: "", amount: 0, units: "cups" },
    ]);

    // it should initialize error tracking for the new ingredient
    // TODO: this seems like a good candidate for refactoring; maybe RecipeForm should handle all this
    // and only provide a single callback to IngredientFormSection
    expect(mockSetErrors).toBeCalledTimes(1);
    expect(mockSetErrors).toBeCalledWith({
      ...mockErrors,
      "ingredientName-4": true,
      "ingredientAmount-4": true,
    });
  });

  it("propagates errors from IngredientInput children to the RecipeForm parent", () => {
    // check that errors from ingredient name are propagated
    fireEvent.changeText(screen.getByDisplayValue("butter"), "");
    expect(mockSetErrors).toBeCalledTimes(1);
    expect(mockSetErrors).toHaveBeenLastCalledWith({
      ...mockErrors,
      "ingredientName-3": true,
    });

    // check that errors from ingredient amount are propagated
    fireEvent.changeText(screen.getByDisplayValue("8"), "eight");
    expect(mockSetErrors).toBeCalledTimes(2);
    expect(mockSetErrors).toHaveBeenLastCalledWith({
      ...mockErrors,
      "ingredientAmount-2": true,
    });

    // check that when the errors are fixed, it is propagated to the parent
    fireEvent.changeText(screen.getByDisplayValue(""), "butter");
    expect(mockSetErrors).toBeCalledTimes(3);
    expect(mockSetErrors).toHaveBeenLastCalledWith({
      ...mockErrors,
      "ingredientName-3": false,
    });

    // check that errors from ingredient amount are propagated
    fireEvent.changeText(screen.getByDisplayValue("eight"), "8");
    expect(mockSetErrors).toBeCalledTimes(4);
    expect(mockSetErrors).toHaveBeenLastCalledWith({
      ...mockErrors,
      "ingredientAmount-2": false,
    });
  });
});
