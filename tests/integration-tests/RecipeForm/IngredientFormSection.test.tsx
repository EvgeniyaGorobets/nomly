import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { IngredientFormSection } from "../../../src/ui/RecipeForm/IngredientFormSection";
import { type Ingredient } from "../../../src/core/ingredient";
import { type IngredientErrors } from "../../../src/core/recipe-errors";

describe("IngredientFormSection", () => {
  const mockIngredients: Ingredient[] = [
    { name: "flour", amount: 2, units: "cups" },
    { name: "sugar", amount: 16, units: "tbsp" },
    { name: "chocolate chips", amount: 8, units: "oz" },
    { name: "butter", amount: 100, units: "g" },
  ];
  const mockErrors: IngredientErrors[] = [
    { name: false, amount: false },
    { name: true, amount: false },
    { name: false, amount: true },
    { name: true, amount: true },
  ];
  const mockSetIngredients = jest.fn();
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    render(
      <PaperProvider>
        <IngredientFormSection
          ingredients={mockIngredients}
          setIngredients={mockSetIngredients}
          ingredientErrors={mockErrors}
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

  it("calls setIngredients and setErrors when a new ingredient is added", () => {
    fireEvent.press(screen.getByAccessibilityHint("Add ingredient"));

    expect(mockSetIngredients).toBeCalledTimes(1);
    expect(mockSetIngredients).toBeCalledWith([
      ...mockIngredients,
      { name: "", amount: 0, units: "cups" },
    ]);

    expect(mockSetErrors).toBeCalledTimes(1);
    expect(mockSetErrors).toBeCalledWith([
      ...mockErrors,
      { name: true, amount: true },
    ]);
  });

  it("calls setIngredient and setErrors when an ingredient is deleted", () => {
    fireEvent.press(
      screen.getByAccessibilityHint("Delete sugar from ingredients")
    );

    expect(mockSetIngredients).toBeCalledTimes(1);
    expect(mockSetIngredients).toBeCalledWith([
      mockIngredients[0],
      // sugar was the second ingredient, it should be removed
      mockIngredients[2],
      mockIngredients[3],
    ]);

    expect(mockSetErrors).toBeCalledTimes(1);
    expect(mockSetErrors).toBeCalledWith([
      { name: false, amount: false },
      { name: false, amount: true },
      { name: true, amount: true },
    ]);
  });

  it("propagates errors from IngredientInput children to the RecipeForm parent", () => {
    // check that errors from ingredient name are propagated
    fireEvent.changeText(screen.getByDisplayValue("chocolate chips"), "");
    expect(mockSetErrors).toBeCalledTimes(1);
    expect(mockSetErrors).toHaveBeenLastCalledWith([
      { name: false, amount: false },
      { name: true, amount: false },
      { name: true, amount: true }, // name changed from false to true
      { name: true, amount: true },
    ]);

    // check that errors from ingredient amount are propagated
    fireEvent.changeText(screen.getByDisplayValue("16"), "sixteen");
    expect(mockSetErrors).toBeCalledTimes(2);
    expect(mockSetErrors).toHaveBeenLastCalledWith([
      { name: false, amount: false },
      { name: true, amount: true }, // amount changed from false to true
      { name: false, amount: true },
      { name: true, amount: true },
    ]);

    // check that when the errors are fixed, it is propagated to the parent
    fireEvent.changeText(screen.getByDisplayValue(""), "chocolate chips");
    expect(mockSetErrors).toBeCalledTimes(3);
    expect(mockSetErrors).toHaveBeenLastCalledWith([
      { name: false, amount: false },
      { name: true, amount: false },
      { name: false, amount: true }, // name changed back to false
      { name: true, amount: true },
    ]);

    // check that errors from ingredient amount are propagated
    fireEvent.changeText(screen.getByDisplayValue("sixteen"), "16");
    expect(mockSetErrors).toBeCalledTimes(4);
    expect(mockSetErrors).toHaveBeenLastCalledWith([
      { name: false, amount: false },
      { name: true, amount: false }, // amount changed back to false
      { name: false, amount: true },
      { name: true, amount: true },
    ]);
  });
});
