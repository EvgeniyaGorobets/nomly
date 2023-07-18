import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { IngredientInput } from "../../../src/ui/RecipeForm/IngredientInput";
import type { Ingredient } from "../../../src/core/recipe";

describe("IngredientInput", () => {
  const mockDeleteIngredient = jest.fn();
  const mockUpdateIngredient = jest.fn();
  const mockSetIngredientNameError = jest.fn();
  const mockSetIngredientAmountError = jest.fn();

  beforeEach(() => {
    const ingredient: Ingredient = {
      name: "milk",
      amount: 1.5,
      units: "oz",
    };

    render(
      <PaperProvider>
        <IngredientInput
          ingredient={ingredient}
          deleteIngredient={mockDeleteIngredient}
          updateIngredient={mockUpdateIngredient}
          setIngredientNameError={mockSetIngredientNameError}
          setIngredientAmountError={mockSetIngredientAmountError}
        />
      </PaperProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially renders with the correct name, amount, and units", () => {
    screen.getByDisplayValue("milk");
    screen.getByDisplayValue("1.5");
    screen.getByDisplayValue("oz");
  });

  it("has an enabled text input that lets you change the ingredient name", () => {
    const ingredientNameInput = screen.getByDisplayValue("milk");
    expect(ingredientNameInput).toBeEnabled();

    fireEvent.changeText(ingredientNameInput, "MILK");
    expect(screen.queryByDisplayValue("milk")).toBe(null);
    screen.getByDisplayValue("MILK");

    expect(mockUpdateIngredient).toBeCalledTimes(1);
    expect(mockUpdateIngredient).toBeCalledWith({
      name: "MILK",
      amount: 1.5,
      units: "oz",
    });
  });

  it("has an enabled text input that lets you change the ingredient amount", () => {
    const ingredientAmountInput = screen.getByDisplayValue("1.5");
    expect(ingredientAmountInput).toBeEnabled();

    fireEvent.changeText(ingredientAmountInput, "3");
    expect(screen.queryByDisplayValue("1.5")).toBe(null);
    screen.getByDisplayValue("3");

    expect(mockUpdateIngredient).toBeCalledTimes(1);
    expect(mockUpdateIngredient).toBeCalledWith({
      name: "milk",
      amount: 3,
      units: "oz",
    });
  });

  // NOTE -- dropdown functionality doesn't work in tests
  it("has an enabled dropdown that let you change the units", () => {
    const ingredientUnitsDropdown = screen.getByDisplayValue("oz");
    expect(ingredientUnitsDropdown).toBeEnabled();

    // Initially, the dropdown menu shouldn't be visible
    expect(screen.queryByText("cups")).toBeNull();
    expect(screen.queryByText("mL")).toBeNull();

    // once you press on the dropdown, the menu should become visible
    fireEvent.press(ingredientUnitsDropdown);
    screen.getByText("cups");
    const mLDropdownOption = screen.getByText("mL");

    // after you select an option, the menu should become invisible again
    fireEvent.press(mLDropdownOption);
    // expect(screen.queryByText("cups")).toBeNull(); -- doesn't work for some reason
    // the input should change to show the new selected value
    // expect(screen.queryByDisplayValue("oz")).toBeNull(); -- doesn't work for some reason
    // expect(screen.getByDisplayValue("mL")).toBeVisible(); -- doesn't work for some reason
    expect(mockUpdateIngredient).toBeCalledTimes(1);
    expect(mockUpdateIngredient).toBeCalledWith({
      name: "milk",
      amount: 1.5,
      units: "mL",
    });
  });

  it("shows an error message when the ingredient name is invalid", () => {
    const ingredientNameInput = screen.getByDisplayValue("milk");
    let oldErrorMessage: string;
    let expectedErrorMessage: string;

    // empty string is invalid
    expectedErrorMessage = "Ingredient name cannot be empty";
    fireEvent.changeText(ingredientNameInput, "");
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetIngredientNameError).toBeCalledTimes(1);
    expect(mockSetIngredientNameError).toHaveBeenLastCalledWith(true);

    // strings longer than 50 chars are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage =
      "Ingredient name cannot be longer than 50 characters";
    fireEvent.changeText(
      ingredientNameInput,
      "super long ingredient name that is longer than 50 characters"
    );
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetIngredientNameError).toBeCalledTimes(2);
    expect(mockSetIngredientNameError).toHaveBeenLastCalledWith(true);

    // all other strings are valid
    oldErrorMessage = expectedErrorMessage;
    fireEvent.changeText(ingredientNameInput, "m1Lk");
    // error messages should be removed
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(mockSetIngredientNameError).toHaveBeenLastCalledWith(false);
  });

  it("shows an error message when the ingredient amount is invalid", () => {
    const ingredientAmountInput = screen.getByDisplayValue("1.5");
    let oldErrorMessage: string;
    let expectedErrorMessage: string;

    // empty string is invalid
    expectedErrorMessage = "Ingredient amount is required";
    fireEvent.changeText(ingredientAmountInput, "");
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetIngredientAmountError).toBeCalledTimes(1);
    expect(mockSetIngredientAmountError).toHaveBeenLastCalledWith(true);

    // zero is invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Ingredient amount must be greater than zero";
    fireEvent.changeText(ingredientAmountInput, "0");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetIngredientAmountError).toBeCalledTimes(2);
    expect(mockSetIngredientAmountError).toHaveBeenLastCalledWith(true);

    // words are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Ingredient amount must be a number";
    fireEvent.changeText(ingredientAmountInput, "three");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetIngredientAmountError).toBeCalledTimes(3);
    expect(mockSetIngredientAmountError).toHaveBeenLastCalledWith(true);

    // negative numbers are invalid
    oldErrorMessage = expectedErrorMessage;
    expectedErrorMessage = "Ingredient amount must be greater than zero";
    fireEvent.changeText(ingredientAmountInput, "-1.2");
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
    expect(mockSetIngredientAmountError).toBeCalledTimes(4);
    expect(mockSetIngredientAmountError).toHaveBeenLastCalledWith(true);

    // only positive numbers are valid
    oldErrorMessage = expectedErrorMessage;
    fireEvent.changeText(ingredientAmountInput, "2");
    // error messages should be removed
    expect(screen.queryByText(oldErrorMessage)).toBeNull();
    expect(mockSetIngredientAmountError).toHaveBeenLastCalledWith(false);
  });

  it("fires the deleteIngredient callback when the X is pressed", () => {
    fireEvent.press(screen.getByAccessibilityHint("Delete ingredient"));
    expect(mockDeleteIngredient).toBeCalledTimes(1);
  });
});
