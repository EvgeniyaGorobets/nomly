import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeYieldInput } from "../../../src/ui/RecipeForm/RecipeYieldInput";

describe("RecipeYieldInput", () => {
  const mockUpdateYieldAmount = jest.fn();
  const mockUpdateYieldAmountErrors = jest.fn();
  const mockUpdateYieldUnits = jest.fn();
  const mockUpdateYieldUnitsErrors = jest.fn();

  beforeEach(() => {
    render(
      <PaperProvider>
        <RecipeYieldInput
          recipeYield={{ amount: 12, units: "cookies" }}
          parentAmountFunctions={{
            updateValue: mockUpdateYieldAmount,
            updateErrors: mockUpdateYieldAmountErrors,
          }}
          parentUnitFunctions={{
            updateValue: mockUpdateYieldUnits,
            updateErrors: mockUpdateYieldUnitsErrors,
          }}
        />
      </PaperProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially renders with the correct amount and units", () => {
    screen.getByDisplayValue("12");
    screen.getByDisplayValue("cookies");
  });

  it("has an enabled text input that lets you change the yield amount", () => {
    const recipeAmountInput = screen.getByDisplayValue("12");
    expect(recipeAmountInput).toBeEnabled();

    fireEvent.changeText(recipeAmountInput, "15");
    expect(screen.queryByDisplayValue("12")).toBe(null);
    screen.getByDisplayValue("15");

    expect(mockUpdateYieldAmount).toBeCalledTimes(1);
    expect(mockUpdateYieldAmount).toBeCalledWith("15");
  });

  it("has an enabled text input that lets you change the yield units", () => {
    const recipeUnitsInput = screen.getByDisplayValue("cookies");
    expect(recipeUnitsInput).toBeEnabled();

    fireEvent.changeText(recipeUnitsInput, "small cookies");
    expect(screen.queryByDisplayValue("cookies")).toBe(null);
    screen.getByDisplayValue("small cookies");

    expect(mockUpdateYieldUnits).toBeCalledTimes(1);
    expect(mockUpdateYieldUnits).toBeCalledWith("small cookies");
  });

  it("shows an error message when the yield amount is invalid", () => {
    const recipeAmountInput = screen.getByDisplayValue("12");
    let oldErrorMessage: string;
    let expectedErrorMessage: string;

    // empty string is invalid
    expectedErrorMessage = "Recipe yield is required";
    fireEvent.changeText(recipeAmountInput, "");
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockUpdateYieldAmountErrors).toBeCalledTimes(1);
    expect(mockUpdateYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // zero is invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Recipe yield must be greater than zero";
    fireEvent.changeText(recipeAmountInput, "0");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockUpdateYieldAmountErrors).toBeCalledTimes(2);
    expect(mockUpdateYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // words are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Recipe yield must be a number";
    fireEvent.changeText(recipeAmountInput, "three");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockUpdateYieldAmountErrors).toBeCalledTimes(3);
    expect(mockUpdateYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // negative numbers are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Recipe yield must be greater than zero";
    fireEvent.changeText(recipeAmountInput, "-1.2");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockUpdateYieldAmountErrors).toBeCalledTimes(4);
    expect(mockUpdateYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // only positive numbers are valid
    oldErrorMessage = expectedErrorMessage;
    fireEvent.changeText(recipeAmountInput, "24");
    // error messages should be removed
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(mockUpdateYieldAmountErrors).toBeCalledTimes(5);
    expect(mockUpdateYieldAmountErrors).toHaveBeenLastCalledWith(false);
  });

  it("shows an error message when the yield units are invalid", () => {
    const recipeUnitsInput = screen.getByDisplayValue("cookies");
    let oldErrorMessage: string;
    let expectedErrorMessage: string;

    // empty string is invalid
    expectedErrorMessage = "Recipe yield units cannot be empty";
    fireEvent.changeText(recipeUnitsInput, "");
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockUpdateYieldUnitsErrors).toBeCalledTimes(1);
    expect(mockUpdateYieldUnitsErrors).toHaveBeenLastCalledWith(true);

    // strings longer than 25 chars are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage =
      "Recipe yield units cannot be longer than 25 characters";
    fireEvent.changeText(recipeUnitsInput, "abcdefghijklmnopqrstuvwxyz");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockUpdateYieldUnitsErrors).toBeCalledTimes(2);
    expect(mockUpdateYieldUnitsErrors).toHaveBeenLastCalledWith(true);

    // everything else is valid
    oldErrorMessage = expectedErrorMessage;
    fireEvent.changeText(recipeUnitsInput, "SERVINGS");
    // error messages should be removed
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(mockUpdateYieldUnitsErrors).toBeCalledTimes(3);
    expect(mockUpdateYieldUnitsErrors).toHaveBeenLastCalledWith(false);
  });
});
