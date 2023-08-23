import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { RecipeYieldInput } from "../../../src/ui/RecipeForm/RecipeYieldInput";

describe("RecipeYieldInput", () => {
  const mockSetYieldAmount = jest.fn();
  const mockSetYieldAmountErrors = jest.fn();
  const mockSetYieldUnits = jest.fn();
  const mockUpdateYieldUnitsErrors = jest.fn();

  beforeEach(() => {
    render(
      <PaperProvider>
        <RecipeYieldInput
          recipeYield={{ amount: 12, units: "cookies" }}
          setYieldAmount={mockSetYieldAmount}
          setYieldUnits={mockSetYieldUnits}
          setYieldAmountErrors={mockSetYieldAmountErrors}
          setYieldUnitsErrors={mockUpdateYieldUnitsErrors}
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

    expect(mockSetYieldAmount).toBeCalledTimes(1);
    expect(mockSetYieldAmount).toBeCalledWith(15);
  });

  it("has an enabled text input that lets you change the yield units", () => {
    const recipeUnitsInput = screen.getByDisplayValue("cookies");
    expect(recipeUnitsInput).toBeEnabled();

    fireEvent.changeText(recipeUnitsInput, "small cookies");
    expect(screen.queryByDisplayValue("cookies")).toBe(null);
    screen.getByDisplayValue("small cookies");

    expect(mockSetYieldUnits).toBeCalledTimes(1);
    expect(mockSetYieldUnits).toBeCalledWith("small cookies");
  });

  it("shows an error message when the yield amount is invalid", () => {
    const recipeAmountInput = screen.getByDisplayValue("12");
    let oldErrorMessage: string;
    let expectedErrorMessage: string;

    // empty string is invalid
    expectedErrorMessage = "Recipe yield is required";
    fireEvent.changeText(recipeAmountInput, "");
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetYieldAmountErrors).toBeCalledTimes(1);
    expect(mockSetYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // zero is invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Recipe yield must be greater than zero";
    fireEvent.changeText(recipeAmountInput, "0");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetYieldAmountErrors).toBeCalledTimes(2);
    expect(mockSetYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // words are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Recipe yield must be a number";
    fireEvent.changeText(recipeAmountInput, "three");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetYieldAmountErrors).toBeCalledTimes(3);
    expect(mockSetYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // negative numbers are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Recipe yield must be greater than zero";
    fireEvent.changeText(recipeAmountInput, "-1.2");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetYieldAmountErrors).toBeCalledTimes(4);
    expect(mockSetYieldAmountErrors).toHaveBeenLastCalledWith(true);

    // until this point, updateYieldAmount shouldn't have been called, bc the
    // change should only propagate to the parent if the new value is valid
    expect(mockSetYieldAmount).toBeCalledTimes(0);

    // only positive numbers are valid
    oldErrorMessage = expectedErrorMessage;
    fireEvent.changeText(recipeAmountInput, "24");
    // error messages should be removed
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(mockSetYieldAmountErrors).toBeCalledTimes(5);
    expect(mockSetYieldAmountErrors).toHaveBeenLastCalledWith(false);

    // now, we should see a call to updateYieldAmount, since the last change was valid
    expect(mockSetYieldAmount).toBeCalledTimes(1);
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

    // until this point, updateYieldUnits shouldn't have been called, bc the
    // change should only propagate to the parent if the new value is valid
    expect(mockSetYieldUnits).toBeCalledTimes(0);

    // everything else is valid
    oldErrorMessage = expectedErrorMessage;
    fireEvent.changeText(recipeUnitsInput, "SERVINGS");
    // error messages should be removed
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(mockUpdateYieldUnitsErrors).toBeCalledTimes(3);
    expect(mockUpdateYieldUnitsErrors).toHaveBeenLastCalledWith(false);

    // now, we should see a call to updateYieldUnits, since the last change was valid
    expect(mockSetYieldUnits).toBeCalledTimes(1);
  });
});
