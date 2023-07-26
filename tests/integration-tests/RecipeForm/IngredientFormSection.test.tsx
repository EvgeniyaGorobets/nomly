import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { IngredientFormSection } from "../../../src/ui/RecipeForm/IngredientFormSection";
import { type Ingredient } from "../../../src/core/ingredient";
import { type IngredientErrors } from "../../../src/core/recipe-errors";

jest.mock("uuid", () => ({ v4: () => "5" }));

describe("IngredientFormSection", () => {
  const mockIngredients: Ingredient[] = [
    { id: "1", name: "flour", amount: 2, units: "cups" },
    { id: "2", name: "sugar", amount: 16, units: "tbsp" },
    { id: "3", name: "chocolate chips", amount: 8, units: "oz" },
    { id: "4", name: "butter", amount: 100, units: "g" },
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
    const setIngredientsCallback = mockSetIngredients.mock.calls[0][0];
    expect(setIngredientsCallback(mockIngredients)).toStrictEqual([
      ...mockIngredients,
      { id: "5", name: "", amount: 0, units: "cups" },
    ]);

    expect(mockSetErrors).toBeCalledTimes(1);
    const setErrorsCallback = mockSetErrors.mock.calls[0][0];
    expect(setErrorsCallback(mockErrors)).toStrictEqual([
      ...mockErrors,
      { name: true, amount: true },
    ]);
  });

  it("calls setIngredient and setErrors when an ingredient is deleted", () => {
    fireEvent.press(
      screen.getByAccessibilityHint("Delete sugar from ingredients")
    );

    expect(mockSetIngredients).toBeCalledTimes(1);
    const setIngredientsCallback = mockSetIngredients.mock.calls[0][0];
    expect(setIngredientsCallback(mockIngredients)).toStrictEqual([
      mockIngredients[0],
      // sugar was the second ingredient, it should be removed
      mockIngredients[2],
      mockIngredients[3],
    ]);

    expect(mockSetErrors).toBeCalledTimes(1);
    const setErrorsCallback = mockSetErrors.mock.calls[0][0];
    expect(setErrorsCallback(mockErrors)).toStrictEqual([
      { name: false, amount: false },
      // errors for sugar were removed
      { name: false, amount: true },
      { name: true, amount: true },
    ]);
  });

  it("propagates errors from IngredientInput children to the RecipeForm parent", () => {
    let setErrorsCallback;
    let oldErrors: IngredientErrors[] = mockErrors;
    let newErrors: IngredientErrors[];

    // check that errors from ingredient name are propagated
    fireEvent.changeText(screen.getByDisplayValue("chocolate chips"), "");
    expect(mockSetErrors).toBeCalledTimes(1);
    setErrorsCallback = mockSetErrors.mock.calls[0][0];
    newErrors = [
      oldErrors[0],
      oldErrors[1],
      { name: true, amount: true }, // name changed from false to true
      oldErrors[3],
    ];
    expect(setErrorsCallback(oldErrors)).toStrictEqual(newErrors);

    // check that errors from ingredient amount are propagated
    fireEvent.changeText(screen.getByDisplayValue("16"), "sixteen");
    expect(mockSetErrors).toBeCalledTimes(2);
    setErrorsCallback = mockSetErrors.mock.calls[1][0];
    oldErrors = newErrors;
    newErrors = [
      oldErrors[0],
      { name: true, amount: true }, // amount changed from false to true
      oldErrors[2],
      oldErrors[3],
    ];
    expect(setErrorsCallback(oldErrors)).toStrictEqual(newErrors);

    // check that when the errors are fixed, it is propagated to the parent
    fireEvent.changeText(screen.getByDisplayValue(""), "chocolate chips");
    expect(mockSetErrors).toBeCalledTimes(3);
    setErrorsCallback = mockSetErrors.mock.calls[2][0];
    oldErrors = newErrors;
    newErrors = [
      oldErrors[0],
      oldErrors[1],
      { name: false, amount: true }, // name changed back to false
      oldErrors[3],
    ];
    expect(setErrorsCallback(oldErrors)).toStrictEqual(newErrors);

    fireEvent.changeText(screen.getByDisplayValue("sixteen"), "16");
    expect(mockSetErrors).toBeCalledTimes(4);
    setErrorsCallback = mockSetErrors.mock.calls[3][0];
    oldErrors = newErrors;
    newErrors = [
      oldErrors[0],
      { name: true, amount: false }, // amount changed back to false
      oldErrors[2],
      oldErrors[3],
    ];
    expect(setErrorsCallback(oldErrors)).toStrictEqual(newErrors);
  });
});
